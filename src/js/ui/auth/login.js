import { login } from "../../api/auth/login.js"; // Adjust path as needed

/**
 * Handles the login process by passing user credentials to the login API 
 * and managing the response.
 *
 * This function extracts user input from the login form, sends the data to 
 * the `login` function, and processes the server's response. On success, 
 * it stores the user's token and username in localStorage and redirects to the home page.
 * On failure, it displays an error message to the user.
 *
 * @async
 * @param {Event} event - The event object triggered by the form submission.
 * @throws {Error} If the login request fails or the server returns an error.
 */

export async function onLogin(event) {
  event.preventDefault();
  console.log("Login form submitted");

  const form = event.target;
  const email = form.email.value.trim();
  const password = form.password.value.trim();

  // Basic validation
  if (!email || !password) {
    const errorMessage = "Please enter both email and password.";
    const errorElement = document.querySelector("#login-error");
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.style.color = "red";
    }
    return;
  }

  console.log("Attempting login for email:", email);

  // Show loading state
  const submitButton = form.querySelector("button[type='submit'], button:not([type])");
  const originalText = submitButton?.textContent;
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Logging in...";
  }

  try {
    const apiResponse = await login({ email, password });
    console.log("Login API response received:", apiResponse);

    if (!apiResponse.data || !apiResponse.data.accessToken) {
      throw new Error("Invalid response from server. Please try again.");
    }

    localStorage.setItem("token", apiResponse.data.accessToken);
    localStorage.setItem("username", apiResponse.data.name);

    // Dispatch custom event to update navigation
    window.dispatchEvent(new CustomEvent('userLoggedIn'));

    console.log("Login successful, redirecting to home");
    window.location.href = "/";
  } catch (error) {
    console.error("Login error:", error);

    const errorMessage = error.message || "An error occurred. Please try again later.";
    const errorElement = document.querySelector("#login-error");
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.style.color = "red";
      errorElement.style.display = "block";
    }
  } finally {
    // Reset button state
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalText || "Login";
    }
  }
}