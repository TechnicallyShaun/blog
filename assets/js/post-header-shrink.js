/**
 * Post Header Shrink — CSS class toggle version
 * Adds .shrunk class after scrolling past threshold.
 * CSS handles the transition smoothly.
 */
(function() {
  const THRESHOLD = 100;
  let shrunk = false;
  
  const wrapper = document.querySelector('.post-header-wrapper');
  if (!wrapper) return;
  
  function onScroll() {
    const shouldShrink = window.scrollY > THRESHOLD;
    if (shouldShrink !== shrunk) {
      shrunk = shouldShrink;
      wrapper.classList.toggle('shrunk', shrunk);
    }
  }
  
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
