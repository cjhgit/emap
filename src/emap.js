/**
 * eMap -- SVG MAP
 * @version v1.0.0
 * @author  陈建杭
 * @date    2016-3-21
 *
 * (c) 2016 陈建杭, http://www.chenjianhang.com/
 * 采用 MIT 协议
 */
;(function ($) {

    $.fn.emap = function (options) {
        var opts = $.extend({}, $.fn.emap.defaults, options);

        return this.each(function () {
            $this = $(this);

            var R = Raphael($this.attr('id'), opts.width, opts.height);
            //R.rotate(1.5);
            R.canvas.setAttribute("viewBox", "0 0 565 475"); // TODO
            var attr = {
                "fill": "#97d6f5",
                "stroke": "#eee",
                "stroke-width": 1,
                "stroke-linejoin": "round",
                "cursor": "cursor"
            };

            var map = {};

            for (var item in chinaMap) {
                map[item] = {};
                map[item].id = chinaMap[item].id;
                map[item].name = chinaMap[item].name;
                map[item].color = chinaMap[item].color;
                map[item].path = chinaMap[item].path;
                map[item].capital = chinaMap[item].capital;

                var province = map[item];
           
                if (opts.colorful === true) {
                    province.color = province.color;
                    //alert(11);
                } else {
                    // TODO
                    if (opts.data != null && opts.data[item] && opts.data[item].color) {
                        province.color = opts.data[item].color;
                        //province.color = opts.data[item].color;
                    } else {
                        province.color = opts.defaultColor;
                    }
                }

                attr.fill = province.color;

                var path = R.path(province.path).attr(attr);


                //R.changeSize(opts.width, opts.height, !1, !1);

                (function(province, path){
                    path[0].onmouseover = function () {
                        path.animate({fill: opts.hoverColor, stroke: "#eee"}, 500);
                        //province.text.toFront(); // TODO
                        R.safari();

                        if (opts.hoverOver) {
                            opts.hoverOver(province);
                        }
                    };
                    path[0].onmouseout = function () {
                        if (opts.selectable && province.selected === true) {

                        } else {
                            path.animate({fill: province.color, stroke: "#eee"}, 500);
                            //province.text.toFront();
                            R.safari();
                        }

                        if (opts.hoverOut) {
                            opts.hoverOut(province);
                        }
                        
                    };

                
                    path.click(function() {

                        if (opts.click) {
                            opts.click(province);
                        //alert(opts.test);
                        }

                        if (opts.selectable) {
                            if (province.selected === true) {
                                province.selected = false;

                            } else {
                                province.selected = true;
                                path.animate({fill: opts.selectedColor, stroke: "#eee"}, 500);
                            }
                        }
                        
                    });
                   
                    
                })(province, path);

                if (opts.showName) {
                    var textAttr = {
                        "fill": "#000",
                        "font-size": "12px",
                        "cursor": "pointer"
                    };
                    //获取当前图形的中心坐标
                    var xx = path.getBBox().x + (path.getBBox().width / 2);
                    var yy = path.getBBox().y + (path.getBBox().height / 2);
                    //***修改部分地图文字偏移坐标
                    switch (province.name) {
                        case "江苏":
                            xx += 5;
                            yy -= 10;
                            break;
                        case "河北":
                            xx -= 10;
                            yy += 20;
                            break;
                        case "天津":
                            xx += 10;
                            yy += 10;
                            break;
                        case "上海":
                            xx += 10;
                            break;
                        case "广东":
                            yy -= 10;
                            break;
                        case "澳门":
                            yy += 10;
                            break;
                        case "香港":
                            xx += 20;
                            yy += 5;
                            break;
                        case "甘肃":
                            xx -= 40;
                            yy -= 30;
                            break;
                        case "陕西":
                            xx += 5;
                            yy += 10;
                            break;
                        case "内蒙古":
                            xx -= 15;
                            yy += 65;
                            break;
                        default:
                    }
                    province.text = R.text(xx, yy, province.name).attr(textAttr);
                    province.text.toFront();


                }


            }

            for (var item in chinaMap) {
                var province = map[item];

                if (opts.showCapital === true) {
                    var textAttr = {
                        "fill": "#000",
                        "font-size": "12px",
                        "cursor": "pointer"
                    };

                    if (province.capital != null) {
                        console.log(province.capital.name);
                        //获取当前图形的中心坐标
                        var xx = province.capital.x;
                        var yy = province.capital.y;
                        //***修改部分地图文字偏移坐标
                        var text = R.text(xx, yy, province.capital.name).attr(textAttr);
                        text.toFront();

                        R.circle(xx, yy, 1).toFront();;
                    }

                }
            }
        });
    };

    // 放在前面不可以
    $.fn.emap.defaults = {
        width: 600, // 宽度
        height: 500, // 高度
        showName: false, // 是否显示省份名称
        colorful: false, // 是否全彩地图
        data: {}, // 用户自定义数据
        defaultColor: '#97d6f5', // 默认颜色
        hoverColor: '#ffb41d', // 鼠标指向时的颜色,
        //click:
        //hoverOver
        //hoverOut
        selectable: false, // 是否可选择的
        selectedColor: '#ffb41d',
        showCapital: false
    };

    $.fn.emap.version = '1.0';
})(jQuery);