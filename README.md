# experiment-starter

Small starter for experiments using ES6, PIXI.js and TweenMax

## Install

Clone this repository, then

```bash
npm install
```

This will install the project and its dependencies

## DevDependencies

In order to develop and use the tasks, please install globally the following packages.
(If you don't have them already installed globally)

```bash
npm install -g browser-sync
npm install -g browserify
npm install -g stylus
npm install -g watchify
```

[Babelify](https://github.com/babel/babelify)
[Browser-sync](http://www.browsersync.io/)
[Browserify](http://browserify.org/)
[Stylus](https://learnboost.github.io/stylus/)
[Watchify](https://github.com/substack/watchify)

## Dependencies and vendor

Packages used on the end code.
Feel free to add more ( npm install --save [packageName] )

[PIXI.js](https://github.com/GoodBoyDigital/pixi.js)
[GSAP/Tweenmax](http://www.greensock.com/gsap-js/)


## Tasks

### start

Launches a browser-sync server on port 9000 with livereload and open default browser and start watching

```bash
npm start
```

### start:server

Launches a browser-sync server on port 9000, watch for changes only for /static files and open default browser.

```bash
npm run start:server
```

### build

Bundle all JS and CSS static files.

```bash
npm run build
```

### build:js

Bundle the main.js static file.

```bash
npm run build:js
```

### build:js:vendor

Bundle the v.js static file from /src/scripts/vendor/vendor.js
By default, it contains PIXI.js and TweenMax on the window object.
Feel free to add more.

```bash
npm run build:js:vendor
```

### build:css

Bundle the main.css static file.

```bash
npm run build:css
```

### watch

Watch and rebundle all JS and CSS static files.

```bash
npm run watch
```

### watch:js

Watch /src/scripts/ and rebundle the main.js static file.

```bash
npm run watch:js
```

### watch:css

Watch /src/styles/ and rebundle the main.css static file.

```bash
npm run watch:css
```