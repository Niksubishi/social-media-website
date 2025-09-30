/**
 * Initializes password toggle functionality for password fields
 * @param {string} containerId - The ID of the container to initialize toggles within
 */
export function initializePasswordToggles(containerId = 'body') {
  const container = containerId === 'body' ? document.body : document.getElementById(containerId);
  if (!container) return;

  const toggleButtons = container.querySelectorAll('.password-toggle');

  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const passwordField = document.getElementById(targetId);
      const showText = this.querySelector('.show-text');
      const hideText = this.querySelector('.hide-text');

      if (passwordField.type === 'password') {
        passwordField.type = 'text';
        showText.style.display = 'none';
        hideText.style.display = 'inline';
      } else {
        passwordField.type = 'password';
        showText.style.display = 'inline';
        hideText.style.display = 'none';
      }
    });
  });
}

/**
 * Validates that password and password repeat fields match
 * @param {string} passwordId - ID of the password field
 * @param {string} passwordRepeatId - ID of the password repeat field
 * @param {string} errorElementId - ID of the error message element
 * @returns {boolean} - True if passwords match, false otherwise
 */
export function validatePasswordMatch(passwordId, passwordRepeatId, errorElementId) {
  const password = document.getElementById(passwordId);
  const passwordRepeat = document.getElementById(passwordRepeatId);
  const errorElement = document.getElementById(errorElementId);

  if (!password || !passwordRepeat || !errorElement) return false;

  const passwordsMatch = password.value === passwordRepeat.value;

  if (!passwordsMatch && passwordRepeat.value.length > 0) {
    errorElement.style.display = 'block';
    return false;
  } else {
    errorElement.style.display = 'none';
    return true;
  }
}

/**
 * Initializes password validation for registration forms
 */
export function initializePasswordValidation() {
  const passwordField = document.getElementById('password');
  const passwordRepeatField = document.getElementById('password-repeat');

  if (!passwordField || !passwordRepeatField) return;

  const validatePasswords = () => {
    validatePasswordMatch('password', 'password-repeat', 'password-mismatch-error');
  };

  passwordField.addEventListener('input', validatePasswords);
  passwordRepeatField.addEventListener('input', validatePasswords);
}