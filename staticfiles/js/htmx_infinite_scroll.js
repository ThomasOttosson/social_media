/* jshint esversion: 6 */

// This file provides minimal JavaScript support for htmx infinite scrolling
document.addEventListener('DOMContentLoaded', function() {
    // Hide the standard pagination if it exists
    const pagination = document.querySelector('.pagination');
    if (pagination) {
        pagination.style.display = 'none';
    }
    
    // Log initialization
    console.log('HTMX infinite scroll initialized');
    
    // Helper function to check if target has infinite scroll trigger
    function hasInfiniteScrollTrigger(target) {
        return target.hasAttribute('hx-trigger') && 
               target.getAttribute('hx-trigger').includes('revealed');
    }
    
    // Helper function to handle before request
    function handleBeforeRequest(event) {
        if (hasInfiniteScrollTrigger(event.detail.target)) {
            console.log('Loading more posts...');
            // You can add additional loading indicator logic here if needed
        }
    }
    
    // Helper function to handle after swap
    function handleAfterSwap(event) {
        if (hasInfiniteScrollTrigger(event.detail.target)) {
            console.log('New content loaded via infinite scroll');
            
            // Check if the response contains the 'no more posts' message
            const noMorePosts = document.querySelector('.no-more-posts');
            if (noMorePosts) {
                // Update the message to match the requested text
                const noMorePostsText = noMorePosts.querySelector('p');
                if (noMorePostsText) {
                    noMorePostsText.textContent = 'That is all, no more posts found';
                }
            }
        }
    }
    
    // Helper function to handle response errors
    function handleResponseError(event) {
        console.error('Error loading more content:', event.detail.error);
        
        // You could display a custom error message here
        const errorContainer = document.getElementById('error-container');
        if (errorContainer) {
            errorContainer.textContent = 'Failed to load more posts. Please try again later.';
            errorContainer.style.display = 'block';
        }
    }
    
    // Listen for htmx:beforeRequest events to show loading indicator
    document.body.addEventListener('htmx:beforeRequest', handleBeforeRequest);
    
    // Listen for htmx:afterSwap events to update UI after content is loaded
    document.body.addEventListener('htmx:afterSwap', handleAfterSwap);
    
    // Listen for htmx:responseError events to handle errors
    document.body.addEventListener('htmx:responseError', handleResponseError);
});