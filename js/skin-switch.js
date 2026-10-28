/* =====================================================================
   SKIN SWITCH: "Old me, 2017" <> "Retro me, 1986"
   One HTML file per page, two skins (sets of stylesheets). This script, loaded in the <head> in place of the page's stylesheet links, does four jobs:
     1. Picks the skin BEFORE the page paints, so nobody sees the wrong one flash by. Order of choice:
          the address (?skin=2017 or ?skin=1986: that choice is saved and ?skin= is then removed from the address), then the visitor's saved choice, then DEFAULT (below).
     2. Writes that skin's <link> tags, and sets html[data-skin="2017"|"1986"] (the switch's own CSS, css/skin-switch.css, reads it).
     3. Builds the switch inside the menu overlay (.overlay-content): a "Style settings" heading, a label, a sliding button, a label.
     4. On a click, swaps the stylesheets live (the new ones load first, then the old ones go, so the page never shows naked HTML), saves the choice and reports it to GA4.
   Each page says which stylesheets each skin uses (load it right where the stylesheet links used to be):
     <script src="js/skin-switch.js" data-2017="css/ui.css,css/main.css" data-1986="css/reskin-blue.css"></script>
     <link rel="stylesheet" href="css/skin-switch.css">    <!-- the switch looks the same in both skins, so it has its own file, loaded after the skin -->
     <noscript> ...the DEFAULT skin's <link> tags... </noscript>
   A stylesheet that both skins need goes in BOTH lists. The one to remember is css/transitions.css (the card-to-title morph between a category page and a project page): BOTH pages of a transition must link it, so the home page, the category pages, the galleries and the case studies list it in both skins. (The About page takes no part in a transition, so it leaves it out.)
   The choice is kept in localStorage ('skinMode'), like the old Colorful / Toned Down toggle kept 'styleMode': it survives closing the window. Storage can be blocked, so it is wrapped in try/catch.
   ===================================================================== */
(function () {
  var DEFAULT = '2017'; /* what a first-time visitor sees: ONE value, ONE place. Change it here ('2017' or '1986'). */
  var KEY = 'skinMode';
  var root = document.documentElement;
  var me = document.currentScript;
  var sets = {
    '2017': (me.getAttribute('data-2017') || '').split(',').filter(Boolean),
    '1986': (me.getAttribute('data-1986') || '').split(',').filter(Boolean)
  };
  var NAMES = { '2017': 'Old me, 2017', '1986': 'Retro me, 1986' };

  function valid(v) { return v === '2017' || v === '1986'; }
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function remember(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* storage blocked: the choice just won't last */ } }

  /* ---- 1 and 2. choose, then write the skin's stylesheets, before paint ---- */
  var asked = new URLSearchParams(location.search).get('skin');
  var skin = valid(asked) ? asked : (valid(saved()) ? saved() : DEFAULT);
  if (valid(asked)) {
    remember(asked);
    /* the address has done its job: take ?skin= out of it, so a reload or a bookmark does not force the skin again after the visitor has flipped the switch (other options such as ?layout= stay) */
    try { var clean = new URL(location.href); clean.searchParams.delete('skin'); history.replaceState(null, '', clean.pathname + clean.search + clean.hash); } catch (e) { /* an old browser: the address just stays as it is */ }
  }
  root.setAttribute('data-skin', skin);
  root.classList.toggle('colorful', skin === '2017'); /* the 2017 stylesheets key some rules on html.colorful (the sun, for one): the old toggle's "colorful" mode IS the 2017 look */
  sets[skin].forEach(function (href) { document.write('<link rel="stylesheet" href="' + href + '" data-skin-css>'); });

  document.addEventListener('DOMContentLoaded', function () {
    var content = document.querySelector('.overlay-content');
    if (!content) { return; }

    /* ---- 3. the switch ---- */
    var wrap = document.createElement('div');
    wrap.className = 'skin-switch';
    wrap.innerHTML =
      '<p class="skin-title">Style settings</p>' +
      '<div class="skin-toggle" id="skinToggle">' +
        '<span class="skin-label" data-skin-label="2017">Old me,<br>2017</span>' +
        '<button type="button" class="skin-button" id="skinButton"><span class="skin-knob"></span></button>' +
        '<span class="skin-label" data-skin-label="1986">Retro me,<br>1986</span>' +
      '</div>';
    content.appendChild(wrap);
    var button = wrap.querySelector('#skinButton');
    function speak() { /* the button says which skin is on and what a press does */
      var other = skin === '2017' ? '1986' : '2017';
      button.setAttribute('aria-label', 'Site skin. Showing ' + NAMES[skin] + '. Press to show ' + NAMES[other] + '.');
    }
    speak();

    /* ---- 4. swap live ---- */
    button.addEventListener('click', function () {
      var next = skin === '2017' ? '1986' : '2017';
      var anchor = document.querySelector('link[href$="skin-switch.css"]');
      var old = [].slice.call(document.querySelectorAll('link[data-skin-css]'));
      var pending = sets[next].length;
      function loaded() { pending -= 1; if (pending === 0) { old.forEach(function (l) { if (l.parentNode) { l.parentNode.removeChild(l); } }); } }
      sets[next].forEach(function (href) {
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = href;
        l.setAttribute('data-skin-css', '');
        l.onload = loaded;
        l.onerror = loaded;
        anchor.parentNode.insertBefore(l, anchor);
      });
      skin = next;
      root.setAttribute('data-skin', skin);
      root.classList.toggle('colorful', skin === '2017');
      remember(skin);
      speak();
      if (window.gtag) { gtag('event', 'theme_toggle', { mode: skin === '2017' ? 'old_2017' : 'retro_1986', from_page: window.location.pathname }); }
    });
  });
})();
