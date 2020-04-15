from django.shortcuts import render


def home_page(request):
    context = {}
    return render(request, 'home.html', context=context)


def about_page(request):
    context = {}
    return render(request, 'about.html', context=context)