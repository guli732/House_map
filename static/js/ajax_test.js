layui.use('laypage', function () {
    var laypage = layui.laypage;
    var $ = layui.jquery;

    $("#searchBtn").click(function () {
        $.ajax({
            url: "/map_view/",
            type: "post",
            data: {
                city: $(".city").val(),
                price1: $(".price1").val(),
                price2: $(".price2").val(),
                totalprice1: $(".totalprice1").val(),
                totalprice2: $(".totalprice2").val(),
                direction: $(".direction").val(),
                house_type: $(".house_type").val(),
                house_area1: $(".house_area1").val(),
                house_area2: $(".house_area2").val(),
            },
            success: function (house_data) {
                window.datas = eval(house_data);
                fenye(datas);
                point(datas);
            }
        })
    });

    function point(datas) {
        map.clearMap();
        var geocoder;
        AMap.plugin(["AMap.Geocoder"], function () {
            geocoder = new AMap.Geocoder({
                city: "太原",
            })
        });
        for (let i = 0; i < datas.length; i++) {
            var name = datas[i].name;
            var address = '山西省太原市' + name;

            function test(address, name) {
                geocoder.getLocation(address, function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        var lnglat = result.geocodes[0].location;
                        // 经度
                        lng = lnglat['lng'];
                        // 纬度
                        lat = lnglat['lat'];
                        var marker = new AMap.Marker({
                            position: new AMap.LngLat(lng, lat),
                            title: name,
                            bubble: true,
                        });
                        map.add(marker);
                    }
                });
            }

            test(address, name);
        }

        // geocoder.getLocation(address, function (status, result) {
        //         if (status === 'complete' && result.info === 'OK') {
        //             var lnglat = result.geocodes[0].location;
        //             // 经度
        //             lng = lnglat['lng'];
        //             // 纬度
        //             lat = lnglat['lat'];
        //             var marker = new AMap.Marker({
        //                 position: new AMap.LngLat(lng, lat),
        //                 // title: name,
        //                 bubble: true,
        //             });
        //             map.add(marker);
        //         }
        //     }
        // )
        //     }
        // }
    }

    function fenye(data) {
        laypage.render({
            elem: 'page',
            limit: 6,
            count: data.length,
            groups: 3,
            jump: function (obj) {
                var thisData = data.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
                let html = '';
                for (let i = 0; i < thisData.length; i++) {
                    html += "<div class=\"layui-row resultsItem\" id=\"" + thisData[i].id + "\">";
                    // html += "<div class=\"layui-row resultsItem\">";
                    html += "<div class=\"layui-col-md3\">";
                    html += "<img src=\"" + thisData[i].img + "\" alt=\"暂无照片\" class=\"resultsItemImg\" referrerpolicy=\"no-referrer\"/>";
                    html += "</div>";
                    html += "<div class=\"layui-col-md9\" style=\"padding-left: 15px;\">";
                    html += "<div class=\"resultsItemTitle\">";
                    html += thisData[i].title;
                    html += "</div>";
                    html += "<div class=\"resultsItemXiaoqu\">";
                    html += "<div class=\"layui-col-md6\">";
                    html += "<div class=\"resultsItemName\">";
                    html += "<i class=\"layui-icon layui-icon-home\"></i>&nbsp; " + thisData[i].name;
                    html += "</div>";
                    html += "</div>";
                    html += "<div class=\"layui-col-md6\">";
                    html += "<div class=\"resultsItemArea\">";
                    html += "面积：" + thisData[i].house_area;
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class=\"layui-row resultsJiageContainer\">";
                    html += "<div class=\"layui-col-md6\">";
                    html += "<div class=\"resultsItemDanjia\">";
                    html += "单价：" + thisData[i].price + "元/平米";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class=\"layui-col-md6\">";
                    html += "<div class=\"resultsItemZongjia\">";
                    html += "总价：" + thisData[i].totalprice + "万";
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";
                }
                $("#resultDiv").html(html);
            }
        })
    }

});

layui.use('layer', function () {
    var $ = layui.jquery;
    var layer = layui.layer;

    $("#resultDiv").on('click', '.resultsItem', function () {
        var id = $(this).attr('id');
        console.log(id);
        var res = datas.filter(function (e) {
            return e.id == id;
        });
        console.log(res);
        let html = '';
        html += '<div style="padding: 10px;">' +
            '<p>标题：&nbsp;' + res[0].title + '</p>' +
            '<p>小区名称：&nbsp;' + res[0].name + '</p>' +
            '<p>所在区域：&nbsp;' + res[0].position + '</p>' +
            '<p>总价：&nbsp;' + res[0].totalprice + '万</p>' +
            '<p>单价：&nbsp;' + res[0].price + '元/平米</p>' +
            '<p>面积：&nbsp;' + res[0].house_area + '平米</p>' +
            '<p>简介：&nbsp;' + res[0].sub + '</p>' +
            '<p>户型：&nbsp;' + res[0].house_type + '</p>' +
            '<p>所在楼层：&nbsp;' + res[0].floor + '</p>' +
            '<p>房屋朝向：&nbsp;' + res[0].dircetion + '</p>' +
            '<p>装修情况：&nbsp;' + res[0].renovation + '</p>' +
            '<p>供暖方式：&nbsp;' + res[0].mode + '</p>' +
            '</div>';
        layer.open({
            type: 1,
            anim: 1,
            time: 10000,
            resize: false,
            title: ["详细信息", "font-size:18px"],
            area: ['600px', '360px'],
            shadeClose: true, //点击遮罩关闭
            content: html
        });
    });
});