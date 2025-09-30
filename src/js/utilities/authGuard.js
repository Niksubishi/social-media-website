/**
 * Checks if user is authenticated and redirects to login if not
 * Also validates token format to prevent issues with corrupted tokens
 * @returns {boolean} True if authenticated, false otherwise
 */
export function authGuard() {
  const token = localStorage.getItem('token');

  // Check if token exists and is not empty
  if (!token || token.trim() === '') {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
    return false;
  }

  // Basic token validation - check if it looks like a JWT or valid token
  try {
    // If token is JWT, it should have 3 parts separated by dots
    if (token.includes('.')) {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }
    }
    return true;
  } catch (error) {
    console.warn('Invalid token detected, clearing and redirecting to login');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.dispatchEvent(new CustomEvent('userLoggedOut'));
    alert("Your session has expired. Please log in again.");
    window.location.href = "/auth/login/";
    return false;
  }
}

/**
 * Checks if user is authenticated without redirecting
 * Useful for conditional rendering
 * @returns {boolean} True if authenticated, false otherwise
 */
export function isAuthenticated() {
  const token = localStorage.getItem('token');

  if (!token || token.trim() === '') {
    return false;
  }

  try {
    if (token.includes('.')) {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return false;
      }
    }
    return true;
  } catch (error) {
    return false;
  }
}
