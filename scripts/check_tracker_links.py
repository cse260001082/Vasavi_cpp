"""Audit tracker links, local fragments and (optionally) live HTTP destinations.

Run from any directory: python scripts/check_tracker_links.py --online
The report is a dated snapshot; websites can change after it is generated.
"""
from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from html import unescape
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import time
from urllib.error import HTTPError, URLError
from urllib.parse import unquote, urlsplit
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
TRACKER = ROOT / "Google STEP/sprint_tracker.html"


class Document(HTMLParser):
    def __init__(self, source: str):
        super().__init__(convert_charrefs=True)
        self.links, self.ids, self.duplicate_ids = [], set(), []
        self.title, self.h1 = "", ""
        self._title = self._h1 = False
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            if attrs["id"] in self.ids:
                self.duplicate_ids.append(attrs["id"])
            self.ids.add(attrs["id"])
        if tag in ("a", "link", "script", "img"):
            if tag == "link" and {"preconnect", "dns-prefetch"}.intersection(attrs.get("rel", "").split()):
                return  # Connection hints name an origin, not a page to GET.
            attr = "href" if tag in ("a", "link") else "src"
            if attr in attrs:
                self.links.append({"url": attrs[attr], "tag": tag,
                                   "line": self.getpos()[0], "attrs": attrs})
        if tag == "title":
            self._title = True
        if tag == "h1" and not self.h1:
            self._h1 = True

    def handle_endtag(self, tag):
        if tag == "title":
            self._title = False
        if tag == "h1":
            self._h1 = False

    def handle_data(self, data):
        if self._title:
            self.title += data
        if self._h1:
            self.h1 += data


def problems(source):
    rows = []
    for row in re.findall(r'<li class="problem-row">(.*?)</li>', source, re.S):
        key = re.search(r'id="(q_\d+_\d+)"', row)
        title = re.search(r'<span class="problem-title">(.*?)</span>', row, re.S)
        if key and title:
            rows.append({"id": key[1], "day": int(key[1].split("_")[1]),
                         "title": unescape(re.sub(r"<[^>]*>", "", title[1])),
                         "urls": [link["url"] for link in Document(row).links
                                  if link["tag"] == "a"]})
    return rows


def fetch(url):
    result = {"url": url, "kind": "external", "status": "unchecked"}
    request = Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; StudyGuideLinkAudit/1.0)"})
    for attempt in range(2):
        try:
            with urlopen(request, timeout=20) as response:
                result.update(http_status=response.status, final_url=response.url)
                mime = response.headers.get("Content-Type", "")
                body = response.read(2_000_000).decode("utf-8", errors="replace")
                if "html" in mime:
                    document = Document(body)
                    result.update(title=document.title.strip(), heading=document.h1.strip())
                    if re.search(r"(?:^|\b)(?:404|page not found|problem not found)(?:\b|$)",
                                 result["title"] + " " + result["heading"], re.I):
                        result.update(status="broken", error="Soft 404 / missing page title")
                        return result
                result["status"] = "ok" if 200 <= response.status < 300 else "broken"
                return result
        except HTTPError as error:
            result.update(http_status=error.code, final_url=error.url,
                          status="blocked" if error.code in (401, 403, 429) else "broken",
                          error=str(error))
            if error.code not in (429, 500, 502, 503, 504):
                return result
        except (URLError, TimeoutError, OSError) as error:
            result.update(status="unverified", error=str(error))
        if not attempt:
            time.sleep(1)
    return result


def local_link(url):
    parts = urlsplit(url)
    target = (TRACKER.parent / unquote(parts.path)).resolve() if parts.path else TRACKER
    result = {"url": url, "kind": "local", "status": "ok"}
    if not target.is_relative_to(ROOT):
        result.update(status="broken", error="Path leaves the repository")
    elif not target.is_file():
        result.update(status="broken", error="Missing local file")
    elif parts.fragment:
        if target.suffix.lower() != ".html":
            result.update(status="unverified", error="Fragment on non-HTML resource")
        elif unquote(parts.fragment) not in Document(target.read_text(encoding="utf-8")).ids:
            result.update(status="broken", error="Missing local fragment #" + parts.fragment)
    return result


def md(text):
    return str(text).replace("|", "\\|").replace("\n", " ")


