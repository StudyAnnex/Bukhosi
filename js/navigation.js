/**
 * Navigation Module
 * Handles mobile navigation menu toggle functionality
 */

/**
 * Toggle mobile navigation menu
 * Opens/closes the mobile menu and animates the hamburger icon
 */
function toggleMobileNav() {
  const menu = document.getElementById('navMobileMenu');
  const btn = document.getElementById('navHamburger');
  menu.classList.toggle('open');
  btn.classList.toggle('open');
}

/**
 * Close mobile navigation menu
 * Used when a navigation link is clicked to close the menu
 */
function closeMobileNav() {
  document.getElementById('navMobileMenu').classList.remove('open');
  document.getElementById('navHamburger').classList.remove('open');
}
