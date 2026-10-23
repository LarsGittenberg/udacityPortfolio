/* =====================================================================
   CASE STUDY LAYOUT SWITCH: Column | Rail
   Load in the <head> (no defer) on a page that has <article class="cs"> (a case study) or <article class="gl"> (a statement gallery):
   <script src="js/layout-switch.js"></script>
   It does five jobs:
     1. Picks the layout BEFORE the page paints, so nobody sees the wrong layout flash by.
        Order of choice: ?layout=column or ?layout=rail in the address, then the reader's saved choice, then the default (rail).
     2. Case studies only: builds the rail (the section index) from the sections themselves: every  <section class="cs-sec" id="...">  becomes a link.
        The label is the kicker's name without its numeral (the .lbl in <span class="num">02</span><span class="lbl">The challenge</span>).
        To use different wording, put  data-rail="My wording"  on the section.
     3. Adds the Column | Rail pill, and remembers the reader's choice (browser storage, which can be blocked, so it is wrapped in try/catch).
     4. Keeps the reader's place when the layout changes: the line of text at the reading line stays where it was in the window, so the screen never jumps.
     5. Marks the current section in the rail ("you are here"), and sends a GA4 event when the reader switches.
   Styles: css/case-study.css or css/gallery.css for the layouts; the pill itself is in css/reskin-blue.css.
   On a gallery the statement IS the rail (the CSS pins it), so there is nothing to build here.
   ===================================================================== */
(function () {
  var root = document.documentElement;
  var KEY = 'cs-layout';

  /* ---- 1. choose the layout, before paint ---- */
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function remember(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* storage blocked: the choice just won't last */ } }
  var asked = new URLSearchParams(location.search).get('layout');
  var layout = (asked === 'column' || asked === 'rail') ? asked : (saved() === 'column' ? 'column' : 'rail');
  root.classList.toggle('look-rail', layout === 'rail');

  document.addEventListener('DOMContentLoaded', function () {
    var cs = document.querySelector('article.cs, article.gl');
    if (!cs) { return; }
    var secs = [].slice.call(cs.querySelectorAll('.cs-sec[id]'));

    /* ---- 2. build the rail (case studies only) and the "you are here" marker ---- */
    var links = [], current = 0;
    if (secs.length) {
      var rail = document.createElement('nav');
      rail.className = 'cs-index';
      rail.setAttribute('aria-label', 'In this case study');
      secs.forEach(function (s) {
        var a = document.createElement('a');
        var kicker = s.querySelector('.kicker');
        a.href = '#' + s.id;
        var lbl = s.querySelector('.kicker .lbl'); /* the kicker's label, without its numeral; older markup ("01 \u00b7 Role" as plain text) still works */
        a.textContent = s.getAttribute('data-rail') || (lbl ? lbl.textContent : kicker ? kicker.textContent.replace(/^\s*\d+\s*\u00b7\s*/, '') : s.id);
        rail.appendChild(a);
      });
      var crumb = cs.querySelector('.cs-crumb');
      if (crumb) { crumb.insertAdjacentElement('afterend', rail); } else { cs.insertBefore(rail, cs.firstChild); }
      links = [].slice.call(rail.querySelectorAll('a'));
    }

    /* "you are here": the current section is the last one whose top edge has scrolled past 160px from the top of the window */
    function mark() {
      if (!secs.length) { return; }
      var y = window.scrollY + 160;
      current = 0;
      secs.forEach(function (s, i) { if (s.getBoundingClientRect().top + window.scrollY <= y) { current = i; } });
      links.forEach(function (a, i) { a.classList.toggle('is-here', i === current); });
    }
    window.addEventListener('scroll', mark, { passive: true });
    mark();

    /* ---- 4a. the anchor: the first piece of content (paragraph, heading, list item, figure...) that is still on screen below the reading line ---- */
    var blocks = [].slice.call(cs.querySelectorAll('.kicker, h3, p, li, figure')); /* on a gallery this finds the photographs */
    function anchorAtReadingLine() {
      for (var i = 0; i < blocks.length; i++) {
        var r = blocks[i].getBoundingClientRect();
        if (r.height > 0 && r.bottom > 160) { return blocks[i]; }
      }
      return null;
    }

    /* ---- 3. the pill ---- */
    var pill = document.createElement('div');
    pill.className = 'lay-switch';
    pill.setAttribute('role', 'group');
    pill.setAttribute('aria-labelledby', 'layNote'); // the caption above names the group for screen readers
    pill.innerHTML = '<span class="note" id="layNote">Reading Experience</span><div class="lay-btns"><button type="button" data-layout="column">Column</button><button type="button" data-layout="rail">Rail</button></div>';
    document.body.appendChild(pill);
    var buttons = [].slice.call(pill.querySelectorAll('button'));
    function press() { buttons.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-layout') === layout); }); }
    press();

    /* ---- 4 and 5b. switch, keeping the reader's place ---- */
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var next = b.getAttribute('data-layout');
        if (next === layout) { return; }
        /* lock focus on the line of text at the reading line (160px down): remember which element it is and where it sits in the window */
        var anchor = anchorAtReadingLine(), before = anchor ? anchor.getBoundingClientRect().top : 0;
        layout = next;
        root.classList.toggle('look-rail', layout === 'rail');
        press();
        remember(layout);
        /* the page has reflowed; scroll by exactly the amount the anchor moved, so it stays where the reader's eye is */
        if (anchor) { window.scrollBy(0, anchor.getBoundingClientRect().top - before); }
        mark();
        if (window.gtag) { gtag('event', 'layout_switch', { layout: layout }); }
      });
    });
  });
})();
