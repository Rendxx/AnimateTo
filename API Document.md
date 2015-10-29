
# API Document

#### $(jQuery Element).animateTo(transform, duration[[, easing], onComplete])  ```object (jQuery element)```
Create an animation of the jQuery element.
- **transform** ```object```    
  + **rotate** ```number``` ```string```  
  + **scaleX** ```number``` ```string```  
  + **scaleY** ```number``` ```string```  
  + **translateX** ```number``` ```string```  
  + **translateY** ```number``` ```string```  
    Transform data. *Format: [see Note below][note]*

- **duration** ```number```   
  Duration of the animation in ms. 

- **easing** ```string```   
  Name of easing function.  
  Available easing name: 
  + **linear**
  + **easeInQuad**
  + **easeOutQuad**
  + **easeInOutQuad**
  + **easeInCubic**
  + **easeOutCubic**
  + **easeInOutCubic**
  + **easeInQuart**
  + **easeOutQuart**
  + **easeInOutQuart**
  + **easeInQuint**
  + **easeOutQuint**
  + **easeInOutQuint**

- **onComplete** ```function```   
  Callback function. Be called when animation complete.  

<h1></h1>

#### $(jQuery Element).animateTo(opts) ```object (jQuery element)```
Transform the element by given options.
 
- **opts** ```object```  
  + **transform** ```object``  
    *[See above]*
  + **duration** ```number``   
    *[See above]*
  + **easing** ```string``   
    *[See above]*
  + **onComplete** ```function``   
    *[See above]*
  + **onStep** ```function``  
    Callback function. Be called at every animation step.   

<h1></h1>

#### $(jQuery Element).animateStop() ```object (jQuery element)```
Stop all animation applied to the jQuery element, the element will stop at its current status.  
OnComplete callback will not be triggered if you stop the animation.

<h1></h1>
<div><br></div>

## Note
- **Argument Format:**  
2 kinds of format is available for transformation value:  
 1. ```Number```: Set the transformation of the given value.  
 2. ```String```: Start with "+=" or "-=" and following by a number. Adjust the transformation value from current situation by given value.

[note]: #note
