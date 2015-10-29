/************************************************ 
Animate To
Copyright (c) 2014-2015 Dongxu Ren  http://www.rendxx.com/

License: MIT (http://www.opensource.org/licenses/mit-license.php)
Version: 0.2.2
Update: 2015-09-21

Description:
    Create animation for Css3 2D-transforms.
    Available transforms includes: rotate / translate / scale

    This also works in IE 7/8, but some CSS attributes are used to handle the offset. Please read the document for Transform 2D for detail.
   
Compatibility:
    Chrome; Fire Fox; Safari; Edge; IE 9-11; IE 7,8;
 
Dependency:
    jQuery
    Transform2D
    
API-Base:
    $(ele).animateTo(opts)
        - opts: {transform, duration, easing, onStep, onComplete }
            - transform: transformation accept 2 kinds of value: number or "+=" / "-=" number
            if a number is given, element will transform to it.
            if a string start with "+=" or "-=" is given, the element will increase/decrease its transform value, which means multiple transformation can be applied in same time.
            {
                rotate: (number)
                scaleX: (number)
                scaleY: (number)
                translateX: (number)
                translateY: (number)
            }
            - duration: duration of the animation (ms)
            - easing: name of easing function
            - onStep: callback function fired on every step
            - onComplete: callback function when animation complete

    $(ele).animateTo(transform, duration)
    
    $(ele).animateTo(transform, duration, onComplete)
    
    $(ele).animateTo(transform, duration, easing, onComplete)

************************************************/


