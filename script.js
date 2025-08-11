// Reading progress bar
window.onscroll = function() {
  let winScroll = document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("readingProgress").style.width = scrolled + "%";
};

// Dark mode toggle
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Blog search filter
document.getElementById("searchInput").addEventListener("keyup", function() {
  let filter = this.value.toLowerCase();
  let blogs = document.querySelectorAll(".blog-card");
  blogs.forEach(blog => {
    let title = blog.querySelector("h3").textContent.toLowerCase();
    blog.style.display = title.includes(filter) ? "" : "none";
  });
});

// Modal handling
const modal = document.getElementById("blogModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");
const commentList = document.getElementById("commentList");
const commentInput = document.getElementById("commentInput");
const addCommentBtn = document.getElementById("addComment");

let currentPostTitle = "";

// Open modal on blog click
document.querySelectorAll(".blog-card").forEach(card => {
  card.addEventListener("click", () => {
    currentPostTitle = card.dataset.title;
    modalTitle.textContent = currentPostTitle;
    modalContent.textContent = card.dataset.content;
    loadComments();
    modal.style.display = "flex";
  });
});

// Close modal
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

// Comments handling
function loadComments() {
  commentList.innerHTML = "";
  let comments = JSON.parse(localStorage.getItem(currentPostTitle)) || [];
  comments.forEach(c => {
    let li = document.createElement("li");
    li.textContent = c;
    commentList.appendChild(li);
  });
}

addCommentBtn.addEventListener("click", () => {
  let comment = commentInput.value.trim();
  if (comment) {
    let comments = JSON.parse(localStorage.getItem(currentPostTitle)) || [];
    comments.push(comment);
    localStorage.setItem(currentPostTitle, JSON.stringify(comments));
    commentInput.value = "";
    loadComments();
  }
});
