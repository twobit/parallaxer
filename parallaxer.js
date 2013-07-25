(function(window) {
    function Parallaxer(stage, options) {
        var opts = options || {};

        this._stage = stage;
        this._range = {
            x: opts.xRange || Parallaxer.X_RANGE,
            y: opts.yRange || Parallaxer.Y_RANGE
        };
        this._inversion = opts.invert ? -1 : 1;
        this._smoothing = opts.smoothing || false;
        this._transitioning = false;
        this._lastCursor = null;

        var self = this;

        /*
        TODO: Improve device motion support
        if (window.DeviceMotionEvent) {
            this._ax = this._ay = 0.0;
            setInterval(this._onDeviceMotionRender.bind(this));
            window.addEventListener('devicemotion', function(e) {self._onDeviceMotion(e);}, true);
        }
        else {
        }*/
        window.addEventListener('mousemove', function(e) {self._onMouseMove(e);}, true);
    }

    Parallaxer.X_RANGE = 50; // Max distance in x direction
    Parallaxer.Y_RANGE = 100; // Max distance in y direction
    Parallaxer.SENSITIVITY = 0.01;
    Parallaxer.TRANSITION = 'all .01s linear';
    Parallaxer.TRANSITION_DIST_SQ = 200 * 200; // Minimum distance before applying a transition effect

    Parallaxer.prototype = {
        _onDeviceMotion: function(e) {
            var accel = e.accelerationIncludingGravity, ax, ay;

            if (window.innerHeight > window.innerWidth) {
                ax = accel.x,
                ay = accel.y;
            }
            else {
                ax = accel.y;
                ay = accel.x;
            }

            // Normalize acceleration
            this._ax = ax / 9.81;
            this._ay = ay / 9.81;
        },

        _onDeviceMotionRender: function() {
            var x = this._inversion * this._ax * this._range.x,
                y = this._inversion * this._ay * this._range.y;

            this._stage.style.transform = 'translate3d(' + x + 'px,' + y + 'px, 0)';
            this._stage.style.WebkitTransform = 'translate3d(' + x + 'px,' + y + 'px, 0)';
            this._stage.style.MozTransform = 'translate3d(' + x + 'px,' + y + 'px, 0)';
        },

        _transition: function() {
            this._transitioning = true;
            this._stage.style.transition = Parallaxer.TRANSITION;
            this._stage.style.WebkitTransition = Parallaxer.TRANSITION;
            this._stage.style.MozTransition = Parallaxer.TRANSITION;
            var self = this;
            window.addEventListener('transitionEnd', function(e) {self._onEndTransition(e);}, true);
            window.addEventListener('webkitTransitionEnd', function(e) {self._onEndTransition(e);}, true);
            window.addEventListener('mozTransitionEnd', function(e) {self._onEndTransition(e);}, true);
        },

        _onEndTransition: function() {
            this._stage.style.transition = '';
            this._stage.style.WebkitTransition = '';
            this._stage.style.MozTransition = '';
            this._transitioning = false;
        },

        _onMouseMove: function(e) {
            if (this._smoothing) {
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
            }

            var x = this._inversion * (2 * e.clientX / window.innerWidth - 1.0) * this._range.x,
                y = this._inversion * (2 * e.clientY / window.innerHeight - 1.0) * this._range.y;

            this._stage.style.transform = 'translate3d(' + x + 'px,' + y + 'px, 0)';
            this._stage.style.WebkitTransform = 'translate3d(' + x + 'px,' + y + 'px, 0)';
            this._stage.style.MozTransform = 'translate3d(' + x + 'px,' + y + 'px, 0)';
            this._lastCursor = {x: e.clientX, y: e.clientY};
        }
    };

    window.Parallaxer = Parallaxer;
})(window);
