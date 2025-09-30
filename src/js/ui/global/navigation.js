import { isAuthenticated } from "../../utilities/authGuard.js";

/**
 * Updates navigation visibility based on authentication status
 * Shows/hides login, register, and logout buttons appropriately
 * @returns {void}
 */
export function updateNavigation() {
  const loginLink = document.querySelector('a[href="/auth/login/"]');
  const registerLink = document.querySelector('a[href="/auth/register/"]');
  const logoutButton = document.querySelector('#logout-btn');
  const profileLink = document.querySelector('a[href="/profile/"]');
  const createPostLink = document.querySelector('a[href="/post/create/"]');

  const isLoggedIn = isAuthenticated();

  if (isLoggedIn) {
    // User is logged in - show authenticated navigation
    if (loginLink) loginLink.style.display = 'none';
    if (registerLink) registerLink.style.display = 'none';
    if (logoutButton) logoutButton.style.display = 'block';
    if (profileLink) profileLink.style.display = 'block';
    if (createPostLink) createPostLink.style.display = 'block';
  } else {
    // User is not logged in - show public navigation
    if (loginLink) loginLink.style.display = 'block';
    if (registerLink) registerLink.style.display = 'block';
    if (logoutButton) logoutButton.style.display = 'none';
    if (profileLink) profileLink.style.display = 'none';
    if (createPostLink) createPostLink.style.display = 'none';
  }
}

/**
 * Initializes navigation state when page loads
 * Should be called on every page that has navigation
 * @returns {void}
 */
export function initializeNavigation() {
  // Update navigation immediately
  updateNavigation();

  // Listen for storage changes to update navigation when login state changes
  window.addEventListener('storage', updateNavigation);

  // Listen for custom login/logout events
  window.addEventListener('userLoggedIn', updateNavigation);
  window.addEventListener('userLoggedOut', updateNavigation);
}