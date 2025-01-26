import{h as i}from"./headers-RPXbKLV3.js";import{A as m}from"./constants-Dyo2zk30.js";function C(n,a){const t=localStorage.getItem("username"),e=a.map(o=>{const r=o.id,s=o.author?.avatar?.url||"/images/default-avatar.png",c=o.author?.name||"Anonymous",d=o.created?new Date(o.created).toLocaleDateString():"Unknown date",u=o.tags&&o.tags.length?`
              <div class="post-card-tags">
                  <span class="post-card-tags-label">Tags:</span>
                  <span class="post-card-tag-list">${o.tags.join(", ")}</span>
              </div>
          `:"",p=o.reactions?.reduce((l,y)=>l+y.count,0)||0,g=o._count?.comments||0,f=o.reactions?.some(l=>l.symbol==="❤️"&&l.reactors?.includes(t));return`
    <div class="post-card-wrapper">
        <div class="post-card shadow-card p-6 max-w-[500px] mx-auto">
            <a href="/profile/?username=${c}" class="profile-link flex items-center gap-3 mb-4">
                <div class="post-card-header flex items-center gap-3">
                    <img src="${s}" alt="${c}'s avatar" class="post-card-avatar w-10 h-10 rounded-full object-cover">
                    <span class="post-card-username font-semibold text-text-primary">${c}</span>
                </div>
            </a>

            <a href="/post/?id=${r}" class="post-card-link">
                <div class="post-card-content">
                    <h3 class="post-card-title text-xl font-bold mb-4">${o.title}</h3>
                    ${o.media?.url?`
                        <img src="${o.media.url}" alt="${o.media.alt||"Media"}" 
                             class="post-card-image w-full h-full object-cover mb-4"
                             onerror="this.onerror=null;this.src='/images/default-avatar.png';">
                    `:""}
                    <p class="post-card-body text-text-secondary mb-4">${o.body||""}</p>
                </div>
            </a>

            <div class="post-card-footer flex flex-wrap items-center justify-between gap-4">
                ${u}
                <span class="post-card-date text-text-secondary">${d}</span>
                ${t===c?`
                    <div class="post-card-actions flex gap-2">
                        <button onclick="window.location.href='/post/edit/?id=${o.id}'" class="post-card-edit px-4 py-2 text-primary hover:bg-primary/10">Edit</button>
                        <button class="post-card-delete px-4 py-2 text-red-500 hover:bg-red-50" data-id="${o.id}">Delete</button>
                    </div>
                `:""}
                <div class="reaction-container flex gap-4">
                    <button class="reaction-button ${f?"text-red-500":"text-text-secondary"} hover:text-red-500"
                            data-post-id="${r}"
                            data-symbol="❤️">
                        ♥️ ${p}
                    </button>
                    <button class="comment-button text-text-secondary hover:text-primary"
                            data-post-id="${r}">
                        💬 ${g}
                    </button>
                </div>
                <div class="comment-section" id="comments-${r}" style="display: none;"></div>
            </div>
        </div>
    </div>
`}).join("");n.insertAdjacentHTML("beforeend",e)}async function h(n){if(!n)throw new Error("No post ID provided.");const a={method:"DELETE",headers:i()};try{const t=await fetch(`${m}/${n}`,a);if(t.status===204)return;if(!t.ok){const e=await t.json();throw new Error(e.message||"Failed to delete post")}return t.json()}catch(t){throw console.error("Detailed API Error:",t),t}}async function L(n){if(n.target.classList.contains("post-card-delete")){const a=n.target.dataset.id;if(!window.confirm("Are you sure you want to delete this post?"))return;try{await h(a);const e=n.target.closest(".post-card");e&&e.remove(),alert("Post deleted successfully."),window.location.href="/"}catch(e){alert("Error deleting post: "+e.message)}}}async function w(n,a){const t=`${m}/${n}/react/${a}`;try{const e=await fetch(t,{method:"PUT",headers:i({contentType:!1})});if(!e.ok){const r=await e.text();throw new Error(`Failed to react to post: ${r}`)}return(await e.json()).data.reactions}catch(e){throw new Error(`Error toggling reaction: ${e.message}`)}}function T(){document.addEventListener("click",async n=>{if(n.target.classList.contains("reaction-button")){const a=n.target,t=a.dataset.postId,e=a.dataset.symbol||"❤️";if(!t)return;a.disabled=!0;try{const r=(await w(t,e)).find(d=>d.symbol===e),s=r?.count||0,c=r?.reactors?.includes(localStorage.getItem("username"));a.textContent=`${e} ${s}`,a.classList.toggle("reacted",c)}catch(o){console.error("Error toggling reaction:",o),alert("Error toggling reaction. Please try again.")}finally{a.disabled=!1}}})}async function $(n){const a=`${m}/${n}?_comments=true`;try{const t=await fetch(a,{method:"GET",headers:i()});if(!t.ok)throw new Error("Failed to fetch comments.");return(await t.json()).data.comments||[]}catch(t){throw console.error("Error fetching comments:",t),t}}async function b(n,a){const t=`${m}/${n}/comment`;try{const e=await fetch(t,{method:"POST",headers:i(),body:JSON.stringify({body:a})});if(!e.ok)throw new Error("Failed to post comment.");return(await e.json()).data}catch(e){throw console.error("Error posting comment:",e),e}}async function x(n,a){const t=`${m}/${n}/comment/${a}`;try{if(!(await fetch(t,{method:"DELETE",headers:i()})).ok)throw new Error("Failed to delete comment.");alert("Comment deleted!")}catch(e){throw console.error("Error deleting comment:",e),e}}function S(){document.addEventListener("click",async n=>{if(n.target.classList.contains("comment-button")){const a=n.target.dataset.postId,t=document.getElementById(`comments-${a}`),e=t.style.display==="block";if(t.style.display=e?"none":"block",!e&&!t.dataset.loaded)try{const o=await $(a);E(t,o,a),t.dataset.loaded=!0}catch{t.innerHTML="<p>Error loading comments.</p>"}}if(n.target.classList.contains("post-comment-button")){const a=n.target.dataset.postId,t=document.getElementById(`new-comment-${a}`),e=t.value.trim();if(!e){alert("Comment cannot be empty.");return}try{const o=await b(a,e),r=document.getElementById(`comments-${a}`),s=`
          <p id="comment-${o.id}">
            <strong>${o.owner}</strong>: ${o.body}
            <button class="delete-comment" data-post-id="${a}" data-comment-id="${o.id}" data-owner="${o.owner}">x</button>
          </p>
        `;document.getElementById(`new-comment-${a}`).insertAdjacentHTML("beforebegin",s),t.value="";const d=document.querySelector(`.comment-button[data-post-id="${a}"]`),u=parseInt(d.textContent.match(/\d+/))||0;d.innerHTML=`💬 ${u+1}`,alert("Comment posted!")}catch{alert("Failed to post comment. Please try again.")}}if(n.target.classList.contains("delete-comment")){const a=n.target.dataset.postId,t=n.target.dataset.commentId,e=n.target.dataset.owner,o=localStorage.getItem("username");if(e!==o){alert("You can only delete your own comments.");return}if(confirm("Are you sure you want to delete this comment?"))try{await x(a,t),document.getElementById(`comment-${t}`).remove();const s=document.querySelector(`.comment-button[data-post-id="${a}"]`),c=parseInt(s.textContent.match(/\d+/))||1;s.innerHTML=`💬 ${c-1}`}catch{alert("Failed to delete comment. Please try again.")}}})}function E(n,a,t){const e=a.sort((r,s)=>new Date(r.created)-new Date(s.created)),o=localStorage.getItem("username");n.innerHTML=`
    ${e.map(r=>`<p id="comment-${r.id}">
            <strong>${r.owner}</strong>: ${r.body}
            ${r.owner===o?`<button class="delete-comment" data-post-id="${t}" data-comment-id="${r.id}" data-owner="${r.owner}">x</button>`:""}
          </p>`).join("")}
    <textarea id="new-comment-${t}" placeholder="Write a comment..." class="textarea-comment"></textarea>
    <button class="post-comment-button" data-post-id="${t}">Post Comment</button>
  `}export{S as a,T as i,L as o,C as r};