(function ($) {
    "use strict";
    var _keyName = "rAnimateTo";
    var _intervalTime = 40;

    var _code = 0;
    var getCode = function () {
        _code = (_code + 1) % 1000;
        return _code;
    };

    var nextStep = function (code, ele, transformQueue, step, onStep, onComplete) {
        var codeList = ele.data(_keyName);
        if (codeList == null) return; // being stoped 
        if (!codeList.hasOwnProperty(code)) {
            if (codeList.hasOwnProperty("end")) {
                delete codeList["end"];
                ele.data(_keyName, codeList);
                if (onComplete != null) onComplete();
            }
        }
        if (step < transformQueue.length) {
            ele.transform2D(transformQueue[step]);
            if (onStep != null) onStep(transformQueue[step]);
            setTimeout(function () { nextStep(code, ele, transformQueue, step + 1, onStep, onComplete); }, _intervalTime);
        } else {
            delete codeList[code];
            ele.data(_keyName, codeList);
            if (onComplete != null) onComplete();
        }
    };
    
    // return a list of tranform data for every step 
    var createAnimationQueue = function (ele, transform, easing, stepNum) {
        var modify = {};
        var current = ele.transform2D();
        for (var i in transform) {
            if (transform.hasOwnProperty(i)){
                if (transform[i][0]) modify[i] = transform[i][1] - current[i];
                else modify[i] = transform[i][1];
            }
        }

        // easing
        var _easingFunc = easingFunc["linear"];
        if (easingFunc.hasOwnProperty(easing)) _easingFunc = easingFunc[easing];

        // transform
        var tmp = {};
        var dataQueue = [];
        var i = 0;
        for (; i < stepNum-1; i++) {
            dataQueue[i] = {};
            for (var key in modify) {
                if (transform[key][0])
                    dataQueue[i][key] = current[key] + (modify[key] * _easingFunc(i / stepNum));
                else {
                    var t = modify[key] * _easingFunc(i / stepNum);
                    dataQueue[i][key] = "+="+(t - tmp[key]);
                    tmp[key] = t;
                }
            }
        }
        
        dataQueue[i] = {};
        for (var key in transform) {
            if (transform[key][0])
                dataQueue[i][key] = current[key] + modify[key];
            else {
                var t = modify[key] * _easingFunc(i / stepNum);
                dataQueue[i][key] = "+=" + (t - tmp[key]);
            }
        }

        return dataQueue;
    };

    $.fn.animateStop = function (jumpToEnd) {
        this.each(function () {
            if (jumpToEnd === true) $(this).data(_keyName, { end: true });
            else {
                $(this).removeData(_keyName);
            }
        });
        return this;
    };


    // parse the option to processed 
    // processed data: [mark, value]
    // mark: true: equal to,  false:add
    var _parseOpts = function (options) {
        // get opts based on current transform data
        var input;
        var tmp;
        var operationIdx = -1;
        var opts = {};

        for (var i in options) {
            if (options.hasOwnProperty(i) && options[i] != null) {
                input = options[i];
                if (typeof input == "string") {
                    operationIdx = input.indexOf("+=");
                    if (operationIdx != -1) {
                        input = parseFloat(input.substring(operationIdx + 2));
                        if (input == input) opts[i] = [false,input];
                        continue;
                    }

                    operationIdx = input.indexOf("-=");
                    if (operationIdx != -1) {
                        input = -parseFloat(input.substring(operationIdx + 2));
                        if (input == input) opts[i] = [false, input];
                        continue;
                    }

                    input = parseFloat(input);
                    if (input == input) opts[i] = [true, input];
                } else if (typeof input == "number")  {
                    opts[i] = [true, input];
                }
            }
        }

        return opts;
    };

    $.fn.animateTo = function () {
        // handle arguements
        if (arguments == null || arguments.length == 0) return;
        var options = $.extend(true, {}, $.fn.animateTo.defaults);
        if (arguments.length == 1) {   // [opts]
            $.extend(true, options, arguments[0]);
        } else if (arguments.length == 2) { // [transform, duration]
            $.extend(true, options.transform, arguments[0]);
            if (arguments[1] != null) options.duration = arguments[1];
        } else if (arguments.length == 3) { // [transform, duration, onComplete]
            $.extend(true, options.transform, arguments[0]);
            if (arguments[1] != null) options.duration = arguments[1];
            options.onComplete = arguments[2];
        } else if (arguments.length == 4) { // [transform, duration, easing, onComplete]
            $.extend(true, options.transform, arguments[0]);
            if (arguments[1] != null) options.duration = arguments[1];
            options.easing = arguments[2];
            options.onComplete = arguments[3];
        }

        if (options.duration === 0) return;
        var code = getCode();
        var stepNum = Math.round(options.duration / _intervalTime);
        var transform = _parseOpts(options.transform);
        this.each(function () {
            var $this = $(this);
            var transformQueue = createAnimationQueue($this, transform, options.easing, stepNum);

            var codeList = $this.data(_keyName) || {};
            codeList[code] = true;
            $this.data(_keyName, codeList);
            nextStep(code, $this, transformQueue, 0, options.onStep, options.onComplete);
        });
        return this;
    };
    $.fn.animateTo.defaults = {
        transform: {},
        duration: 200,
        easing: "linear",
        onStep: null,
        onComplete: null
    };

    // Easing function
    // Inspired from https://gist.github.com/gre/1650294
    // t value for the range [0, 1]
    var easingFunc = {
        // no easing, no acceleration
        linear: function (t) { return t },
        // accelerating from zero velocity
        easeInQuad: function (t) { return t * t },
        // decelerating to zero velocity
        easeOutQuad: function (t) { return t * (2 - t) },
        // acceleration until halfway, then deceleration
        easeInOutQuad: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
        // accelerating from zero velocity 
        easeInCubic: function (t) { return t * t * t },
        // decelerating to zero velocity 
        easeOutCubic: function (t) { return (--t) * t * t + 1 },
        // acceleration until halfway, then deceleration 
        easeInOutCubic: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
        // accelerating from zero velocity 
        easeInQuart: function (t) { return t * t * t * t },
        // decelerating to zero velocity 
        easeOutQuart: function (t) { return 1 - (--t) * t * t * t },
        // acceleration until halfway, then deceleration
        easeInOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
        // accelerating from zero velocity
        easeInQuint: function (t) { return t * t * t * t * t },
        // decelerating to zero velocity
        easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t },
        // acceleration until halfway, then deceleration 
        easeInOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t }
    };
})(jQuery);
//# sourceMappingURL=AnimateTo.js.map
