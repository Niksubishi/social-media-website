/**
 * Renders posts as HTML cards into a specified container.
 *
 * @param {HTMLElement} container - The container element to render the posts into.
 * @param {Array<Object>} posts - An array of post objects containing post details.
 * @returns {void}
 *
 * @description
 * - Converts post objects into structured HTML cards displaying:
 *   - Author information (avatar and name).
 *   - Post metadata (title, body, tags, reactions, and comments).
 *   - Media content if available.
 *   - Reaction and comment buttons with counts.
 * - Includes action buttons (Edit/Delete) for the post author.
 * - Appends the generated HTML to the specified container.
 */
export function renderPosts(container, posts) {
  const loggedInUser = localStorage.getItem("username");

  const postsHTML = posts
    .map((post) => {
      const postId = post.id;
      const authorAvatar =
        post.author?.avatar?.url || "/images/default-avatar.png";
      const authorName = post.author?.name || "Anonymous";
      const postDate = post.created
        ? new Date(post.created).toLocaleDateString()
        : "Unknown date";
      const tagsHTML =
        post.tags && post.tags.length
          ? `
              <div class="post-card-tags">
                  <span class="post-card-tags-label">Tags:</span>
                  <span class="post-card-tag-list">${post.tags.join(
                    ", "
                  )}</span>
              </div>
          `
          : "";

      const totalReactions =
        post.reactions?.reduce((sum, reaction) => sum + reaction.count, 0) || 0;
      const totalComments = post._count?.comments || 0;
      const userHasReacted = post.reactions?.some(
        (reaction) =>
          reaction.symbol === "❤️" && reaction.reactors?.includes(loggedInUser)
      );
      return `
    <div class="post-card-wrapper">
        <div class="post-card shadow-card p-6 max-w-[500px] mx-auto">
            <a href="/profile/?username=${authorName}" class="profile-link flex items-center gap-3 mb-4">
                <div class="post-card-header flex items-center gap-3">
                    <img src="${authorAvatar}" alt="${authorName}'s avatar" class="post-card-avatar w-10 h-10 rounded-full object-cover">
                    <span class="post-card-username font-semibold text-text-primary">${authorName}</span>
                </div>
            </a>

            <a href="/post/?id=${postId}" class="post-card-link">
                <div class="post-card-content">
                    <h3 class="post-card-title text-xl font-bold mb-4">${post.title}</h3>
                    ${post.media?.url ? `
                        <img src="${post.media.url}" alt="${post.media.alt || "Media"}" 
                             class="post-card-image w-full h-full object-cover mb-4"
                             onerror="this.onerror=null;this.src='/images/default-avatar.png';">
                    ` : ''}
                    <p class="post-card-body text-text-secondary mb-4">${post.body || ""}</p>
                </div>
            </a>

            <div class="post-card-footer flex flex-wrap items-center justify-between gap-4">
                ${tagsHTML}
                <span class="post-card-date text-text-secondary">${postDate}</span>
                ${loggedInUser === authorName ? `
                    <div class="post-card-actions flex gap-2">
                        <button onclick="window.location.href='/post/edit/?id=${post.id}'" class="post-card-edit px-4 py-2 text-primary hover:bg-primary/10">Edit</button>
                        <button class="post-card-delete px-4 py-2 text-red-500 hover:bg-red-50" data-id="${post.id}">Delete</button>
                    </div>
                ` : ''}
                <div class="reaction-container flex gap-4">
                    <button class="reaction-button ${userHasReacted ? 'text-red-500' : 'text-text-secondary'} hover:text-red-500"
                            data-post-id="${postId}"
                            data-symbol="❤️">
                        ♥️ ${totalReactions}
                    </button>
                    <button class="comment-button text-text-secondary hover:text-primary"
                            data-post-id="${postId}">
                        💬 ${totalComments}
                    </button>
                </div>
                <div class="comment-section" id="comments-${postId}" style="display: none;"></div>
            </div>
        </div>
    </div>
`;

    })
    .join("");

  container.insertAdjacentHTML("beforeend", postsHTML);
}
