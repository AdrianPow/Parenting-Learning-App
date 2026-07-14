/* ============================================================
   Shared chrome for the Parenting Library
   One source of truth for: the book list, the theme toggle,
   and the floating library switcher. Injected into every page.
   Each page keeps its own colour tokens; this file only uses
   CSS custom properties (var(--card) etc.) so it themes itself.
   ============================================================ */
(function () {
  "use strict";

  /* ---- the single canonical book list ---- */
  var BOOKS = [
    { file: "cribsheet.html",              emoji: "📖", hex: "#0fa47e", title: "Cribsheet Companion",        author: "Emily Oster",      angle: "the evidence",   key: "cs-read", total: 21 },
    { file: "contented-baby.html",         emoji: "👶", hex: "#7c62d6", title: "Contented Baby Companion",   author: "Gina Ford",        angle: "the routines",   key: "cb-read", total: 5  },
    { file: "parenting-relationship.html", emoji: "💬", hex: "#c94f74", title: "Relationship Companion",     author: "Philippa Perry",   angle: "the connection", key: "pp-read", total: 6  },
    { file: "whole-brain.html",            emoji: "🧠", hex: "#b45309", title: "Whole-Brain Companion",      author: "Siegel & Bryson",  angle: "the brain",      key: "wb-read", total: 12 },
    { file: "baby-sleep-science.html",     emoji: "🌙", hex: "#2481c4", title: "Baby Sleep Science",         author: "Helen Ball",        angle: "the biology",    key: "bs-read", total: 9  }
  ];
  window.PL_BOOKS = BOOKS;

  function basename() {
    var p = location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }
  var IS_HUB = basename() === "index.html";
  function progress(b) {
    try {
      var n = (JSON.parse(localStorage.getItem(b.key) || "[]") || []).length;
      return { done: n, total: b.total };
    } catch (e) { return { done: 0, total: b.total }; }
  }
  window.PL_PROGRESS = progress;

  /* ---- theme ---- */
  function effectiveTheme() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("pl-theme", t); } catch (e) {}
    var btn = document.getElementById("pl-theme-btn");
    if (btn) {
      var dark = t === "dark";
      btn.textContent = dark ? "☀️" : "🌙";
      btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  /* ---- styles (use page tokens) ---- */
  var css =
    "header.app{padding-right:104px}" +
    ".pl-ctrl{position:fixed;top:12px;z-index:40;width:42px;height:42px;border-radius:50%;" +
    "border:1px solid var(--edge);background:var(--card);box-shadow:var(--shadow-pop);font-size:1.1rem;" +
    "display:flex;align-items:center;justify-content:center;transition:transform .15s;color:var(--ink)}" +
    ".pl-ctrl:hover{transform:translateY(-1px)}.pl-ctrl:active{transform:scale(.94)}" +
    "#pl-theme-btn{right:12px}#pl-lib-btn{right:62px}" +
    ".pl-hub #pl-theme-btn{right:12px}" +
    ".libsheet{position:fixed;inset:0;z-index:50;background:rgba(15,15,15,.45);display:flex;align-items:flex-end;justify-content:center}" +
    ".libsheet[hidden]{display:none}" +
    ".libpanel{background:var(--ground);border-radius:24px 24px 0 0;padding:18px 16px calc(26px + env(safe-area-inset-bottom));" +
    "max-width:640px;width:100%;animation:pl-up .3s cubic-bezier(.2,.7,.3,1);max-height:88vh;overflow-y:auto}" +
    "@keyframes pl-up{from{transform:translateY(48px);opacity:0}to{transform:none;opacity:1}}" +
    ".libpanel .pl-klabel{font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink3);font-weight:800;margin-bottom:8px}" +
    ".libcard{display:flex;align-items:center;gap:12px;background:var(--card);border-radius:16px;padding:13px 14px;margin:8px 0;" +
    "text-decoration:none;color:var(--ink);box-shadow:var(--shadow);border:2px solid transparent}" +
    ".libcard.here{border-color:var(--accent)}" +
    ".libcard .em{width:42px;height:42px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}" +
    ".libcard .bt{flex:1;min-width:0}.libcard .bt b{display:block;font-size:.95rem}" +
    ".libcard .bt small{color:var(--ink2);font-size:.76rem;font-weight:600}" +
    ".libcard .herechip{margin-left:auto;font-size:.64rem;font-weight:800;letter-spacing:.05em;color:var(--accent);white-space:nowrap}" +
    "@media (prefers-reduced-motion: reduce){.pl-ctrl,.libpanel{transition:none!important;animation:none!important}}";
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* ---- build controls on DOM ready ---- */
  function build() {
    var here = basename();

    /* theme toggle (every page) */
    var themeBtn = document.createElement("button");
    themeBtn.className = "pl-ctrl";
    themeBtn.id = "pl-theme-btn";
    themeBtn.type = "button";
    document.body.appendChild(themeBtn);
    themeBtn.addEventListener("click", function () {
      applyTheme(effectiveTheme() === "dark" ? "light" : "dark");
    });
    applyTheme(effectiveTheme());

    if (IS_HUB) { document.body.classList.add("pl-hub"); return; }

    /* library switcher (book pages only) */
    var libBtn = document.createElement("button");
    libBtn.className = "pl-ctrl";
    libBtn.id = "pl-lib-btn";
    libBtn.type = "button";
    libBtn.textContent = "📚";
    libBtn.setAttribute("aria-label", "Switch book");
    libBtn.setAttribute("aria-expanded", "false");
    document.body.appendChild(libBtn);

    var sheet = document.createElement("div");
    sheet.className = "libsheet";
    sheet.id = "pl-libsheet";
    sheet.hidden = true;
    var cards = BOOKS.map(function (b) {
      var isHere = b.file === here;
      var chip = isHere
        ? '<span class="herechip">YOU’RE HERE</span>'
        : '<span class="herechip" style="color:var(--ink3)">›</span>';
      return '<a class="libcard' + (isHere ? " here" : "") + '" href="' + b.file + '">' +
        '<span class="em" style="background:color-mix(in srgb,' + b.hex + ' 20%,var(--card2))">' + b.emoji + '</span>' +
        '<span class="bt"><b>' + b.title + '</b><small>' + b.author + " · " + b.angle + "</small></span>" +
        chip + "</a>";
    }).join("");
    sheet.innerHTML = '<div class="libpanel"><div class="pl-klabel">Your library — switch books</div>' + cards + "</div>";
    document.body.appendChild(sheet);

    function setOpen(o) { sheet.hidden = !o; libBtn.setAttribute("aria-expanded", String(o)); }
    libBtn.addEventListener("click", function () { setOpen(sheet.hidden); });
    sheet.addEventListener("click", function (e) { if (e.target === sheet) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
