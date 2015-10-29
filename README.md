# AnimateTo
Create animation for Css3 2D-transforms.
Available transforms includes: rotate / translate / scale
   
>**Margin**  is used to handle offset in CSS2. BE CALEFUL to change them after applying transform in this case.

![preview](https://raw.githubusercontent.com/Rendxx/AnimateTo/master/preview.png "Preview")
 
*Download: [AnimateTo v0.2.3](https://github.com/Rendxx/AnimateTo/releases/tag/0.2.3 "Download")*

## Install
Download the package from bower
```
bower install animateTo--save
```

Including the file in your webpage
```HTML
<script type="text/javascript" src="/node_modules/animateTo/js/AnimateTo.js"></script>
```

## API
[API Document](https://github.com/Rendxx/AnimateTo/blob/master/API%20Document.md)

## Dependency
- [jQuery][]

## Code Sample
JavaScript:
```javascript
$("#sample").animateTo({ rotate: "-=90" }, 1000, 'easeInOutQuart', null); 
$("#sample").animateTo({ scaleX: "+=0.2", scaleY: "+=0.2" }, 500);
$("#sample").animateTo({
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
```

## Compatibility
```Chrome``` ```Fire Fox``` ```Safari``` ```Edge``` ```IE 9-11``` ```IE 7,8```

## License
Copyright &copy; 2015, Rendxx. (MIT License)  
See [LICENSE][] for more info.

[jQuery]: https://jquery.com/ "jQuery Home Page"
[LICENSE]: https://github.com/Rendxx/AnimateTo/blob/master/LICENSE