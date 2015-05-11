const Experiment = require('./experiment/experiment');

class App {

  /**
   * App contructor
   * @return void
   */
  constructor() {

    this.el = document.querySelector( '.app' );

    this.DELTA_TIME = 0;
    this.LAST_TIME = Date.now();

    this.experiment = new Experiment( this.el );
    this.experiment.attachToContainer();

    this.addListeners();

  }

  /**
   * addListeners
   * @return void
   */
  addListeners() {

    window.addEventListener( 'resize', this.onResize.bind(this) );
    TweenMax.ticker.addEventListener( 'tick', this.update.bind(this) )

  }

  /**
   * update
   * - Triggered on every TweenMax tick
   * @return void
   */
  update() {

    this.DELTA_TIME = Date.now() - this.LAST_TIME;
    this.LAST_TIME = Date.now();

    this.experiment.update( this.DELTA_TIME );
    this.experiment.render();

  }

  /**
   * onResize
   * - Triggered when window is resized
   * @param  {obj} evt
   * @return void
   */
  onResize( evt ) {

    let w = window.innerWidth;
    let h = window.innerHeight;
    this.experiment.resize( w, h );

  }

}

module.exports = App;