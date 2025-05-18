const editButtons = document.getElementsByClassName("btn-edit");
const replyButtons = document.getElementsByClassName("btn-reply");
const cancelReplyButtons = document.getElementsByClassName("cancel-reply");
const commentText = document.getElementById("id_body");
const commentForm = document.getElementById("commentForm");
const submitButton = document.getElementById("submitButton");

const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
const deleteButtons = document.getElementsByClassName("btn-delete");
const deleteConfirm = document.getElementById("deleteConfirm");

/**
 * Get the post slug from the current URL path
 * 
 * @returns {string} The post slug extracted from the URL
 */
function getPostSlug() {
  // Get the current path (e.g., "/this-is-a-dummy-article/")
  const path = window.location.pathname;
  
  // Remove leading and trailing slashes
  const cleanPath = path.replace(/^\/|\/$/, "");
  
  // Check if the path contains functional endpoints
  const functionalEndpoints = ['edit_comment', 'delete_comment'];
  
  // For paths with functional endpoints, extract everything before that endpoint
  for (const endpoint of functionalEndpoints) {
    if (cleanPath.includes(endpoint)) {
      // Get everything before the endpoint
      const parts = cleanPath.split(endpoint)[0];
      // Remove the trailing slash if present
      return parts.replace(/\/$/, "");
    }
  }
  
  // If no functional endpoints found, check if there are any slashes
  // If slashes exist, the post slug might be multiple segments (for nested routes)
  // For simplicity in this fix, we'll assume the post slug is everything before any
  // potential action endpoints like 'comment', 'like', etc.
  const actionEndpoints = ['comment'];
  for (const endpoint of actionEndpoints) {
    if (cleanPath.includes(endpoint)) {
      const parts = cleanPath.split(endpoint)[0];
      return parts.replace(/\/$/, "");
    }
  }
  
  // If no endpoints found, return the first segment as before
  // This handles the case of just viewing a post
  return cleanPath;
}

/**
 * Initializes edit functionality for the provided edit buttons.
 * 
 * For each button in the `editButtons` collection:
 * - Retrieves the associated comment's ID upon click.
 * - Fetches the content of the corresponding comment.
 * - Populates the `commentText` input/textarea with the comment's content for editing.
 * - Updates the submit button's text to "Update".
 * - Sets the form's action attribute to the `edit_comment/{commentId}` endpoint.
 */
for (let button of editButtons) {
  button.addEventListener("click", (e) => {
    // Make sure we get the button element even if a child element was clicked
    const clickedElement = e.target.closest('.btn-edit');
    if (!clickedElement) return;
    
    let commentId = clickedElement.getAttribute("data-comment_id");
    if (!commentId) {
      console.error("Comment ID is missing");
      return;
    }
    
    let commentContent = document.getElementById(`comment${commentId}`).innerText;
    commentText.value = commentContent.trim();
    submitButton.innerText = "Update";
    
    // Get the post slug and construct the proper URL
    const slug = getPostSlug();
    commentForm.setAttribute("action", `${slug}/edit_comment/${commentId}`);
  });
}

/**
 * Initializes deletion functionality for the provided delete buttons.
 * 
 * For each button in the `deleteButtons` collection:
 * - Retrieves the associated comment's ID upon click.
 * - Updates the `deleteConfirm` link's href to point to the 
 * deletion endpoint for the specific comment.
 * - Displays a confirmation modal (`deleteModal`) to prompt 
 * the user for confirmation before deletion.
 */
for (let button of deleteButtons) {
  button.addEventListener("click", (e) => {
    // Make sure we get the button element even if a child element was clicked
    const clickedElement = e.target.closest('.btn-delete');
    if (!clickedElement) return;
    
    let commentId = clickedElement.getAttribute("data-comment_id");
    
    // Enhanced validation for comment ID
    if (!commentId || commentId === "null" || commentId === "undefined" || commentId === null || commentId === undefined) {
      console.error("Cannot delete: Invalid comment ID", commentId);
      return; // Don't proceed with deletion for invalid IDs
    }
    
    // Use the getPostSlug function to get the post slug
    const slug = getPostSlug();
    
    if (!slug) {
      console.error("Cannot determine post slug from URL");
      alert("Error: Cannot determine post URL");
      return;
    }
    
    // Construct the full URL with the proper path including the post slug
    // Ensure no double slashes by using a normalized slug
    const normalizedSlug = slug.endsWith('/') ? slug.slice(0, -1) : slug;
    deleteConfirm.href = `/${normalizedSlug}/delete_comment/${commentId}`;
    
    // Log the delete URL for debugging
    console.log("Delete URL:", deleteConfirm.href);
    
    // Show the delete confirmation modal
    deleteModal.show();
  });
}

/**
 * Initializes reply functionality for the provided reply buttons.
 * 
 * For each button in the `replyButtons` collection:
 * - Retrieves the associated comment's ID upon click.
 * - Shows the reply form container for that specific comment.
 * - Hides any other open reply forms to ensure only one is visible at a time.
 */
for (let button of replyButtons) {
  button.addEventListener("click", (e) => {
    // Make sure we get the button element even if a child element was clicked
    const clickedElement = e.target.closest('.btn-reply');
    if (!clickedElement) return;
    
    let commentId = clickedElement.getAttribute("data-comment_id");
    if (!commentId) {
      console.error("Comment ID is missing");
      return;
    }
    
    let replyForm = document.getElementById(`reply-form-${commentId}`);
    if (!replyForm) {
      console.error(`Reply form for comment ${commentId} not found`);
      return;
    }
    
    // Hide all other reply forms first
    let allReplyForms = document.getElementsByClassName("reply-form-container");
    for (let form of allReplyForms) {
      if (form.id !== `reply-form-${commentId}`) {
        form.classList.add("hidden");
      }
    }
    
    // Toggle the clicked reply form
    replyForm.classList.toggle("hidden");
  });
}

/**
 * Initializes cancel reply functionality for the provided cancel buttons.
 * 
 * For each button in the `cancelReplyButtons` collection:
 * - Retrieves the associated comment's ID upon click.
 * - Hides the reply form container for that specific comment.
 */
for (let button of cancelReplyButtons) {
  button.addEventListener("click", (e) => {
    // Make sure we get the button element even if a child element was clicked
    const clickedElement = e.target.closest('.cancel-reply');
    if (!clickedElement) return;
    
    let commentId = clickedElement.getAttribute("data-comment_id");
    if (!commentId) {
      console.error("Comment ID is missing");
      return;
    }
    
    let replyForm = document.getElementById(`reply-form-${commentId}`);
    if (!replyForm) {
      console.error(`Reply form for comment ${commentId} not found`);
      return;
    }
    
    replyForm.classList.add("hidden");
  });
}

// Initialize all reply forms to be hidden by default
document.addEventListener('DOMContentLoaded', () => {
  const allReplyForms = document.getElementsByClassName("reply-form-container");
  for (let form of allReplyForms) {
    form.classList.add("hidden");
  }
});