/* Load in <head>: apply the saved theme before paint, then wire the icon button. */
(function () {
  "use strict";
  var root = document.documentElement;
  var key = "wg-theme"; // Keep the existing Web Dev Guide preference.
  var system = window.matchMedia("(prefers-color-scheme: dark)");
  var button;

  function readTheme(raw) {
    try { var value = JSON.parse(raw); return value === "light" || value === "dark" ? value : null; }
    catch (e) { return null; }
  }
  try {
    var saved = readTheme(localStorage.getItem(key));
    if (saved) root.setAttribute("data-theme", saved);
  } catch (e) {}

  function isDark() {
    var theme = root.getAttribute("data-theme");
    return theme ? theme === "dark" : system.matches;
  }
  function paint() {
    if (!button) return;
    var next = isDark() ? "light" : "dark";
    var label = "Switch to " + next + " mode";
    button.setAttribute("data-next-theme", next);
    button.setAttribute("aria-label", label);
    button.title = label;
  }
  function init() {
    var hero = document.querySelector("header.hero");
    if (!hero) return;
    button = document.getElementById("themeBtn");
    if (!button) {
      button = document.createElement("button");
      button.id = "themeBtn";
      hero.insertBefore(button, hero.firstChild);
    }
    button.type = "button";
    button.className = "guide-theme-button";
    button.innerHTML = '<svg class="theme-moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.5 13.2A8.5 8.5 0 0 1 10.8 3.5a8.5 8.5 0 1 0 9.7 9.7Z"/></svg>' +
      '<svg class="theme-sun" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>';
    button.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(key, JSON.stringify(next)); } catch (e) {}
      paint();
    });
    paint();
    button.hidden = false;
  }

  system.addEventListener("change", paint);
  window.addEventListener("storage", function (event) {
    if (event.key !== key && event.key !== null) return;
    var theme = readTheme(event.newValue);
    if (theme) root.setAttribute("data-theme", theme);
    else root.removeAttribute("data-theme");
    paint();
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
