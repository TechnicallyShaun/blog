/**
 * Post Header Shrink — continuous scroll proxy version
 * Maps scroll position directly to font size and padding,
 * eliminating the flicker that occurs with binary class toggling.
 */
(function() {
  const SCROLL_START = 50;  // px – shrink begins
  const SCROLL_END   = 150; // px – shrink complete

  const MAX_PADDING_TOP    = 3.0; // rem (matches CSS default)
  const MAX_PADDING_BOTTOM = 2.0; // rem
  const MIN_PADDING_TOP    = 1.5; // rem (matches .shrunk CSS)
  const MIN_PADDING_BOTTOM = 1.0; // rem

  const MIN_FONT_REM = 1.2; // rem (matches .shrunk .post-title CSS)

  const wrapper = document.querySelector('.post-header-wrapper');
  const title   = document.querySelector('.post-title');
  if (!wrapper || !title) return;

  // Capture the rendered font size before any JS manipulation.
  // Fall back to 16 if the value is missing or zero to avoid NaN / Infinity.
  const rootPx     = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const maxFontRem = parseFloat(getComputedStyle(title).fontSize) / rootPx;

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

  var rafPending = false;

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
  applyStyles(); // set correct initial state
})();
