from django.shortcuts import render  # Render templates with context
from django.contrib import messages  # Django messaging framework
from .models import About  # Import About model
from .forms import CollaborateForm  # Import form for collaboration requests


def about_me(request):
    # Handle the About page and collaboration form submission

    if request.method == "POST":
        # Bind form with POST data
        collaborate_form = CollaborateForm(data=request.POST)
        if collaborate_form.is_valid():
            # Save the valid form data to the database
            collaborate_form.save()
            # Add success message to display to the user
            messages.add_message(
                request,
                messages.SUCCESS,
                "Collaboration request received! I endeavour to respond "
                "within 2 working days.",
            )

    # Get the latest About entry, ordered by update time descending
    about = About.objects.all().order_by('-updated_on').first()

    # Initialize an empty collaboration form for GET or after POST
    collaborate_form = CollaborateForm()

    # Render the template with About info and collaboration form context
    return render(
        request,
        "about/about.html",
        {
            "about": about,
            "collaborate_form": collaborate_form,
        },
    )
