from blog.models import Post  # Import Post model from blog app


def top_liked_posts(request):
    """
    Context processor to provide top 5 liked posts to all templates.
    """

    # Filter published posts (status=1) and order by likes descending
    top_posts = Post.objects.filter(status=1).order_by('-likes')

    # Sort posts by number_of_likes method, descending, and take top 5
    top_posts = sorted(
        top_posts,
        key=lambda post: post.number_of_likes(),
        reverse=True
    )[:5]

    # Return the top liked posts in the template context
    return {
        'top_liked_posts': top_posts
    }
