/**
 * Logs out the user by clearing authentication data from localStorage.
 *
 * - Removes the user's token and username from localStorage.
 * - Dispatches a custom event to update navigation
 * - Can be extended to include additional logout-related behavior if needed.
 *
 * @returns {void}
 */
export function onLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");

  // Dispatch custom event to update navigation
  window.dispatchEvent(new CustomEvent('userLoggedOut'));
}
