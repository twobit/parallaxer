(function(window) {
    function Parallaxer(stage) {
        this._stage = stage;
        this._transitioning = false;
        this._lastCursor = null;

        window.addEventListener('devicemotion', this._onDeviceMove.bind(this), true);
        window.addEventListener('mousemove', this._onMouseMove.bind(this), true);
    }

    Parallaxer.TRANSITION = 'all .08s linear';
    Parallaxer.TRANSITION_DIST_SQ = 200 * 200; // Minimum distance before applying a smooth transition effect

    Parallaxer.prototype = {
        _onDeviceMove: function(e) {
            console.log('deviceMove');
        },

        _transition: function() {
            console.log('TRANSITION');
            this._transitioning = true;
            this._stage.style.WebkitTransition = Parallaxer.TRANSITION;
            window.addEventListener('webkitTransitionEnd', this._onEndTransition.bind(this), true);
        },

        _onEndTransition: function() {
            this._stage.style.WebkitTransition = '';
            this._transitioning = false;
        },

        _onMouseMove: function(e) {
            var cursor = {x: e.clientX, y: e.clientY},
                win = {width: window.innerWidth, height: window.innerHeight},
                stage = {width: this._stage.offsetWidth, height: this._stage.offsetHeight};

            if (this._lastCursor && !this._transitioning) {
                var dx = cursor.x - this._lastCursor.x,
                    dy = cursor.y - this._lastCursor.y;
            
                if (dx * dx + dy * dy > Parallaxer.TRANSITION_DIST_SQ) {
                    this._transition();
                }
            }
            else {
                this._transition();
            }

            var x = -(cursor.x / win.width - 0.5) * stage.width * 0.1,
                y = -(cursor.y / win.height - 0.5) * stage.height * 0.2;

            this._stage.style.WebkitTransform = 'translate(' + x + 'px,' + y + 'px)';

            this._lastCursor = cursor;
        }
    };

    window.Parallaxer = Parallaxer;
})(window);
