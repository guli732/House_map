from django.shortcuts import render


def others_view(request):
    context = {}
    return render(request, 'other_view.html', context=context)


def view_msg(request):
    context = {}
    return render(request, 'view_msg.html', context=context)