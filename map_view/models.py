from django.db import models


class House_base(models.Model):
    # 标题
    title = models.CharField(max_length=50)
    # 小区名称
    name = models.CharField(max_length=50)
    # 所在区域
    position = models.CharField(max_length=100)
    # 总价
    totalprice = models.IntegerField()
    # 单价
    price = models.IntegerField()
    # 简介
    sub = models.CharField(max_length=100)
    # 面积
    house_area = models.FloatField()
    # 房屋户型
    house_type = models.CharField(max_length=20)
    # 所在楼层
    floor = models.CharField(max_length=20)
    # 房屋朝向
    dircetion = models.CharField(max_length=20)
    # 装修情况
    renovation = models.CharField(max_length=20)
    # 供暖方式
    mode = models.CharField(max_length=20)
    # 图片地址
    img = models.CharField(max_length=200)

    def __str__(self):
        return "<House: %s>" % self.name

    class Meta:
        ordering = ['-id']