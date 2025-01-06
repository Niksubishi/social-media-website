import{h as i}from"./headers-RPXbKLV3.js";import{A as m}from"./constants-Dyo2zk30.js";function L(a,n){const t=localStorage.getItem("username"),e=n.map(o=>{const s=o.id,r=o.author?.avatar?.url||"/images/default-avatar.png",c=o.author?.name||"Anonymous",d=o.created?new Date(o.created).toLocaleDateString():"Unknown date",u=o.tags&&o.tags.length?`
              <div class="post-card-tags">
                  <span class="post-card-tags-label">Tags:</span>
                  <span class="post-card-tag-list">${o.tags.join(", ")}</span>
              </div>
          `:"",p=o.reactions?.reduce((l,h)=>l+h.count,0)||0,g=o._count?.comments||0,$=o.reactions?.some(l=>l.symbol==="❤️"&&l.reactors?.includes(t));return`
              <div class="post-card-wrapper">
                  <div class="post-card">
                      <a href="/profile/?username=${c}" class="profile-link">
                          <div class="post-card-header">
                              <img src="${r}" alt="${c}'s avatar" class="post-card-avatar">
                              <span class="post-card-username">${c}</span>
                          </div>
                      </a>
                      <a href="/post/?id=${s}" class="post-card-link">
                          <div class="post-card-content">
                              <h3 class="post-card-title">${o.title}</h3>
                              ${o.media?.url?`
                                  <img src="${o.media.url}" alt="${o.media.alt||"Media"}" class="post-card-image"
                                    onerror="this.onerror=null;this.src='/images/default-avatar.png';" >
                              `:""}
                              <p class="post-card-body">${o.body||""}</p>
                          </div>
                      </a>
                      <div class="post-card-footer">
                          ${u}
                          <span class="post-card-date">${d}</span>
                          ${t===c?`
                               <div class="post-card-actions">
                                 <button onclick="window.location.href='/post/edit/?id=${o.id}'" class="post-card-edit">Edit</button>
                                  <button class="post-card-delete" data-id="${o.id}">Delete</button>
                              </div>
                          `:""}
                          <div class="reaction-container">
                              <button
                                class="reaction-button ${$?"reacted":""}"
                                data-post-id="${s}"
                                data-symbol="❤️"
                              >
                                ❤️ ${p}
                              </button>
                              <button
                                class="comment-button"
                                data-post-id="${s}"
                              >
                                💬 ${g}
                              </button>
                          </div>
                          <!-- Comment Section Placeholder -->
                          <div class="comment-section" id="comments-${s}" style="display: none;">
                              <!-- Comments will be dynamically loaded here -->
                          </div>
                      </div>
                  </div>
              </div>
          `}).join("");a.insertAdjacentHTML("beforeend",e)}async function w(a){if(!a)throw new Error("No post ID provided.");const n={method:"DELETE",headers:i()};try{const t=await fetch(`${m}/${a}`,n);if(t.status===204)return;if(!t.ok){const e=await t.json();throw new Error(e.message||"Failed to delete post")}return t.json()}catch(t){throw console.error("Detailed API Error:",t),t}}async function T(a){if(a.target.classList.contains("post-card-delete")){const n=a.target.dataset.id;if(!window.confirm("Are you sure you want to delete this post?"))return;try{await w(n);const e=a.target.closest(".post-card");e&&e.remove(),alert("Post deleted successfully."),window.location.href="/"}catch(e){alert("Error deleting post: "+e.message)}}}async function f(a,n){const t=`${m}/${a}/react/${n}`;try{const e=await fetch(t,{method:"PUT",headers:i({contentType:!1})});if(!e.ok){const s=await e.text();throw new Error(`Failed to react to post: ${s}`)}return(await e.json()).data.reactions}catch(e){throw new Error(`Error toggling reaction: ${e.message}`)}}function S(){document.addEventListener("click",async a=>{if(a.target.classList.contains("reaction-button")){const n=a.target,t=n.dataset.postId,e=n.dataset.symbol||"❤️";if(!t)return;n.disabled=!0;try{const s=(await f(t,e)).find(d=>d.symbol===e),r=s?.count||0,c=s?.reactors?.includes(localStorage.getItem("username"));n.textContent=`${e} ${r}`,n.classList.toggle("reacted",c)}catch(o){console.error("Error toggling reaction:",o),alert("Error toggling reaction. Please try again.")}finally{n.disabled=!1}}})}async function y(a){const n=`${m}/${a}?_comments=true`;try{const t=await fetch(n,{method:"GET",headers:i()});if(!t.ok)throw new Error("Failed to fetch comments.");return(await t.json()).data.comments||[]}catch(t){throw console.error("Error fetching comments:",t),t}}async function b(a,n){const t=`${m}/${a}/comment`;try{const e=await fetch(t,{method:"POST",headers:i(),body:JSON.stringify({body:n})});if(!e.ok)throw new Error("Failed to post comment.");return(await e.json()).data}catch(e){throw console.error("Error posting comment:",e),e}}async function E(a,n){const t=`${m}/${a}/comment/${n}`;try{if(!(await fetch(t,{method:"DELETE",headers:i()})).ok)throw new Error("Failed to delete comment.");alert("Comment deleted!")}catch(e){throw console.error("Error deleting comment:",e),e}}function x(){document.addEventListener("click",async a=>{if(a.target.classList.contains("comment-button")){const n=a.target.dataset.postId,t=document.getElementById(`comments-${n}`),e=t.style.display==="block";if(t.style.display=e?"none":"block",!e&&!t.dataset.loaded)try{const o=await y(n);I(t,o,n),t.dataset.loaded=!0}catch{t.innerHTML="<p>Error loading comments.</p>"}}if(a.target.classList.contains("post-comment-button")){const n=a.target.dataset.postId,t=document.getElementById(`new-comment-${n}`),e=t.value.trim();if(!e){alert("Comment cannot be empty.");return}try{const o=await b(n,e),s=document.getElementById(`comments-${n}`),r=`
          <p id="comment-${o.id}">
            <strong>${o.owner}</strong>: ${o.body}
            <button class="delete-comment" data-post-id="${n}" data-comment-id="${o.id}" data-owner="${o.owner}">x</button>
          </p>
        `;document.getElementById(`new-comment-${n}`).insertAdjacentHTML("beforebegin",r),t.value="";const d=document.querySelector(`.comment-button[data-post-id="${n}"]`),u=parseInt(d.textContent.match(/\d+/))||0;d.innerHTML=`💬 ${u+1}`,alert("Comment posted!")}catch{alert("Failed to post comment. Please try again.")}}if(a.target.classList.contains("delete-comment")){const n=a.target.dataset.postId,t=a.target.dataset.commentId,e=a.target.dataset.owner,o=localStorage.getItem("username");if(e!==o){alert("You can only delete your own comments.");return}if(confirm("Are you sure you want to delete this comment?"))try{await E(n,t),document.getElementById(`comment-${t}`).remove();const r=document.querySelector(`.comment-button[data-post-id="${n}"]`),c=parseInt(r.textContent.match(/\d+/))||1;r.innerHTML=`💬 ${c-1}`}catch{alert("Failed to delete comment. Please try again.")}}})}function I(a,n,t){const e=n.sort((s,r)=>new Date(s.created)-new Date(r.created)),o=localStorage.getItem("username");a.innerHTML=`
    ${e.map(s=>`<p id="comment-${s.id}">
            <strong>${s.owner}</strong>: ${s.body}
            ${s.owner===o?`<button class="delete-comment" data-post-id="${t}" data-comment-id="${s.id}" data-owner="${s.owner}">x</button>`:""}
          </p>`).join("")}
    <textarea id="new-comment-${t}" placeholder="Write a comment..." class="textarea-comment"></textarea>
    <button class="post-comment-button" data-post-id="${t}">Post Comment</button>
  `}export{x as a,S as i,T as o,L as r};
