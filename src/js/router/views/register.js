import { onRegister } from "../../ui/auth/register";
import { initializePasswordToggles, initializePasswordValidation } from "../../ui/auth/passwordUtils.js";
import { initializeNavigation } from "../../ui/global/navigation.js";

// Initialize navigation, password toggle functionality and validation
initializeNavigation();
initializePasswordToggles();
initializePasswordValidation();

const form = document.forms.register;
form.addEventListener("submit", onRegister);
