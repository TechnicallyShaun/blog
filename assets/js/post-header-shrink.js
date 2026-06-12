/**
 * Post header shrink
 *
 * The old version continuously recalculated font size from scroll position.
 * Because the header itself is sticky and changes height, that created a
 * feedback loop near the threshold where the title could visibly oscillate.
 *
 * Keep it simple: switch between a few stable states with hysteresis.
 */
(function() {
  const THRESHOLDS = {
    midEnter: 70,
    midExit: 45,
    compactEnter: 150,
    compactExit: 120
  };

  const siteNavEl = document.querySelector('header');
  const wrapper = document.querySelector('.post-header-wrapper');

  if (!wrapper) return;

  let currentSize = 'expanded';
  let resizeTimer = null;

  function syncStickyTop() {
    wrapper.style.top = siteNavEl ? siteNavEl.offsetHeight + 'px' : '0px';
  }

  function setHeaderSize(nextSize) {
    if (nextSize === currentSize) return;
    currentSize = nextSize;
    wrapper.dataset.headerSize = nextSize;
  }

  function updateHeaderSize() {
    const scrollY = window.scrollY;

    if (currentSize === 'expanded') {
      if (scrollY >= THRESHOLDS.compactEnter) {
        setHeaderSize('compact');
      } else if (scrollY >= THRESHOLDS.midEnter) {
        setHeaderSize('mid');
      }
      return;
    }

    if (currentSize === 'mid') {
      if (scrollY >= THRESHOLDS.compactEnter) {
        setHeaderSize('compact');
      } else if (scrollY <= THRESHOLDS.midExit) {
        setHeaderSize('expanded');
      }
      return;
    }

    if (scrollY <= THRESHOLDS.midExit) {
      setHeaderSize('expanded');
    } else if (scrollY <= THRESHOLDS.compactExit) {
      setHeaderSize('mid');
    }
  }

  window.addEventListener('scroll', updateHeaderSize, { passive: true });
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      syncStickyTop();
      updateHeaderSize();
    }, 100);
  }, { passive: true });

  wrapper.dataset.headerSize = currentSize;
  syncStickyTop();
  updateHeaderSize();
})();
