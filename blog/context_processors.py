from blog.models import Post


def top_liked_posts(request):
    """
    Context processor that makes the top 5 most
    liked posts available to all templates.
    """
    # Get published posts ordered by number of likes (descending)
    top_posts = Post.objects.filter(status=1).order_by('-likes')

    # Annotate with like count and order by it
    # We use Python sorting here since we
    # need to sort by the result of number_of_likes method
    top_posts = sorted(top_posts, key=lambda post: post.number_of_likes(), reverse=True)[:5]

    return {
        'top_liked_posts': top_posts
    }
