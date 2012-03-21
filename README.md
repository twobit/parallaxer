# Parallaxer

## CSS3 Parallax

Takes advantage of CSS3 3D transforms to create a real parallax effect. Responds to mouse movement or device motion.

## Quick Examples

```html
<div id="viewport1" class="viewport">
    <div id="stage1" class="stage">
        <div id="stars" class="layer"></div>
        <div id="gas" class="layer"></div>
        <div id="planets" class="layer"></div>
    </div>
</div>
```

```css
.viewport {position: relative; overflow: hidden;}
.stage {position: absolute; top: 0; left: 0; right: 0; bottom: 0; -webkit-transform-style: preserve-3d;}
.stage .layer {position: absolute; top: 0; left: 50%; background-repeat: no-repeat; background-position: top left; -webkit-transform-style: preserve-3d;}
```

```javascript
    new Parallaxer(document.getElementById('stage1'), {invert: true});
    new Parallaxer(document.getElementById('stage2'), {xRange: 400, yRange: 400});
```

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
    new Parallaxer(document.getElementById('stage1'), {invert: true});
    new Parallaxer(document.getElementById('stage2'), {xRange: 400, yRange: 400});
```

## Browser Support

Requires CSS3 transform support. [When can I use CSS3 transforms?](http://caniuse.com/transforms3d) 