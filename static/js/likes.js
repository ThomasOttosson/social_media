document.addEventListener('DOMContentLoaded', function() {
    const likeButton = document.getElementById('like-button');
    
    if (likeButton) {
        likeButton.addEventListener('click', function() {
            const postSlug = this.getAttribute('data-post-slug');
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
                document.querySelector('#likes-count span').textContent = data.likes_count;
                
                // Toggle the heart icon between solid and regular
                const heartIcon = likeButton.querySelector('i');
                if (data.liked) {
                    heartIcon.classList.remove('far');
                    heartIcon.classList.add('fas');
                    likeButton.classList.add('liked');
                } else {
                    heartIcon.classList.remove('fas');
                    heartIcon.classList.add('far');
                    likeButton.classList.remove('liked');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
    
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
});