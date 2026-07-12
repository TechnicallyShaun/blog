/** Keep the post title readable while scrolling without recalculating its font size. */
(function() {
  const wrapper = document.querySelector('.post-header-wrapper');
  const siteNav = document.querySelector('body > header');
  if (!wrapper) return;

  const syncPosition = () => {
    wrapper.style.top = siteNav ? `${siteNav.offsetHeight}px` : '0px';
  };

  const update = () => {
    wrapper.dataset.headerSize = window.scrollY > 120 ? 'compact' : 'expanded';
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', syncPosition, { passive: true });
  syncPosition();
  update();
})();
