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

<div id="nested">
    <div id="nested_viewport" class="viewport">
        <div id="nested_stage" class="stage">
            <div class="red layer"></div>
            <div class="green layer"></div>
            <div class="blue layer"></div>
        </div>
    </div>

    <p>Nested Parallax</p>
</div>
```

Add styling:

```css
/* Required Parallaxer Styles */
.viewport {position: relative; overflow: hidden;}
.stage {position: absolute; top: 0; left: 0; right: 0; bottom: 0; -webkit-transform-style: preserve-3d;}
.stage .layer {position: absolute; top: 0; left: 50%; background-repeat: no-repeat; background-position: top left; -webkit-transform-style: preserve-3d;}

/* Demo Styles */
#viewport {position: absolute; top: 0; left: 0; right: 0; bottom: 0; -webkit-perspective: 100;}
#stage .layer {margin-left: -1000px; width: 2000px; height: 2000px;}

.red {background-image: url(img/red.png); -webkit-transform: scale(4) translate3d(0, 0, -300px);}
.green {background-image: url(img/green.png); -webkit-transform: scale(3) translate3d(0, 0, -200px);}
.blue {background-image: url(img/blue.png); -webkit-transform: scale(2) translate3d(0, 0, -100px);}
```

Include parallaxer.js and init:

```javascript
new Parallaxer(document.getElementById('stage'), {invert: true});
new Parallaxer(document.getElementById('nested_stage'), {xRange: 400, yRange: 400});
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
new Parallaxer(document.getElementById('stage'), {invert: true});
new Parallaxer(document.getElementById('nested_stage'), {xRange: 400, yRange: 400});
```

## Browser Support

Requires CSS3 transform support. [When can I use CSS3 transforms?](http://caniuse.com/transforms3d) 