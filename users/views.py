from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .forms import UserRegisterForm, UserUpdateForm, ProfileUpdateForm
from .models import Profile


def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}! You can now log in.')
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request, 'users/register.html', {'form': form})


@login_required
def profile(request):
    # Ensure the user has a profile
    try:
        profile = request.user.profile
    except User.profile.RelatedObjectDoesNotExist:
        # Create a profile if it doesn't exist
        profile = Profile.objects.create(user=request.user)

    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(request.POST, request.FILES, instance=profile)
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            messages.success(request, 'Your profile has been updated!')
            return redirect('profile')
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=profile)

    context = {
        'u_form': u_form,
        'p_form': p_form
    }

    return render(request, 'users/profile.html', context)


def public_profile(request, username):
    # Get the user by username or return 404 if not found
    user = get_object_or_404(User, username=username)

    # Get the user's profile
    try:
        profile = user.profile
    except User.profile.RelatedObjectDoesNotExist:
        # Create a profile if it doesn't exist
        profile = Profile.objects.create(user=user)

    # Get the user's blog posts if they have any
    posts = user.blog_posts.filter(status=1).order_by('-created_on')

    context = {
        'profile_user': user,  # Use profile_user to avoid conflict with request.user
        'profile': profile,
        'posts': posts
    }

    return render(request, 'users/public_profile.html', context)
