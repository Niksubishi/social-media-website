import{h as i}from"./headers-B8g_0KXq.js";import{A as m}from"./constants-rqNHC8Ty.js";function L(a,o){const t=localStorage.getItem("username"),e=o.map(n=>{const r=n.id,s=n.author?.avatar?.url||"/images/default-avatar.png",c=n.author?.name||"Anonymous",d=n.created?new Date(n.created).toLocaleDateString():"Unknown date",u=n.reactions?.reduce((l,w)=>l+w.count,0)||0,p=n._count?.comments||0,g=n.reactions?.some(l=>l.symbol==="❤️"&&l.reactors?.includes(t));return`
              <div class="post-card-wrapper">
                  <div class="post-card">
                      <a href="/profile/?username=${c}" class="profile-link">
                          <div class="post-card-header">
                              <img src="${s}" alt="${c}'s avatar" class="post-card-avatar">
                              <span class="post-card-username">${c}</span>
                          </div>
                      </a>
                      <a href="/post/?id=${r}" class="post-card-link">
                          <div class="post-card-content">
                              <h3 class="post-card-title">${n.title}</h3>
                              ${n.media?.url?`
                                  <img src="${n.media.url}" alt="${n.media.alt||"Media"}" class="post-card-image"
                                    onerror="this.onerror=null;this.src='/images/default-avatar.png';" >
                              `:""}
                              <p class="post-card-body">${n.body||""}</p>
                          </div>
                      </a>
                      <div class="post-card-footer">
                          <span class="post-card-date">${d}</span>
                          ${t===c?`
                               <div class="post-card-actions">
                                 <button onclick="window.location.href='/post/edit/?id=${n.id}'" class="post-card-edit">Edit</button>
                                  <button class="post-card-delete" data-id="${n.id}">Delete</button>
                              </div>
                          `:""}
                          <div class="reaction-container">
                              <button
                                class="reaction-button ${g?"reacted":""}"
                                data-post-id="${r}"
                                data-symbol="❤️"
                              >
                                ❤️ ${u}
                              </button>
                              <button
                                class="comment-button"
                                data-post-id="${r}"
                              >
                                💬 ${p}
                              </button>
                          </div>
                          <!-- Comment Section Placeholder -->
                          <div class="comment-section" id="comments-${r}" style="display: none;">
                              <!-- Comments will be dynamically loaded here -->
                          </div>
                      </div>
                  </div>
              </div>
          `}).join("");a.insertAdjacentHTML("beforeend",e)}async function h(a){if(!a)throw new Error("No post ID provided.");const o={method:"DELETE",headers:i()};try{const t=await fetch(`${m}/${a}`,o);if(t.status===204)return;if(!t.ok){const e=await t.json();throw new Error(e.message||"Failed to delete post")}return t.json()}catch(t){throw console.error("Detailed API Error:",t),t}}async function v(a){if(a.target.classList.contains("post-card-delete")){const o=a.target.dataset.id;if(!window.confirm("Are you sure you want to delete this post?"))return;try{await h(o);const e=a.target.closest(".post-card");e&&e.remove(),alert("Post deleted successfully."),window.location.href="/"}catch(e){alert("Error deleting post: "+e.message)}}}async function $(a,o){const t=`${m}/${a}/react/${o}`;try{const e=await fetch(t,{method:"PUT",headers:i({contentType:!1})});if(!e.ok){const r=await e.text();throw new Error(`Failed to react to post: ${r}`)}return(await e.json()).data.reactions}catch(e){throw new Error(`Error toggling reaction: ${e.message}`)}}function T(){document.addEventListener("click",async a=>{if(a.target.classList.contains("reaction-button")){const o=a.target,t=o.dataset.postId,e=o.dataset.symbol||"❤️";if(!t)return;o.disabled=!0;try{const r=(await $(t,e)).find(d=>d.symbol===e),s=r?.count||0,c=r?.reactors?.includes(localStorage.getItem("username"));o.textContent=`${e} ${s}`,o.classList.toggle("reacted",c)}catch(n){console.error("Error toggling reaction:",n),alert("Error toggling reaction. Please try again.")}finally{o.disabled=!1}}})}async function f(a){const o=`${m}/${a}?_comments=true`;try{const t=await fetch(o,{method:"GET",headers:i()});if(!t.ok)throw new Error("Failed to fetch comments.");return(await t.json()).data.comments||[]}catch(t){throw console.error("Error fetching comments:",t),t}}async function y(a,o){const t=`${m}/${a}/comment`;try{const e=await fetch(t,{method:"POST",headers:i(),body:JSON.stringify({body:o})});if(!e.ok)throw new Error("Failed to post comment.");return(await e.json()).data}catch(e){throw console.error("Error posting comment:",e),e}}async function b(a,o){const t=`${m}/${a}/comment/${o}`;try{if(!(await fetch(t,{method:"DELETE",headers:i()})).ok)throw new Error("Failed to delete comment.");alert("Comment deleted!")}catch(e){throw console.error("Error deleting comment:",e),e}}function S(){document.addEventListener("click",async a=>{if(a.target.classList.contains("comment-button")){const o=a.target.dataset.postId,t=document.getElementById(`comments-${o}`),e=t.style.display==="block";if(t.style.display=e?"none":"block",!e&&!t.dataset.loaded)try{const n=await f(o);E(t,n,o),t.dataset.loaded=!0}catch{t.innerHTML="<p>Error loading comments.</p>"}}if(a.target.classList.contains("post-comment-button")){const o=a.target.dataset.postId,t=document.getElementById(`new-comment-${o}`),e=t.value.trim();if(!e){alert("Comment cannot be empty.");return}try{const n=await y(o,e),r=document.getElementById(`comments-${o}`),s=`
          <p id="comment-${n.id}">
            <strong>${n.owner}</strong>: ${n.body}
            <button class="delete-comment" data-post-id="${o}" data-comment-id="${n.id}" data-owner="${n.owner}">x</button>
          </p>
        `;document.getElementById(`new-comment-${o}`).insertAdjacentHTML("beforebegin",s),t.value="";const d=document.querySelector(`.comment-button[data-post-id="${o}"]`),u=parseInt(d.textContent.match(/\d+/))||0;d.innerHTML=`💬 ${u+1}`,alert("Comment posted!")}catch{alert("Failed to post comment. Please try again.")}}if(a.target.classList.contains("delete-comment")){const o=a.target.dataset.postId,t=a.target.dataset.commentId,e=a.target.dataset.owner,n=localStorage.getItem("username");if(e!==n){alert("You can only delete your own comments.");return}if(confirm("Are you sure you want to delete this comment?"))try{await b(o,t),document.getElementById(`comment-${t}`).remove();const s=document.querySelector(`.comment-button[data-post-id="${o}"]`),c=parseInt(s.textContent.match(/\d+/))||1;s.innerHTML=`💬 ${c-1}`}catch{alert("Failed to delete comment. Please try again.")}}})}function E(a,o,t){const e=o.sort((r,s)=>new Date(r.created)-new Date(s.created)),n=localStorage.getItem("username");a.innerHTML=`
    ${e.map(r=>`<p id="comment-${r.id}">
            <strong>${r.owner}</strong>: ${r.body}
            ${r.owner===n?`<button class="delete-comment" data-post-id="${t}" data-comment-id="${r.id}" data-owner="${r.owner}">x</button>`:""}
          </p>`).join("")}
    <textarea id="new-comment-${t}" placeholder="Write a comment..." class="textarea-comment"></textarea>
    <button class="post-comment-button" data-post-id="${t}">Post Comment</button>
  `}export{S as a,T as i,v as o,L as r};
