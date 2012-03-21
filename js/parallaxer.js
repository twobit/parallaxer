(function(window) {
    function Parallaxer(stage, options) {
        var opts = options || {};

        this._stage = stage;
        this._range = {
            x: opts.xRange || Parallaxer.X_RANGE,
            y: opts.yRange || Parallaxer.Y_RANGE
        };
        this._inversion = opts.invert ? -1 : 1;
        this._transitioning = false;
        this._lastCursor = null;

        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', this._onDeviceMotion.bind(this), true);
        }
        else {
            window.addEventListener('mousemove', this._onMouseMove.bind(this), true);
        }
    }

    Parallaxer.X_RANGE = 50; // Max distance in x direction
    Parallaxer.Y_RANGE = 100; // Max distance in y direction
    Parallaxer.SENSITIVITY = 0.01;
    Parallaxer.TRANSITION = 'all .01s linear';
    Parallaxer.TRANSITION_DIST_SQ = 200 * 200; // Minimum distance before applying a transition effect

    Parallaxer.prototype = {
        _onDeviceMotion: function(e) {
            var accel = e.accelerationIncludingGravity;
                ax = accel.y / 10; // Normalize acceleration
                ay = accel.x / 10;

            var x = this._inversion * ax * this._range.x,
                y = this._inversion * ay * this._range.y;

            this._stage.style.WebkitTransform = 'translate3d(' + x + 'px,' + y + 'px, 0)';
        },

        _transition: function() {
            this._transitioning = true;
            this._stage.style.WebkitTransition = Parallaxer.TRANSITION;
            window.addEventListener('webkitTransitionEnd', this._onEndTransition.bind(this), true);
        },

        _onEndTransition: function() {
            this._stage.style.WebkitTransition = '';
            this._transitioning = false;
        },

        _onMouseMove: function(e) {
            if (!this._lastCursor) { // Transition to initial mouse coordinates
                this._transition();
            }
            else if (!this._transitioning) {
                var dx = e.clientX - this._lastCursor.x,
                    dy = e.clientY - this._lastCursor.y;
                
                // Transition if distance between mouse events is large
                if (dx * dx + dy * dy > Parallaxer.TRANSITION_DIST_SQ) {
                    this._transition();
                }
            }

            var x = this._inversion * (2 * e.clientX / window.innerWidth - 1.0) * this._range.x,
                y = this._inversion * (2 * e.clientY / window.innerHeight - 1.0) * this._range.y;

            this._stage.style.WebkitTransform = 'translate3d(' + x + 'px,' + y + 'px, 0)';
            this._lastCursor = {x: e.clientX, y: e.clientY};
        }
    };

    // Taken from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
    // ES-5 15.3.4.5
    // http://es5.github.com/#x15.3.4.5
    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {
        
        var target = this;
        
        if (typeof target != "function") {
            throw new TypeError();
        }
        
        var args = Array.prototype.slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {
              
              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(Array.prototype.slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {
              
              return target.apply(
                  that,
                  args.concat(Array.prototype.slice.call(arguments))
              );

            }

        };
        
        return bound;
      };
    }

    window.Parallaxer = Parallaxer;
})(window);
