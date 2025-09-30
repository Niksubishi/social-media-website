import { onCreatePost } from "../../ui/post/create.js";
import { authGuard } from "../../utilities/authGuard.js";
import { initializeNavigation } from "../../ui/global/navigation.js";
import { setLogoutListener } from "../../ui/global/logout.js";

authGuard();
initializeNavigation();
setLogoutListener();

/**
 * Sets up an event listener for the "create post" form submission.
 */
function setupFormListener() {
  const form = document.querySelector("#create-post");
  if (form) {
    form.addEventListener("submit", (event) => {
      onCreatePost(event);
    });
  } else {
    console.error("Form not found");
  }
}

setupFormListener();
