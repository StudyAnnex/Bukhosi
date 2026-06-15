/**
 * Gallery Module
 * Handles the lightbox (open/close, prev/next, keyboard nav) and the
 * optional video player on gallery.html. Mobile navigation is handled
 * by the shared navigation.js module.
 */

let galleryItems = [];
let currentIdx = 0;

document.addEventListener('DOMContentLoaded', () => {
  galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
});

/**
 * Open the lightbox for the clicked gallery item.
 * @param {HTMLElement} el - the .gallery-item element that was clicked
 */
function openLightbox(el) {
  currentIdx = galleryItems.indexOf(el);
  showCurrent();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/** Close the lightbox and restore page scrolling. */
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

/** Close the lightbox only when the dark background (not the image) is clicked. */
function closeLightboxOnBg(e) {
  if (e.target.id === 'lightbox') closeLightbox();
}

/**
 * Step to the previous/next image, wrapping around at the ends.
 * @param {number} dir - -1 for previous, 1 for next
 */
function navLightbox(dir) {
  currentIdx = (currentIdx + dir + galleryItems.length) % galleryItems.length;
  showCurrent();
}

/** Render the currently selected image, its caption, and the counter. */
function showCurrent() {
  const item = galleryItems[currentIdx];
  const img = item.querySelector('img');
  document.getElementById('lbImg').src = img.src;
  document.getElementById('lbImg').alt = img.alt;
  document.getElementById('lbCaption').textContent = img.dataset.caption || '';
  document.getElementById('lbCounter').textContent = (currentIdx + 1) + ' / ' + galleryItems.length;
}

/* Keyboard navigation for the lightbox */
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox || !lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navLightbox(-1);
  if (e.key === 'ArrowRight') navLightbox(1);
});

/**
 * Start playback of the optional "around the hub" video and reveal controls.
 */
function playVideo() {
  const v = document.getElementById('aroundVideo');
  const wrap = document.getElementById('videoWrap');
  if (v && v.paused) {
    v.play();
    v.controls = true;
    wrap.classList.add('playing');
  }
}
