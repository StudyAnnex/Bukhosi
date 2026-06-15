/**
 * Tutors Carousel Module
 * Handles the tutors carousel/slider functionality with responsive behavior
 */

(function() {
  'use strict';

  // DOM elements
  const track = document.getElementById('tutorsTrack');
  const prevBtn = document.getElementById('tutorPrev');
  const nextBtn = document.getElementById('tutorNext');
  const dotsWrap = document.getElementById('tutorDots');

  if (!track || !prevBtn || !nextBtn || !dotsWrap) {
    console.warn('Tutors carousel elements not found');
    return;
  }

  const cards = Array.from(track.querySelectorAll('.tutor-card'));
  let current = 0;

  /**
   * Get number of cards to show per page based on viewport width
   * @returns {number} Number of cards per page
   */
  function getPerPage() {
    if (window.innerWidth <= 600) return 1;  // Mobile
    if (window.innerWidth <= 900) return 2;  // Tablet
    return 3;  // Desktop
  }

  /**
   * Build navigation dots based on number of pages
   */
  function buildDots() {
    dotsWrap.innerHTML = '';
    const total = Math.ceil(cards.length / getPerPage());

    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'tutors-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Page ' + (i + 1));
      dot.onclick = () => goTo(i);
      dotsWrap.appendChild(dot);
    }
  }

  /**
   * Navigate to specific page
   * @param {number} page - Page index to navigate to
   */
  function goTo(page) {
    const perPage = getPerPage();
    const total = Math.ceil(cards.length / perPage);

    // Clamp page number to valid range
    current = Math.max(0, Math.min(page, total - 1));

    // Calculate transform offset
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    const cardWidth = cards[0].offsetWidth + gap;
    track.style.transform = `translateX(-${current * perPage * cardWidth}px)`;

    // Update button states
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= total - 1;

    // Update active dot
    dotsWrap.querySelectorAll('.tutors-dot').forEach((dot, i) =>
      dot.classList.toggle('active', i === current)
    );
  }

  /**
   * Initialize carousel
   */
  function init() {
    // Reset to first page if current page is out of bounds
    if (current >= Math.ceil(cards.length / getPerPage())) {
      current = 0;
    }
    buildDots();
    goTo(current);
  }

  /**
   * Scroll carousel left or right
   * @param {number} dir - Direction to scroll (-1 for left, 1 for right)
   */
  window.scrollTutors = function(dir) {
    goTo(current + dir);
  };

  // Initialize on load
  init();

  // Reinitialize on window resize
  window.addEventListener('resize', init);

})();
