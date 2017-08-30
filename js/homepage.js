/**
 *
 * Created by Administrator on 2017/8/27 0027.
 */

//展示区部分
(function () {
    var oUl = document.getElementById("show").children[0],
        aLi = oUl.children,
        length = 5*5*5;
//初始化
    (function () {
        for(var i = 0;i<length;i++){
            var oLi = document.createElement("li"),
                startTranslateX = Math.random()*6000-3000,
                startTranslateY = Math.random()*6000-3000,
                startTranslateZ = Math.random()*6000-3000;
            var d = flyData[i] || flyData[0];
            oLi.innerHTML = "<b class='liCover'></b>" +
                "<p class='liTitle'>"+d.type+"</p>" +
                "<p class='liAuthor'>"+d.author+"</p>" +
                "<p class='liTime'>"+d.time+"</p>";
            oLi.index = i;
            oUl.appendChild(oLi);
            oLi.x = i % 5 ;
            oLi.y = Math.floor(i%25/5);
            oLi.z = Math.floor(i/25);
            oLi.style.transform = "translate3d("+startTranslateX+"px,"+startTranslateY+"px,"+startTranslateZ+"px)";
        }
        setTimeout(Table,500);
    })();
//Grid布局
    function Grid() {
        var distanceX = 200,
            distanceY = 250,
            distanceZ = 800;
        for(var i = 0;i<length;i++){
        //计算当前li与中心的距离
            var x = (aLi[i].x - 2) * distanceX,
                y = (aLi[i].y - 2) * distanceY,
                z = (aLi[i].z - 2) * distanceZ;
            aLi[i].style.transform = "translate3d("+x+"px,"+y+"px,"+z+"px)";
        }
    }
//Helix布局
    function Helix() {
        var ceng = 4,   //层数
            num = Math.floor(length / ceng),
            midLi = Math.floor(length / 2),
            changeTranslateY = 7;   //垂直变化量
        for(var i = 0;i < length;i++){
            aLi[i].style.transform = "rotateY("+ i*(360/num) + "deg) translateY(" + (i-midLi)*changeTranslateY + "px) translateZ(800px)";
        }
    }
//Table布局
    function Table() {
        var indexCeng = length / 18 + 2 ,   //把前三行看成一行，所以要加2
            midX = 18 / 2 - 0.5,
            midY = indexCeng / 2 - 0.5,
            distanceX = 170,
            distanceY = 210,
            arr = [
                {x:0,y:0},
                {x:17,y:0},
                {x:0,y:1},
                {x:1,y:1},
                {x:12,y:1},
                {x:13,y:1},
                {x:14,y:1},
                {x:15,y:1},
                {x:16,y:1},
                {x:17,y:1},
                {x:0,y:2},
                {x:1,y:2},
                {x:12,y:2},
                {x:13,y:2},
                {x:14,y:2},
                {x:15,y:2},
                {x:16,y:2},
                {x:17,y:2}
            ];
        var x,y;
        for(var i=0;i<length;i++){
            if (i<18){
                x = arr[i].x;
                y = arr[i].y;
            }else {
                x = i % 18;
                y = Math.floor(i / 18) + 2;
            }
            aLi[i].style.transform = "translate3d("+ (x-midX)*distanceX +"px,"+ (y-midY)*distanceY +"px,0px)"
        }
    }
//Sphere布局
    function Sphere() {
        var arr = [1,3,7,9,11,14,21,16,12,10,9,7,4,1],

            xDeg = 180 / (arr.length - 1);
    //求出li是第几层第几个
        for(var i = 0; i<length;i++){
            var arrNum = 0,
                indexCeng = 0,
                indexGe = 0;
            for(var j=0;j<arr.length;j++){
                arrNum += arr[j];
                if (arrNum > i){
                    indexCeng = j;
                    indexGe = arr[j] - (arrNum - i);
                    console.log(indexCeng);
                    break;
                }
            }
            var yDeg = 360 / arr[indexCeng];
            aLi[i].style.transform = "rotateY("+ (indexGe+1.3) * yDeg +"deg) rotateX("+ (90 - indexCeng*xDeg) +"deg) translateZ(800px)";
        }
    }
//拖拽和滚轮事件
    (function () {
        var startTranslateZ = -2000,
            startRotateX = 0,
            startRotateY = 0,
            timerMouse = null;

    //不能被选中和图片不能被拖拽
        document.onselectstart = function () {
            return false;
        };
        document.ondrag = function () {
            return false;
        };
    //鼠标拖动事件
        document.onmousedown = function (e) {
            var startX = e.clientX,
                startY = e.clientY,
                endRotateX = startRotateX,
                endRotateY = startRotateY,
                lastMoveX = startX,
                lastMoveY = startY,
                changeMoveX = 0,
                changeMoveY = 0;
            cancelAnimationFrame(timerMouse);
            this.onmousemove = function (e) {
                var changeX = e.clientX - startX,
                    changeY = e.clientY - startY;
                endRotateX = startRotateX - changeY*0.15;
                endRotateY = startRotateY + changeX*0.15;
                //惯性两点之间的距离
                changeMoveX = e.clientX - lastMoveX;
                changeMoveY = e.clientY - lastMoveY;
                lastMoveX = e.clientX;
                lastMoveY = e.clientY;
                oUl.style.transform = "translateZ("+startTranslateZ+"px) rotateX("+endRotateX+"deg) rotateY("+endRotateY+"deg)"
            };
            this.onmouseup = function () {
                function guanxing() {
                    changeMoveX *= 0.9;
                    changeMoveY *= 0.9;
                    endRotateX -= changeMoveY * 0.15;
                    endRotateY += changeMoveX * 0.15;
                    oUl.style.transform = "translateZ("+startTranslateZ+"px) rotateX("+endRotateX+"deg) rotateY("+endRotateY+"deg)";
                    if(Math.abs(changeMoveX)<0.1&&Math.abs(changeMoveY)<0.1)return;
                    timerMouse = requestAnimationFrame(guanxing);
                    startRotateX = endRotateX;
                    startRotateY = endRotateY;
                }
                timerMouse = requestAnimationFrame(guanxing);

                document.onmousemove = null;
            };
        };
    //鼠标滚轮事件
        !function (fn) {
            if (document.onmousewheel === undefined){
                document.addEventListener("DOMMouseScroll",function (e) {
                    var d = -e.detail / 3;
                    fn.call(this,d);
                },false);
            }else{
                document.onmousewheel = function (e) {
                    var d = e.wheelDelta / 120;
                    fn.call(this,d);
                }
            }
        }(function (d) {
            startTranslateZ += d*200;
            oUl.style.transform = "translateZ("+startTranslateZ+"px) rotateX("+startRotateX+"deg) rotateY("+startRotateY+"deg)"
        });
    })();
//左下角button的点击事件
    (function () {
        var aLi = document.getElementById("button").getElementsByTagName("li"),
            arr = [Table,Sphere,Helix,Grid];
        for(var i = 0; i<aLi.length; i++){
            (function (i) {
                aLi[i].onclick = arr[i];
            })(i);
        }
    })();
//弹窗事件
    (function () {
        var oAlert = document.getElementById("alert"),
            oATitle = oAlert.getElementsByClassName("title")[0].getElementsByTagName("span")[0],
            oAImg = oAlert.getElementsByClassName("img")[0].getElementsByTagName("img")[0],
            oAAuthor = oAlert.getElementsByClassName("author")[0].getElementsByTagName("span")[0],
            oAInfo = oAlert.getElementsByClassName("info")[0].getElementsByTagName("span")[0],
            oBack = document.getElementById("back"),
            oBox = document.getElementById("box");
        oUl.onclick = function (e) {
            var target = e.target;
            if (/b/i.test(target.nodeName)){
                var index = target.parentNode.index,
                    d = flyData[index]||flyData[0];
                oAlert.index = index;
                oATitle.innerHTML = "课题：" + d.title;
                oAImg.src = "../works/" + d.src + "/index.png";
                oAAuthor.innerHTML = "作者：" + d.author;
                oAInfo.innerHTML = "描述：" + d.dec;
                show();
            }
            e.cancelBubble = true;
        };
        oAlert.onclick = function (e) {
            var d = flyData[this.index] || flyData[0],
                oFrame = document.getElementById("frame");
            oFrame.src = "../works/" + d.src + "/index.html";
            oBox.className = "left";
            e.cancelBubble = true;
        };
        document.onclick = function () {
            hide();
        };
        oBack.onclick = function () {
            oAlert.style.display = "none";
            oBox.className = "";
        };
    // 弹出层显示
        function show() {
            if (!oAlert.timer){
                oAlert.timer = true;
                oAlert.style.display = "block";
                oAlert.style.transform = "rotateY(0deg) scale(2)";
                var startTime = new Date(),
                    time = 800;
                function move() {
                    var prop = (new Date() - startTime) / time;
                    if (prop >= 1){
                        prop = 1;
                        oAlert.timer = false;
                    }else {
                        oAlert.timer = requestAnimationFrame(move);
                    }
                    oAlert.style.transform = "rotateY(0deg) scale("+ ((1 - 2)*prop+2) +")";
                }
                oAlert.timer = requestAnimationFrame(move);
            }
        }
    // 弹出层隐藏
        function hide() {
            if (!oAlert.timer && oAlert.style.display === "block"){
                oAlert.timer = true;
                oAlert.style.display = "block";
                oAlert.style.transform = "rotateY(0deg) scale(1)";
                var startTime = new Date(),
                    time = 500;
                function move() {
                    var prop = (new Date() - startTime) / time;
                    if (prop >= 1){
                        prop = 1;
                        oAlert.timer = false;
                        oAlert.style.display = "none";
                    }else {
                        requestAnimationFrame(move);
                    }
                    oAlert.style.transform = "rotateY("+ 180*prop +"deg) scale("+ ((0-1)*prop+1) +")";
                }
                requestAnimationFrame(move);
            }

        }
    })();



})();
