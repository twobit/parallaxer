(function(window) {
    function Parallaxer(stage) {
        this._stage = stage;
        this._transitioning = false;
        this._lastCursor = null;
        this._xRange = 0.1; // Move at most 1/10 window width in x direction
        this._yRange = 0.2; // Move at most 1/5 window height in y direction

        window.addEventListener('devicemotion', this._onDeviceMove.bind(this), true);
        window.addEventListener('mousemove', this._onMouseMove.bind(this), true);
    }

    Parallaxer.TRANSITION = 'all .01s linear';
    Parallaxer.TRANSITION_DIST_SQ = 200 * 200; // Minimum distance before applying a smooth transition effect

    Parallaxer.prototype = {
        _onDeviceMove: function(e) {
            console.log('deviceMove');
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
            var cursor = {x: e.clientX, y: e.clientY};

            if (!this._lastCursor) { // Transition to initial mouse coordinates
                this._transition();
            }
            else if (!this._transitioning) { // Transition if distance between mouse events is large
                var dx = cursor.x - this._lastCursor.x,
                    dy = cursor.y - this._lastCursor.y;
            
                if (dx * dx + dy * dy > Parallaxer.TRANSITION_DIST_SQ) {
                    this._transition();
                }
            }

            var x = -(cursor.x / window.innerWidth - 0.5) * window.innerWidth * this._xRange,
                y = -(cursor.y / window.innerHeight - 0.5) * window.innerHeight * this._yRange;

            this._stage.style.WebkitTransform = 'translate(' + x + 'px,' + y + 'px)';
            this._lastCursor = cursor;
        }
    };

    window.Parallaxer = Parallaxer;
})(window);
