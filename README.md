# Parallaxer

## CSS3 Parallax

Takes advantage of CSS3 3D transforms to create a real parallax effect. Responds to mouse movement. Device motion will be supported soon.

## Quick Example

Setup the viewport, stage, and layers:

```html
<div id="viewport" class="viewport">
    <div id="stage" class="stage">
        <div class="red layer"></div>
        <div class="green layer"></div>
        <div class="blue layer"></div>
    </div>
</div>
```

Add styling:

```css
/* Required Parallaxer Styles */
.viewport {position: relative; overflow: hidden;}
.stage {position: absolute; top: 0; left: 0; right: 0; bottom: 0; transform-style: preserve-3d; -webkit-transform-style: preserve-3d; -moz-transform-style: preserve-3d;}
.stage .layer {position: absolute; top: 0; left: 50%; background-repeat: no-repeat; background-position: top left; transform-style: preserve-3d; -webkit-transform-style: preserve-3d; -moz-transform-style: preserve-3d;}

/* Demo Styles */
#viewport {position: absolute; top: 0; left: 0; right: 0; bottom: 0; perspective: 100px; -webkit-perspective: 100px; -moz-perspective: 100px;}
#stage .layer {margin-left: -1000px; width: 2000px; height: 2000px;}

.red {background-image: url(img/red.png); transform: scale(4) translate3d(0, 0, -300px); -webkit-transform: scale(4) translate3d(0, 0, -300px); -moz-transform: scale(4) translate3d(0, 0, -300px);}
.green {background-image: url(img/green.png); transform: scale(3) translate3d(0, 0, -200px); -webkit-transform: scale(3) translate3d(0, 0, -200px); -moz-transform: scale(3) translate3d(0, 0, -200px);}
.blue {background-image: url(img/blue.png); transform: scale(2) translate3d(0, 0, -100px); -webkit-transform: scale(2) translate3d(0, 0, -100px); -moz-transform: scale(2) translate3d(0, 0, -100px);}
```

Include parallaxer.js and init:

```javascript
new Parallaxer(document.getElementById('stage'), {invert: true});
```

See demo for working example.

## Documentation

<a name="Parallaxer" />
### Parallaxer()

 * Parallaxer(stage [, options])

 Creates a new parallax effect on the stage node. Listens for mousemove or devicemotion to pan stage.

__Arguments__

 * stage - DOM node containing parallax layers.
 * options.xRange - Maximum distance to scroll in x direction
 * options.yRange - Maximum distance to scroll in y direction
 * options.invert - Invert the direction of travel in both directions

__Example__

```javascript
new Parallaxer(document.getElementById('stage'), {xRange: 400, yRange: 400});
```

## Browser Support

Requires CSS3 transform support. [When can I use CSS3 transforms?](http://caniuse.com/transforms3d)

Tested in WebKit and Firefox.