const Particle = require('./particle/particle');
const Scene = require('./scene/scene');

class Experiment {

  /**
   * [Experiment contructor]
   * @return void
   */
  constructor( _container ) {

    this.container = _container;

    let w = window.innerWidth;
    let h = window.innerHeight;
    this.scene = new Scene( w, h );

    this.particle = new Particle();
    this.scene.addChild( this.particle );

  }

  /**
   * [Experiment attachToContainer]
   * - Appends the scene to Experiment's DOM container
   * @return void
   */
  attachToContainer() {

    this.container.appendChild( this.scene.renderer.view );

  }

  /**
   * [Experiment update]
   * - Updates all children
   * @param  {number} DELTA_TIME
   * @return void
   */
  update( DELTA_TIME ) {

    this.particle.update();

    if ( this.particle.position.x <= 0 || this.particle.position.x >= this.scene.width ) {
      this.particle.vx *= -1;
    }
    if ( this.particle.position.y <= 0 || this.particle.position.y >= this.scene.height ) {
      this.particle.vy *= -1;
    }

  }

  /**
   * [Experiment render]
   * - Renders the scene
   * @return void
   */
  render() {

    this.scene.render();

  }

  /**
   * [Experiment resize]
   * - Called by the parent when window's resized
   * @param  {number} _width
   * @param  {number} _height
   * @return void
   */
  resize( _width, _height ) {

    this.scene.resize( _width, _height );

  }

}

module.exports = Experiment;