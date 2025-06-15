from django.shortcuts import render  # Import render shortcut (unused here)
from django.http import HttpResponse  # Import HttpResponse for responses


def index(request):
    """
    Simple view that responds differently to POST and other methods.
    """

    if request.method == "POST":
        # If POST request, respond with a confirmation message
        return HttpResponse("You must have POSTed something")
    else:
        # For other methods, respond with the method name
        return HttpResponse(request.method)