def write_reports(output, report):
    output.mkdir(parents=True, exist_ok=True)
    (output / "link-audit.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    counts = report["summary"]
    lines = ["# Sprint tracker link audit", "", "Checked: " + report["checked_at"], "",
             "Source: `Google STEP/sprint_tracker.html`. Includes navigation, every problem/review link, stylesheets and scripts. Preconnect/DNS hints are excluded: an origin is not a page endpoint.", "",
             f"- {counts['references']} URL references; {counts['unique_urls']} unique destinations.",
             f"- {counts['problem_rows']} problem/review rows, all included below.",
             f"- Results: {counts['ok']} verified, {counts['broken']} broken, {counts['blocked']} blocked, {counts['unverified']} unverified, {counts['unchecked']} not checked online.",
             f"- Link lint errors: {len(report['findings'])}.",
             "", "HTTP success confirms availability, not future permanence. Blocked/timeout responses are not counted as verified. Problem-topic matches and exercise variants were reviewed separately.", "",
             "## Lint findings", ""]
    if report["findings"]:
        lines += [f"- **{item['code']}**: {item['message']}" for item in report["findings"]]
    else:
        lines.append("No link lint errors found in this run.")
    lines += ["", "## Topic and variant review", "",
              "- Day 2 Linear Search points to Linear Search, not the working but incorrect binary-search exercise. Rotation by D points to left rotation.",
              "- Day 8 uses the practice problem whose examples reverse word order; the similarly named blog reverses individual words and is not used.",
              "- Introduction rows use linked-list reading resources. Combined insertion/deletion and Day 24 review rows have separate links for both named operations.",
              "- The maximum-subarray printing task explicitly extends the sum-only Kadane exercise; its shared URL is intentional.",
              "- Integer-to-Roman and exactly-K-distinct-character substring counting use matching GeeksforGeeks problems where the old TUF destinations were unavailable.",
              "", "## Updated problem links", "", "| Day | ID | Exercise | Current destination(s) | Result |", "| --- | --- | --- | --- | --- |"]
    by_url = {result["url"]: result for result in report["results"]}
    for row in report["problems"]:
        links = "<br>".join(f"[{md(by_url[url].get('heading') or by_url[url].get('title') or 'Open resource')}]({url})" for url in row["urls"])
        state = ", ".join(dict.fromkeys(by_url[url]["status"] for url in row["urls"]))
        lines.append(f"| {row['day']} | `{row['id']}` | {md(row['title'])} | {links} | {state} |")
    lines += ["", "## All unique destinations", "", "| Destination | Kind | Result | HTTP | Page / detail |", "| --- | --- | --- | --- | --- |"]
    for result in report["results"]:
        detail = result.get("error") or result.get("heading") or result.get("title") or "Local file/fragment exists"
        lines.append(f"| [{md(result['url'])}]({result['url']}) | {result['kind']} | {result['status']} | {result.get('http_status', '—')} | {md(detail)} |")
    lines += ["", "## Run again", "", "```powershell", "python scripts/check_tracker_links.py", "python scripts/check_tracker_links.py --online", "```", "",
              "The offline command checks files, fragments, schemes and link attributes. `--online` performs GET requests, follows redirects and checks page titles for missing-page responses. Both exit unsuccessfully if any requested check is broken, blocked or unverified.", ""]
    (output / "link-audit.md").write_text("\n".join(lines), encoding="utf-8")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--online", action="store_true", help="Also check live HTTP responses")
    parser.add_argument("--output", type=Path, default=TRACKER.parent, help="Report directory")
    args = parser.parse_args()
    source = TRACKER.read_text(encoding="utf-8")
    document = Document(source)
    rows = problems(source)
    findings = []
    for duplicate in document.duplicate_ids:
        findings.append({"code": "DUPLICATE_ID", "message": "Ambiguous fragment target #" + duplicate})
    for row in rows:
        if not row["urls"]:
            findings.append({"code": "MISSING_PROBLEM_LINK", "message": row["id"] + " has no resource link"})
    for link in document.links:
        url = link["url"]
        if not url.strip() or url != url.strip() or url == "#":
            findings.append({"code": "URL_FORMAT", "message": f"Line {link['line']}: blank or padded URL"})
        scheme = urlsplit(url).scheme
        if scheme and scheme != "https":
            findings.append({"code": "URL_SCHEME", "message": f"Line {link['line']}: unexpected scheme {scheme}"})
        if link["attrs"].get("target") == "_blank" and "noopener" not in link["attrs"].get("rel", "").split():
            findings.append({"code": "NEW_TAB_REL", "message": f"Line {link['line']}: add rel=noopener to {url}"})
    urls = list(dict.fromkeys(link["url"] for link in document.links))
    results = [local_link(url) for url in urls if not urlsplit(url).scheme]
    results += [{"url": url, "kind": "external", "status": "broken", "error": "Unsupported URL scheme"}
                for url in urls if urlsplit(url).scheme and urlsplit(url).scheme != "https"]
    external = [url for url in urls if urlsplit(url).scheme == "https"]
    if args.online:
        with ThreadPoolExecutor(max_workers=4) as pool:
            results += list(pool.map(fetch, external))
    else:
        results += [{"url": url, "kind": "external", "status": "unchecked"} for url in external]
    for result in results:
        if result["status"] in ("broken", "blocked", "unverified"):
            findings.append({"code": "LINK_" + result["status"].upper(),
                             "message": f"{result['url']}: {result.get('error', result.get('http_status', ''))}"})
    results.sort(key=lambda result: urls.index(result["url"]))
    summary = {"references": len(document.links), "unique_urls": len(urls), "problem_rows": len(rows),
               **{state: sum(result["status"] == state for result in results)
                  for state in ("ok", "broken", "blocked", "unverified", "unchecked")}}
    report = {"checked_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
              "online": args.online, "summary": summary, "findings": findings,
              "problems": rows, "results": results}
    write_reports(args.output, report)
    print(json.dumps(summary))
    for finding in findings:
        print(f"{finding['code']}: {finding['message']}")
    return 1 if findings else 0


if __name__ == "__main__":
    raise SystemExit(main())
