/* jshint esversion: 6 */

document.addEventListener('DOMContentLoaded', function() {
    // Function to get CSRF token from cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    
    // Function to handle like button clicks
    function handleLikeButtonClick(button, likesCountSelector) {
        const postSlug = button.getAttribute('data-post-slug');
        const likeUrl = `/${postSlug}/like/`;
        
        fetch(likeUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
        })
        .then(response => response.json())
        .then(data => {
            // Update the like count
            let likesCountElement;
            if (typeof likesCountSelector === 'string') {
                likesCountElement = document.querySelector(likesCountSelector);
            } else {
                likesCountElement = likesCountSelector;
            }
            
            if (likesCountElement) {
                likesCountElement.textContent = data.likes_count;
            }
            
            // Toggle the heart icon between solid and regular
            const heartIcon = button.querySelector('i');
            if (data.liked) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                button.classList.add('liked');
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                button.classList.remove('liked');
            }
        })
        .catch(error => console.error('Error:', error));
    }
    
    // Helper function to handle detail like button click
    function handleDetailLikeClick(event) {
        handleLikeButtonClick(this, '#likes-count', event);
    }
    
    // Helper function to handle card like button click
    function handleCardLikeClick(event) {
        // Find the closest likes-count element within the same card
        const likesCountElement = this.closest('p').querySelector('.likes-count');
        handleLikeButtonClick(this, likesCountElement, event);
    }
    
    // Handle like button on post detail page
    const detailLikeButton = document.getElementById('like-button');
    
    if (detailLikeButton) {
        detailLikeButton.addEventListener('click', handleDetailLikeClick);
    }
    
    // Handle like buttons on blog cards
    const cardLikeButtons = document.querySelectorAll('.card-like-btn');
    
    if (cardLikeButtons.length > 0) {
        cardLikeButtons.forEach(button => {
            button.addEventListener('click', handleCardLikeClick);
        });
    }
});