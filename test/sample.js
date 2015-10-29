
$(function () {
    var squ = $(".squ");
    var msg = $(".msg");

    $(".rotate-1").click(function () {
        msg.text("");
        squ.animateTo({
            transform: { rotate: "+=90" },
            duration: 1000,
            easing: 'easeInOutQuart',
            onStep: function (d) {
                msg.text("Rotate: " + d.rotate);
            },
            onComplete: function () {
                msg.text("(completed)");
            }
        });
    });
    $(".rotate-2").click(function () {
        msg.text("rotate");
        squ.animateTo({ rotate: "-=90" }, 1000, 'easeInOutQuart', null);
    });
    $(".scale-1").click(function () {
        msg.text("scale");
        squ.animateTo({ scaleX: "+=0.2", scaleY: "+=0.2" }, 500);
    });
    $(".scale-2").click(function () {
        msg.text("scale");
        squ.animateTo({ scaleX: "-=0.2", scaleY: "-=0.2" }, 500, 'easeOutQuad', null);
    });
    $(".translate-1").click(function () {
        msg.text("translate x");
        squ.animateTo({ transform: { translateX: (squ.translateX() + 10) } });
    });
    $(".translate-2").click(function () {
        msg.text("translate y");
        squ.animateTo({ transform: { translateY: (squ.translateY() + 10) } });
    });
    $(".reset").click(function () {
        msg.text("reseting");
squ.animateTo({
    transform: {
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0
    },
    duration: 700,
    onComplete: function () {
        msg.text("RESET!");
    }
});
    });
    $(".stop").click(function () {
        msg.text("STOP!");
        squ.animateStop();
    });
});