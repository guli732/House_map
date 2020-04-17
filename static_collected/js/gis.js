layui.use(["form"], function () {
    const $ = layui.jquery;
    const form = layui.form;

    function resize() {
        let headerRowHeight = $("body .layui-row:first-child").height();
        let searchRowHeight = $("body .layui-row:nth-child(2)").height();
        let documentHeight = $(window).height();
        $("#mapDiv").height(documentHeight - headerRowHeight - searchRowHeight);
        $("#left_msg").height(documentHeight - headerRowHeight - searchRowHeight);
    };

    resize();
    $(window).resize(() => {
        resize();
    });

    window.map = new AMap.Map("mapDiv", {
        resizeEnable: true,
        zoomEnable: true,
        center: [112.55, 37.87],
        zoom: 13,
    });

    function getLnglat(e) {
        var lnglat = e.lnglat;
        document.getElementById('lnglat').value = e.lnglat.toString()
        getArriveRange();
    }

    map.on('click', getLnglat);

    var centerMarker;

    function addCenterMarker(position) {
        if (!centerMarker) {
            centerMarker = new AMap.Marker({
                map: map,
                position: position
            });
        } else {
            centerMarker.setPosition(position)
        }
    }


    var arrivalRange, polygons = [];

    //添加多边形覆盖物
    function getArriveRange() {
        if (!arrivalRange) {
            arrivalRange = new AMap.ArrivalRange()
        }
        var lnglat = $("#lnglat").val().split(',');
        var t = $("#t").val();
        var v = $("#v").val();

        addCenterMarker(lnglat);

        arrivalRange.search(lnglat, t, function (status, result) {
            map.remove(polygons);
            polygons = [];
            if (result.bounds) {
                for (var i = 0; i < result.bounds.length; i++) {
                    var polygon = new AMap.Polygon({
                        fillColor: "#8B2500",
                        fillOpacity: "0.4",
                        strokeColor: "#00FF00",
                        strokeOpacity: "0.5",
                        strokeWeight: 1
                    });
                    polygon.setPath(result.bounds[i]);
                    polygons.push(polygon);
                }
                map.add(polygons);
                map.setFitView();
            }
        }, {
            policy: v
        });
    }


    var isChanged = false;
    $(function () {
        $('.single-slider').jRange({
            onstatechange: getArriveRange,
            from: 1,
            to: 45,
            step: 1,
            scale: [1, 15, 30, 45],
            format: '%s',
            width: 400,
            showLabels: true,
            showScale: true
        });
    });
    getArriveRange();

    $('#search').on('click', getArriveRange);
    $('#v').on('change', getArriveRange);
    $('#clear').on('click', function () {
        map.remove(polygons)
    });

});