(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Experiment = require('./experiment/experiment');

var App = (function () {

  /**
   * App contructor
   * @return void
   */

  function App() {
    _classCallCheck(this, App);

    this.el = document.querySelector('.app');

    this.DELTA_TIME = 0;
    this.LAST_TIME = Date.now();

    this.experiment = new Experiment(this.el);
    this.experiment.attachToContainer();

    this.addListeners();
  }

  _createClass(App, [{
    key: 'addListeners',

    /**
     * addListeners
     * @return void
     */
    value: function addListeners() {

      window.addEventListener('resize', this.onResize.bind(this));
      TweenMax.ticker.addEventListener('tick', this.update.bind(this));
    }
  }, {
    key: 'update',

    /**
     * update
     * - Triggered on every TweenMax tick
     * @return void
     */
    value: function update() {

      this.DELTA_TIME = Date.now() - this.LAST_TIME;
      this.LAST_TIME = Date.now();

      this.experiment.update(this.DELTA_TIME);
      this.experiment.render();
    }
  }, {
    key: 'onResize',

    /**
     * onResize
     * - Triggered when window is resized
     * @param  {obj} evt
     * @return void
     */
    value: function onResize(evt) {

      var w = window.innerWidth;
      var h = window.innerHeight;
      this.experiment.resize(w, h);
    }
  }]);

  return App;
})();

module.exports = App;

},{"./experiment/experiment":2}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Particle = require('./particle/particle');
var Scene = require('./scene/scene');

var Experiment = (function () {

  /**
   * [Experiment contructor]
   * @return void
   */

  function Experiment(_container) {
    _classCallCheck(this, Experiment);

    this.container = _container;

    var w = window.innerWidth;
    var h = window.innerHeight;
    this.scene = new Scene(w, h);

    this.particle = new Particle();
    this.scene.addChild(this.particle);
  }

  _createClass(Experiment, [{
    key: 'attachToContainer',

    /**
     * [Experiment attachToContainer]
     * - Appends the scene to Experiment's DOM container
     * @return void
     */
    value: function attachToContainer() {

      this.container.appendChild(this.scene.renderer.view);
    }
  }, {
    key: 'update',

    /**
     * [Experiment update]
     * - Updates all children
     * @param  {number} DELTA_TIME
     * @return void
     */
    value: function update(DELTA_TIME) {

      this.particle.update();

      if (this.particle.position.x <= 0 || this.particle.position.x >= this.scene.width) {
        this.particle.vx *= -1;
      }
      if (this.particle.position.y <= 0 || this.particle.position.y >= this.scene.height) {
        this.particle.vy *= -1;
      }
    }
  }, {
    key: 'render',

    /**
     * [Experiment render]
     * - Renders the scene
     * @return void
     */
    value: function render() {

      this.scene.render();
    }
  }, {
    key: 'resize',

    /**
     * [Experiment resize]
     * - Called by the parent when window's resized
     * @param  {number} _width
     * @param  {number} _height
     * @return void
     */
    value: function resize(_width, _height) {

      this.scene.resize(_width, _height);
    }
  }]);

  return Experiment;
})();

module.exports = Experiment;

},{"./particle/particle":3,"./scene/scene":4}],3:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Particle = (function (_PIXI$Graphics) {

  /**
   * [Experiment contructor]
   * - Extends PIXI.Graphics
   * @return void
   */

  function Particle() {
    _classCallCheck(this, Particle);

    _get(Object.getPrototypeOf(Particle.prototype), "constructor", this).call(this);

    this.vx = Math.random();
    this.vy = Math.random();

    this.beginFill(16711680);
    this.drawCircle(0, 0, 20);
    this.endFill();
  }

  _inherits(Particle, _PIXI$Graphics);

  _createClass(Particle, [{
    key: "update",
    value: function update() {

      this.position.x += this.vx;
      this.position.y += this.vy;
    }
  }]);

  return Particle;
})(PIXI.Graphics);

module.exports = Particle;

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Scene = (function () {

  /**
   * [Scene contructor]
   * @return void
   */

  function Scene(_width, _height) {
    _classCallCheck(this, Scene);

    this.width = _width;
    this.height = _height;

    this.children = [];

    this.stage = new PIXI.Container();
    this.renderer = new PIXI.WebGLRenderer(this.width, this.height);
  }

  _createClass(Scene, [{
    key: 'addChild',

    /**
     * [Scene addChild]
     * - Add child to the stage
     * @param {obj} child
     */
    value: function addChild(child) {

      // has to be an instance of PIXI.DisplayObject PIXI.DisplayObject
      if (child instanceof PIXI.DisplayObject === false) {
        throw 'child has to be an instance of PIXI.DisplayObject';
      }

      this.stage.addChild(child);
    }
  }, {
    key: 'removeChild',

    /**
     * [Scene removeChild]
     * - Remove child to the stage
     * @param {obj} child
     */
    value: function removeChild(child) {

      // has to be a PIXI.DisplayObject or child of PIXI.DisplayObject
      this.stage.removeChild(child);
    }
  }, {
    key: 'render',

    /**
     * [Scene render]
     * - PIXI Renderer renders the PIXI stage
     * @return void
     */
    value: function render() {

      this.renderer.render(this.stage);
    }
  }, {
    key: 'resize',

    /**
     * [Scene resize]
     * - Called by the parent when window's resized
     * @param  {number} _width
     * @param  {number} _height
     * @return void
     */
    value: function resize(_width, _height) {

      this.width = _width;
      this.height = _height;

      this.renderer.view.style.width = this.width + 'px';
      this.renderer.view.style.height = this.height + 'px';
    }
  }]);

  return Scene;
})();

