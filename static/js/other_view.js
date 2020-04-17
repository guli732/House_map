layui.use(["form"], function () {
    const $ = layui.jquery;

    function resize() {
        let headerRowHeight = $(".layui-header").height();
        let documentHeight = $(window).height();
        $(".chartsDiv").height(documentHeight - headerRowHeight - 40);
        let cardHeaderHeight = $(".layui-card-header").height();
        $(".layui-card-body").height(
            (documentHeight - headerRowHeight - 140 - cardHeaderHeight) / 2
        );
    }

    // resize();
    // $(window).resize(() => {
    //     resize();
    // });
    var part_one = echarts.init(document.getElementById('one'));
    var part_two = echarts.init(document.getElementById('two'));
    var part_three = echarts.init(document.getElementById('three'));

    charts_one = {
        backgroundColor: '#2c343c',
        title: {
            text: '房源数量区域占比',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        visualMap: {
            show: false,
            min: 600,
            max: 6000,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: '所在区域',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                    {value: 3280, name: '迎泽区'},
                    {value: 2810, name: '小店区'},
                    {value: 2053, name: '晋源区'},
                    {value: 3000, name: '杏花岭区'},
                    {value: 1446, name: '尖草坪区'},
                    {value: 2590, name: '万柏林区'}
                ].sort(function (a, b) {
                    return a.value - b.value;
                }),
                roseType: 'radius',
                label: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };

    charts_two = {
        title: {
            text: '各区域房价平均价格以及最高价格',
            subtext: '数据来自爬虫'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['平均价格', '最高价格']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['迎泽区', '小店区', '晋源区', '杏花岭区', '尖草坪区', '万柏林区']
        },
        series: [
            {
                name: '平均价格',
                type: 'bar',
                data: [12920, 13645, 12347, 11366, 9723, 11641]
            },
            {
                name: '最高价格',
                type: 'bar',
                data: [43028, 47170, 26006, 35714, 18898, 55024]
            }
        ]
    };

    setTimeout(function () {
        option = {
            legend: {},
            tooltip: {
                trigger: 'axis',
                showContent: false
            },
            dataset: {
                source: [
                    ['product', '0~50', '50~70', '70~90', '90~110', '110~130', '130~150'],
                    ['迎泽区', 204, 828, 738, 516, 252, 190],
                    ['小店区', 84, 476, 552, 658, 385, 379],
                    ['晋源区', 44, 200, 273, 266, 52, 92],
                    ['杏花岭区', 166, 691, 710, 502, 298, 288],
                    ['尖草坪区', 16, 168, 223, 238, 117, 111],
                    ['万柏林区', 150, 744, 701, 513, 295, 299],
                ]
            },
            xAxis: {type: 'category', name: '面积/平方米'},
            yAxis: {gridIndex: 0, name: '数量'},
            grid: {top: '55%'},
            series: [
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {
                    type: 'pie',
                    id: 'pie',
                    radius: '30%',
                    center: ['50%', '25%'],
                    label: {
                        formatter: '{b}: {@2012} ({d}%)'
                    },
                    encode: {
                        itemName: 'product',
                        value: '2012',
                        tooltip: '2012'
                    }
                }
            ]
        };
        part_three.on('updateAxisPointer', function (event) {
            var xAxisInfo = event.axesInfo[0];
            if (xAxisInfo) {
                var dimension = xAxisInfo.value + 1;
                part_three.setOption({
                    series: {
                        id: 'pie',
                        label: {
                            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                        },
                        encode: {
                            value: dimension,
                            tooltip: dimension
                        }
                    }
                });
            }
        });
        part_three.setOption(option);
    });

    part_one.setOption(charts_one);
    part_two.setOption(charts_two);
});
