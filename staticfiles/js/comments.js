/* jshint esversion: 6 */
/* global bootstrap */

const editButtons = document.getElementsByClassName("btn-edit");
const replyButtons = document.getElementsByClassName("btn-reply");
const cancelReplyButtons = document.getElementsByClassName("cancel-reply");
const commentText = document.getElementById("id_body");
const commentForm = document.getElementById("commentForm");
const submitButton = document.getElementById("submitButton");

const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
const deleteButtons = document.getElementsByClassName("btn-delete");
const deleteConfirm = document.getElementById("deleteConfirm");

// Get the post slug from the current URL path
function getPostSlug() {
  const path = window.location.pathname;
  const cleanPath = path.replace(/^\/|\/$/, "");
  const functionalEndpoints = ['edit_comment', 'delete_comment'];
  
  for (const endpoint of functionalEndpoints) {
    if (cleanPath.includes(endpoint)) {
      const parts = cleanPath.split(endpoint)[0];
      return parts.replace(/\/$/, "");
    }
  }
  
  const actionEndpoints = ['comment'];
  for (const endpoint of actionEndpoints) {
    if (cleanPath.includes(endpoint)) {
      const parts = cleanPath.split(endpoint)[0];
      return parts.replace(/\/$/, "");
    }
  }
  
  return cleanPath;
}

// Helper function for delete button logic
function handleDeleteClick(e) {
  const clickedElement = e.target.closest('.btn-delete');
  if (!clickedElement) return;
  
  const commentId = clickedElement.getAttribute("data-comment_id");
  if (!commentId || commentId === "null" || commentId === "undefined" || commentId === null || commentId === undefined) return;
  
  const slug = getPostSlug();
  if (!slug) return;
  
  const normalizedSlug = slug.endsWith('/') ? slug.slice(0, -1) : slug;
  deleteConfirm.href = `/${normalizedSlug}/delete_comment/${commentId}`;
  deleteModal.show();
}

// Helper function for reply button logic
function handleReplyClick(e) {
  const clickedElement = e.target.closest('.btn-reply');
  if (!clickedElement) return;
  
  const commentId = clickedElement.getAttribute("data-comment_id");
  if (!commentId) return;
  
  const replyForm = document.getElementById(`reply-form-${commentId}`);
  if (!replyForm) return;
  
  const allReplyForms = document.getElementsByClassName("reply-form-container");
  for (const form of allReplyForms) {
    if (form.id !== `reply-form-${commentId}`) {
      form.classList.add("hidden");
    }
  }
  
  replyForm.classList.toggle("hidden");
}

// Helper function for cancel reply button logic
function handleCancelReplyClick(e) {
  const clickedElement = e.target.closest('.cancel-reply');
  if (!clickedElement) return;
  
  const commentId = clickedElement.getAttribute("data-comment_id");
  if (!commentId) return;
  
  const replyForm = document.getElementById(`reply-form-${commentId}`);
  if (!replyForm) return;
  
  replyForm.classList.add("hidden");
}

// Edit comment button logic (show inline edit form only)
for (const button of editButtons) {
  button.addEventListener("click", function(e) {
    const clickedElement = e.target.closest('.btn-edit');
    if (!clickedElement) return;
    const commentId = clickedElement.getAttribute("data-comment_id");
    if (!commentId) return;
    // Hide all other edit forms
    const allEditForms = document.getElementsByClassName("edit-form-container");
    for (const form of allEditForms) {
      if (form.id !== `edit-form-${commentId}`) {
        form.classList.add("hidden");
      }
    }
    // Show the correct edit form
    const editForm = document.getElementById(`edit-form-${commentId}`);
    if (editForm) {
      editForm.classList.remove("hidden");
    }
  });
}

// Cancel edit button logic (hide inline edit form)
const cancelEditButtons = document.getElementsByClassName("cancel-edit");
for (const button of cancelEditButtons) {
  button.addEventListener("click", function(e) {
    const clickedElement = e.target.closest('.cancel-edit');
    if (!clickedElement) return;
    const commentId = clickedElement.getAttribute("data-comment_id");
    if (!commentId) return;
    const editForm = document.getElementById(`edit-form-${commentId}`);
    if (editForm) {
      editForm.classList.add("hidden");
    }
  });
}

// On page load, reset sidebar form for new comments only
if (commentForm && commentText && submitButton) {
  commentForm.setAttribute("action", "");
  commentText.value = "";
  submitButton.innerText = "Submit Comment";
}

// Delete comment button logic
for (const button of deleteButtons) {
  button.addEventListener("click", handleDeleteClick);
}

// Reply button logic
for (const button of replyButtons) {
  button.addEventListener("click", handleReplyClick);
}

// Cancel reply button logic
for (const button of cancelReplyButtons) {
  button.addEventListener("click", handleCancelReplyClick);
}

// Hide all reply forms on page load
document.addEventListener('DOMContentLoaded', () => {
  const allReplyForms = document.getElementsByClassName("reply-form-container");
  for (const form of allReplyForms) {
    form.classList.add("hidden");
  }
});