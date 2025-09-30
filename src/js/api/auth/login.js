import { API_AUTH_LOGIN } from "../constants.js";

/**
 * Authenticates a user by sending their email and password to the login API.
 *
 * @async
 * @function login
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} The JSON response from the API upon successful login.
 * @throws {Error} If the login fails or the API returns an error response.
 */
export async function login({ email, password }) {
  try {
    console.log("Attempting login to:", API_AUTH_LOGIN);

    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      let errorMessage = "Login failed. Please check your credentials.";
      try {
        const json = await response.json();
        errorMessage = json.errors?.[0]?.message || json.message || errorMessage;
      } catch (parseError) {
        console.warn("Could not parse error response:", parseError);
      }
      throw new Error(errorMessage);
    }

    const json = await response.json();
    console.log("Login successful");
    return json;
  } catch (error) {
    console.error("Error in login:", error);

    // Provide more specific error messages
    if (error.name === 'TypeError' && error.message.includes('Load failed')) {
      throw new Error("Network error. Please check your internet connection and try again.");
    } else if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error("Unable to connect to server. Please try again later.");
    }

    throw error;
  }
}
