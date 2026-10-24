/* =====================================================================
   BEFORE / AFTER on touch screens (the Retouching page)
   On a device that can hover, the CSS does everything: hover shows the BEFORE, the original (css/gallery.css, BEFORE / AFTER). A finger cannot hover, so on those devices a tap
   (or Enter or Space on a focused photograph) flips it between AFTER (the finished piece) and BEFORE (the original) by adding or removing .is-before.
   Load with defer on a page that has <figure class="gl-ba" tabindex="0"> tiles.
   ===================================================================== */
(function () {
  var canHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;
  if (canHover) { return; }
  var tiles = [].slice.call(document.querySelectorAll('.gl-ba'));
  tiles.forEach(function (t) {
    t.addEventListener('click', function () { t.classList.toggle('is-before'); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t.classList.toggle('is-before'); }
    });
  });
})();
