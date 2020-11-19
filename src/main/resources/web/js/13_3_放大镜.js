//用jQuery实现,以下是实现的代码
$(function(){
    let $magnifier = $('.magnifier'),
        $abbre =$magnifier.find('.abbre'),
        $mark = $abbre.find('.mark'),
        $detail = $magnifier.find('.detail'),
        $detailIMG = $detail.find('img')
    // 动态计算大图的大小
    let abbreW = $abbre.width(),
        abbreH = $abbre.height(),
        abbreOffset = $abbre.offset(),
        markW = $mark.width(),
        markH = $mark.height(),
        detailW =$detail.width(),
        detailH = $detail.height(),
        detailImgH = 0,
        detailImgW = 0;

    detailImgW=detailW*abbreW/markW
    detailImgH=detailH*abbreH/markH
    $detailIMG.css({
        width:detailImgW,
        height:detailImgH
    })
    console.log(detailImgW,detailImgH)

    // 计算 mark/大图 移动的位置
    const computed = function computed(ev) {
        let curL = ev.pageX-abbreOffset.left-markW/2,
            curT = ev.pageY-abbreOffset.top-markH/2

        // 边界处理
        let minL = 0,
            minT = 0,
            maxL = abbreW-markW,
            maxT = abbreH - markH

        curL = curL<minL?minL:(curL>maxL?maxL:curL)
        curT = curT<minT?minT:(curT>maxT?maxT:curT)

        $mark.css({
            left:curL,
            top:curT
        })

        // 大图移动的方向和mark 相反， 移动成比例
        $detailIMG.css({
            left:-curL/abbreW*detailImgW,
            top:-curT/abbreH*detailImgH
        })
    }
    $abbre.on('mouseenter',function(ev){
        $mark.css('display','block')
        $detail.css('display','block')
        computed(ev)
    }).on('mousemove',function(ev){
        computed(ev)
    }).on('mouseleave',function(ev){
        $mark.css('display','none')
        $detail.css('display','none')
    })
});