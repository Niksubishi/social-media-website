import { authGuard } from "../../utilities/authGuard.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { initializeNavigation } from "../../ui/global/navigation.js";
import { loadPosts } from "../../ui/post/loadPosts.js";
import { readPosts } from "../../api/post/read.js";
import { initializeSearch } from "../../ui/post/search.js";
import { initializeBackToTop } from "../../ui/global/backToTop.js";
import { onDeletePost } from "../../ui/post/delete.js";
import { initializeReactionButtons } from "../../api/post/react.js";
import { initializeCommentButtons } from "../../api/post/comment.js";

authGuard();
initializeNavigation();
setLogoutListener();

const feedContainer = document.querySelector("#feed-container");
const searchInput = document.querySelector("#search-input");

loadPosts(feedContainer, readPosts).then(() => {
  initializeReactionButtons();
  initializeCommentButtons();
});

initializeSearch(searchInput, feedContainer);
initializeBackToTop();

feedContainer.addEventListener("click", onDeletePost);
