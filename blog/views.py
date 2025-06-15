from django.shortcuts import render, get_object_or_404, reverse
from django.views import generic
from django.contrib import messages
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required

from .models import Post, Comment
from .forms import CommentForm


class PostList(generic.ListView):
    """
    List view to display published posts with pagination.
    Supports HTMX infinite scroll by returning partial content.
    """
    queryset = Post.objects.filter(status=1)
    template_name = "blog/index.html"
    paginate_by = 6

    def get(self, request, *args, **kwargs):
        # Get normal response from parent class
        response = super().get(request, *args, **kwargs)

        # If request is from HTMX (infinite scroll)
        if request.headers.get('HX-Request') == 'true':
            # Return only partial template content for posts
            return render(
                request,
                "blog/includes/post_list_content.html",
                self.get_context_data(),
            )

        # Otherwise return full page response
        return response


def post_detail(request, slug):
    """
    Display a single post with comments.
    Handles new comment submission.
    """
    queryset = Post.objects.filter(status=1)
    post = get_object_or_404(queryset, slug=slug)

    # Retrieve all comments ordered newest first
    comments = post.comments.all().order_by("-created_on")

    # Count only approved comments for display
    comment_count = post.comments.filter(approved=True).count()

    if request.method == "POST":
        comment_form = CommentForm(data=request.POST)

        if comment_form.is_valid():
            comment = comment_form.save(commit=False)
            comment.author = request.user
            comment.post = post

            # Check if comment is a reply to another comment
            parent_id = request.POST.get('parent_id')
            if parent_id:
                comment.parent = get_object_or_404(Comment, id=parent_id)
                success_message = (
                    'Reply submitted and awaiting approval'
                )
            else:
                success_message = (
                    'Comment submitted and awaiting approval'
                )

            comment.save()
            messages.add_message(
                request, messages.SUCCESS, success_message
            )

            # Redirect to post detail after submission
            return HttpResponseRedirect(reverse('post_detail', args=[slug]))

    else:
        comment_form = CommentForm()

    # Render the post detail page with context data
    return render(
        request,
        "blog/post_detail.html",
        {
            "post": post,
            "comments": comments,
            "comment_count": comment_count,
            "comment_form": comment_form,
        },
    )


def comment_edit(request, slug, comment_id):
    """
    Edit an existing comment if user is the author.
    """
    if request.method == "POST":
        queryset = Post.objects.filter(status=1)
        post = get_object_or_404(queryset, slug=slug)
        comment = get_object_or_404(Comment, pk=comment_id)

        comment_form = CommentForm(data=request.POST, instance=comment)

        # Check that comment form is valid and user is comment author
        if comment_form.is_valid() and comment.author == request.user:
            comment = comment_form.save(commit=False)
            comment.post = post
            comment.approved = False  # Reset approval after edit
            comment.save()
            messages.add_message(
                request, messages.SUCCESS, 'Comment Updated!'
            )
        else:
            messages.add_message(
                request, messages.ERROR, 'Error updating comment!'
            )

    # Redirect back to the post detail page
    return HttpResponseRedirect(reverse('post_detail', args=[slug]))


def comment_delete(request, slug, comment_id):
    """
    Delete a comment if user is the author.
    """
    queryset = Post.objects.filter(status=1)
    post = get_object_or_404(queryset, slug=slug)

    try:
        comment = Comment.objects.get(pk=comment_id)

        # Only allow deletion if user owns the comment
        if comment.author == request.user:
            comment.delete()
            messages.add_message(
                request, messages.SUCCESS, 'Comment deleted!'
            )
        else:
            messages.add_message(
                request,
                messages.ERROR,
                'You can only delete your own comments!'
            )
    except Comment.DoesNotExist:
        messages.add_message(request, messages.ERROR, 'Comment not found!')

    # Redirect to post detail page after deletion attempt
    return HttpResponseRedirect(reverse('post_detail', args=[slug]))


@login_required
def post_like(request, slug):
    """
    Toggle like/unlike status for a post by the logged-in user.
    Returns JSON with updated like count and like status.
    """
    post = get_object_or_404(Post, slug=slug)

    if post.likes.filter(id=request.user.id).exists():
        # User already liked, so remove like
        post.likes.remove(request.user)
        liked = False
    else:
        # Add like from user
        post.likes.add(request.user)
        liked = True

    # Return JSON response with like status & count
    return JsonResponse({
        'likes_count': post.number_of_likes(),
        'liked': liked
    })
