/**
 * Post Header Shrink — sticky continuous-scroll proxy version
 *
 * The wrapper is position:sticky so the browser fixes its on-screen position.
 * We only ever change the wrapper's size (padding + title font-size), and the
 * size is derived 100% from window.scrollY via a clamped linear interpolation.
 * Nothing else can change the size, so there is no flicker.
 *
 * We also keep the sticky `top` offset in sync with the site nav height so the
 * post header always stacks neatly below the global navigation bar.
 */
(function() {
  const SCROLL_START = 50;  // px – shrink begins
  const SCROLL_END   = 150; // px – shrink complete

  const MAX_PADDING_TOP    = 3.0; // rem (matches CSS default)
  const MAX_PADDING_BOTTOM = 2.0; // rem
  const MIN_PADDING_TOP    = 1.5; // rem (matches .shrunk CSS)
  const MIN_PADDING_BOTTOM = 1.0; // rem

  const MIN_FONT_REM = 1.2; // rem (matches .shrunk .post-title CSS)

  const siteNavEl = document.querySelector('header');
  const wrapper   = document.querySelector('.post-header-wrapper');
  const title     = document.querySelector('.post-title');
  if (!wrapper || !title) return;

  // Capture the rendered font size before any JS manipulation.
  // Fall back to 16 if the value is missing or zero to avoid NaN / Infinity.
  const rootPx     = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const maxFontRem = parseFloat(getComputedStyle(title).fontSize) / rootPx;

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

  /** Keep the sticky `top` value equal to the current nav bar height. */
  function syncStickyTop() {
    wrapper.style.top = siteNavEl ? siteNavEl.offsetHeight + 'px' : '0px';
  }

  var rafPending    = false;
  var resizeTimer   = null;

  function applyStyles() {
    rafPending = false;
    const t = clamp((window.scrollY - SCROLL_START) / (SCROLL_END - SCROLL_START), 0, 1);

    title.style.fontSize        = lerp(maxFontRem,        MIN_FONT_REM,        t).toFixed(4) + 'rem';
    wrapper.style.paddingTop    = lerp(MAX_PADDING_TOP,    MIN_PADDING_TOP,    t).toFixed(4) + 'rem';
    wrapper.style.paddingBottom = lerp(MAX_PADDING_BOTTOM, MIN_PADDING_BOTTOM, t).toFixed(4) + 'rem';
  }

  function onScroll() {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(applyStyles);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // Debounced resize handler — re-measures nav height without causing
  // layout thrashing on every pixel of resize.
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(syncStickyTop, 100);
  }, { passive: true });

  syncStickyTop();   // position sticky bar below nav
  applyStyles();     // set correct initial size
})();