module.exports = Scene;

},{}],5:[function(require,module,exports){
'use strict';

var App = require('./app');

window.onload = function () {

  var app = new App();
};

},{"./app":1}]},{},[5])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3dpbGxpYW1tYXBhbi9Eb2N1bWVudHMvcGVyc28veHBzL2V4cGVyaW1lbnQtYm9pbGVycGxhdGUvc3JjL3NjcmlwdHMvYXBwLmpzIiwiL1VzZXJzL3dpbGxpYW1tYXBhbi9Eb2N1bWVudHMvcGVyc28veHBzL2V4cGVyaW1lbnQtYm9pbGVycGxhdGUvc3JjL3NjcmlwdHMvZXhwZXJpbWVudC9leHBlcmltZW50LmpzIiwiL1VzZXJzL3dpbGxpYW1tYXBhbi9Eb2N1bWVudHMvcGVyc28veHBzL2V4cGVyaW1lbnQtYm9pbGVycGxhdGUvc3JjL3NjcmlwdHMvZXhwZXJpbWVudC9wYXJ0aWNsZS9wYXJ0aWNsZS5qcyIsIi9Vc2Vycy93aWxsaWFtbWFwYW4vRG9jdW1lbnRzL3BlcnNvL3hwcy9leHBlcmltZW50LWJvaWxlcnBsYXRlL3NyYy9zY3JpcHRzL2V4cGVyaW1lbnQvc2NlbmUvc2NlbmUuanMiLCIvVXNlcnMvd2lsbGlhbW1hcGFuL0RvY3VtZW50cy9wZXJzby94cHMvZXhwZXJpbWVudC1ib2lsZXJwbGF0ZS9zcmMvc2NyaXB0cy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOztJQUVoRCxHQUFHOzs7Ozs7O0FBTUksV0FOUCxHQUFHLEdBTU87MEJBTlYsR0FBRzs7QUFRTCxRQUFJLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUUsTUFBTSxDQUFFLENBQUM7O0FBRTNDLFFBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLFFBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDOztBQUU1QixRQUFJLENBQUMsVUFBVSxHQUFH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LENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztLQUV0RDs7O1NBeEVHLEtBQUs7OztBQTRFWCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7Ozs7QUM1RXZCLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFN0IsTUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFNOztBQUVwQixNQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0NBRXJCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgRXhwZXJpbWVudCA9IHJlcXVpcmUoJy4vZXhwZXJpbWVudC9leHBlcmltZW50Jyk7XG5cbmNsYXNzIEFwcCB7XG5cbiAgLyoqXG4gICAqIEFwcCBjb250cnVjdG9yXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB0aGlzLmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5hcHAnICk7XG5cbiAgICB0aGlzLkRFTFRBX1RJTUUgPSAwO1xuICAgIHRoaXMuTEFTVF9USU1FID0gRGF0ZS5ub3coKTtcblxuICAgIHRoaXMuZXhwZXJpbWVudCA9IG5ldyBFeHBlcmltZW50KCB0aGlzLmVsICk7XG4gICAgdGhpcy5leHBlcmltZW50LmF0dGFjaFRvQ29udGFpbmVyKCk7XG5cbiAgICB0aGlzLmFkZExpc3RlbmVycygpO1xuXG4gIH1cblxuICAvKipcbiAgICogYWRkTGlzdGVuZXJzXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgYWRkTGlzdGVuZXJzKCkge1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykgKTtcbiAgICBUd2Vlbk1heC50aWNrZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3RpY2snLCB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpIClcblxuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZVxuICAgKiAtIFRyaWdnZXJlZCBvbiBldmVyeSBUd2Vlbk1heCB0aWNrXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgdXBkYXRlKCkge1xuXG4gICAgdGhpcy5ERUxUQV9USU1FID0gRGF0ZS5ub3coKSAtIHRoaXMuTEFTVF9USU1FO1xuICAgIHRoaXMuTEFTVF9USU1FID0gRGF0ZS5ub3coKTtcblxuICAgIHRoaXMuZXhwZXJpbWVudC51cGRhdGUoIHRoaXMuREVMVEFfVElNRSApO1xuICAgIHRoaXMuZXhwZXJpbWVudC5yZW5kZXIoKTtcblxuICB9XG5cbiAgLyoqXG4gICAqIG9uUmVzaXplXG4gICAqIC0gVHJpZ2dlcmVkIHdoZW4gd2luZG93IGlzIHJlc2l6ZWRcbiAgICogQHBhcmFtICB7b2JqfSBldnRcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBvblJlc2l6ZSggZXZ0ICkge1xuXG4gICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB0aGlzLmV4cGVyaW1lbnQucmVzaXplKCB3LCBoICk7XG5cbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwOyIsImNvbnN0IFBhcnRpY2xlID0gcmVxdWlyZSgnLi9wYXJ0aWNsZS9wYXJ0aWNsZScpO1xuY29uc3QgU2NlbmUgPSByZXF1aXJlKCcuL3NjZW5lL3NjZW5lJyk7XG5cbmNsYXNzIEV4cGVyaW1lbnQge1xuXG4gIC8qKlxuICAgKiBbRXhwZXJpbWVudCBjb250cnVjdG9yXVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKCBfY29udGFpbmVyICkge1xuXG4gICAgdGhpcy5jb250YWluZXIgPSBfY29udGFpbmVyO1xuXG4gICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB0aGlzLnNjZW5lID0gbmV3IFNjZW5lKCB3LCBoICk7XG5cbiAgICB0aGlzLnBhcnRpY2xlID0gbmV3IFBhcnRpY2xlKCk7XG4gICAgdGhpcy5zY2VuZS5hZGRDaGlsZCggdGhpcy5wYXJ0aWNsZSApO1xuXG4gIH1cblxuICAvKipcbiAgICogW0V4cGVyaW1lbnQgYXR0YWNoVG9Db250YWluZXJdXG4gICAqIC0gQXBwZW5kcyB0aGUgc2NlbmUgdG8gRXhwZXJpbWVudCdzIERPTSBjb250YWluZXJcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBhdHRhY2hUb0NvbnRhaW5lcigpIHtcblxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKCB0aGlzLnNjZW5lLnJlbmRlcmVyLnZpZXcgKTtcblxuICB9XG5cbiAgLyoqXG4gICAqIFtFeHBlcmltZW50IHVwZGF0ZV1cbiAgICogLSBVcGRhdGVzIGFsbCBjaGlsZHJlblxuICAgKiBAcGFyYW0gIHtudW1iZXJ9IERFTFRBX1RJTUVcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICB1cGRhdGUoIERFTFRBX1RJTUUgKSB7XG5cbiAgICB0aGlzLnBhcnRpY2xlLnVwZGF0ZSgpO1xuXG4gICAgaWYgKCB0aGlzLnBhcnRpY2xlLnBvc2l0aW9uLnggPD0gMCB8fCB0aGlzLnBhcnRpY2xlLnBvc2l0aW9uLnggPj0gdGhpcy5zY2VuZS53aWR0aCApIHtcbiAgICAgIHRoaXMucGFydGljbGUudnggKj0gLTE7XG4gICAgfVxuICAgIGlmICggdGhpcy5wYXJ0aWNsZS5wb3NpdGlvbi55IDw9IDAgfHwgdGhpcy5wYXJ0aWNsZS5wb3NpdGlvbi55ID49IHRoaXMuc2NlbmUuaGVpZ2h0ICkge1xuICAgICAgdGhpcy5wYXJ0aWNsZS52eSAqPSAtMTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBbRXhwZXJpbWVudCByZW5kZXJdXG4gICAqIC0gUmVuZGVycyB0aGUgc2NlbmVcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICByZW5kZXIoKSB7XG5cbiAgICB0aGlzLnNjZW5lLnJlbmRlcigpO1xuXG4gIH1cblxuICAvKipcbiAgICogW0V4cGVyaW1lbnQgcmVzaXplXVxuICAgKiAtIENhbGxlZCBieSB0aGUgcGFyZW50IHdoZW4gd2luZG93J3MgcmVzaXplZFxuICAgKiBAcGFyYW0gIHtudW1iZXJ9IF93aWR0aFxuICAgKiBAcGFyYW0gIHtudW1iZXJ9IF9oZWlnaHRcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICByZXNpemUoIF93aWR0aCwgX2hlaWdodCApIHtcblxuICAgIHRoaXMuc2NlbmUucmVzaXplKCBfd2lkdGgsIF9oZWlnaHQgKTtcblxuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFeHBlcmltZW50OyIsImNsYXNzIFBhcnRpY2xlIGV4dGVuZHMgUElYSS5HcmFwaGljcyB7XG5cbiAgLyoqXG4gICAqIFtFeHBlcmltZW50IGNvbnRydWN0b3JdXG4gICAqIC0gRXh0ZW5kcyBQSVhJLkdyYXBoaWNzXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy52eCA9IE1hdGgucmFuZG9tKCk7XG4gICAgdGhpcy52eSA9IE1hdGgucmFuZG9tKCk7XG5cbiAgICB0aGlzLmJlZ2luRmlsbCggMHhmZjAwMDAgKTtcbiAgICB0aGlzLmRyYXdDaXJjbGUoIDAsIDAsIDIwICk7XG4gICAgdGhpcy5lbmRGaWxsKCk7XG5cbiAgfVxuXG4gIHVwZGF0ZSgpIHtcblxuICAgIHRoaXMucG9zaXRpb24ueCArPSB0aGlzLnZ4O1xuICAgIHRoaXMucG9zaXRpb24ueSArPSB0aGlzLnZ5O1xuXG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcnRpY2xlOyIsImNsYXNzIFNjZW5lIHtcbiAgXG4gIC8qKlxuICAgKiBbU2NlbmUgY29udHJ1Y3Rvcl1cbiAgICogQHJldHVybiB2b2lkXG4gICAqLyBcbiAgY29uc3RydWN0b3IoIF93aWR0aCwgX2hlaWdodCApIHtcblxuICAgIHRoaXMud2lkdGggPSBfd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBfaGVpZ2h0O1xuXG4gICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuXG4gICAgdGhpcy5zdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUElYSS5XZWJHTFJlbmRlcmVyKCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuXG4gIH1cblxuICAvKipcbiAgICogW1NjZW5lIGFkZENoaWxkXVxuICAgKiAtIEFkZCBjaGlsZCB0byB0aGUgc3RhZ2VcbiAgICogQHBhcmFtIHtvYmp9IGNoaWxkXG4gICAqL1xuICBhZGRDaGlsZCggY2hpbGQgKSB7XG5cbiAgICAvLyBoYXMgdG8gYmUgYW4gaW5zdGFuY2Ugb2YgUElYSS5EaXNwbGF5T2JqZWN0IFBJWEkuRGlzcGxheU9iamVjdFxuICAgIGlmICggY2hpbGQgaW5zdGFuY2VvZiBQSVhJLkRpc3BsYXlPYmplY3QgPT09IGZhbHNlICkge1xuICAgICAgdGhyb3cgXCJjaGlsZCBoYXMgdG8gYmUgYW4gaW5zdGFuY2Ugb2YgUElYSS5EaXNwbGF5T2JqZWN0XCI7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQoIGNoaWxkICk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBbU2NlbmUgcmVtb3ZlQ2hpbGRdXG4gICAqIC0gUmVtb3ZlIGNoaWxkIHRvIHRoZSBzdGFnZVxuICAgKiBAcGFyYW0ge29ian0gY2hpbGRcbiAgICovXG4gIHJlbW92ZUNoaWxkKCBjaGlsZCApIHtcblxuICAgIC8vIGhhcyB0byBiZSBhIFBJWEkuRGlzcGxheU9iamVjdCBvciBjaGlsZCBvZiBQSVhJLkRpc3BsYXlPYmplY3RcbiAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKCBjaGlsZCApO1xuXG4gIH1cblxuICAvKipcbiAgICogW1NjZW5lIHJlbmRlcl1cbiAgICogLSBQSVhJIFJlbmRlcmVyIHJlbmRlcnMgdGhlIFBJWEkgc3RhZ2VcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICByZW5kZXIoKSB7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlciggdGhpcy5zdGFnZSApO1xuXG4gIH1cblxuICAvKipcbiAgICogW1NjZW5lIHJlc2l6ZV1cbiAgICogLSBDYWxsZWQgYnkgdGhlIHBhcmVudCB3aGVuIHdpbmRvdydzIHJlc2l6ZWRcbiAgICogQHBhcmFtICB7bnVtYmVyfSBfd2lkdGhcbiAgICogQHBhcmFtICB7bnVtYmVyfSBfaGVpZ2h0XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgcmVzaXplKCBfd2lkdGgsIF9oZWlnaHQgKSB7XG5cbiAgICB0aGlzLndpZHRoID0gX3dpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gX2hlaWdodDtcblxuICAgIHRoaXMucmVuZGVyZXIudmlldy5zdHlsZS53aWR0aCA9IHRoaXMud2lkdGggKyAncHgnO1xuICAgIHRoaXMucmVuZGVyZXIudmlldy5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArICdweCc7XG5cbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2NlbmU7IiwiY29uc3QgQXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgXG4gIGxldCBhcHAgPSBuZXcgQXBwKCk7XG5cbn1cblxuIl19
