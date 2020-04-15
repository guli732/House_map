from django.core.paginator import Paginator
from django.shortcuts import render, HttpResponse
from .models import House_base
import json


def map_view(request):
    if request.method == 'POST':
        city = request.POST.get('city', None)
        price1 = request.POST.get('price1', None)
        price2 = request.POST.get('price2', None)
        totalprice1 = request.POST.get('totalprice1', None)
        totalprice2 = request.POST.get('totalprice2', None)
        direction = request.POST.get('direction', None)
        house_type = request.POST.get('house_type', None)
        house_area1 = request.POST.get('house_area1')
        house_area2 = request.POST.get('house_area2')
        try:
            house_area1 = float(house_area1)
            house_area2 = float(house_area2)
        except:
            pass
        print(city, price1, price2, totalprice1, totalprice2, direction, house_type, house_area1, house_area2)
        house_all = House_base.objects
        if city:
            house_data = house_all.filter(position=city)
        else:
            house_data = house_all
        if price1 and price2:
            house_data = house_data.filter(price__gte=price1, price__lt=price2)
        if totalprice1 and totalprice2:
            house_data = house_data.filter(totalprice__gte=totalprice1, totalprice__lt=totalprice2)
        if direction:
            house_data = house_data.filter(dircetion__contains=direction)
        if house_type:
            house_data = house_data.filter(house_type__contains=house_type)
        if house_area1 and house_area2:
            house_data = house_data.filter(house_area__gte=house_area1, house_area__lt=house_area2)
        data = json.dumps(list(house_data.values()))
        return HttpResponse(data)

    # 分页
    # house_all = House_base.objects.all()
    # page_of_house, page_range = page(request, house_all)
    # context = {}
    # context['page_of_house'] = page_of_house
    # context['page_range'] = page_range
    return render(request, 'map_view.html')


def page(request, house_all):
    paginator = Paginator(house_all, 6)  # 每6个分页
    page_num = request.GET.get('page', 1)  # 获取url的页码参数
    page_of_house = paginator.get_page(page_num)
    currentr_page_num = page_of_house.number  # 获取当前页码
    # 当前页码前后各两页
    page_range = list(range(max(currentr_page_num - 2, 1), currentr_page_num)) + list(
        range(currentr_page_num, min(currentr_page_num + 2, paginator.num_pages) + 1))
    # 省略页码
    if page_range[0] - 1 >= 2:
        page_range.insert(0, '...')
    if paginator.num_pages - page_range[-1] >= 2:
        page_range.append('...')
    # 首页和尾页
    if page_range[0] != 1:
        page_range.insert(0, 1)
    if page_range[-1] != paginator.num_pages:
        page_range.append(paginator.num_pages)

    return page_of_house, page_range