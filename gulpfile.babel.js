import babelPreset from 'babel-preset-es2015';
import gulp from 'gulp';
import sequence from 'run-sequence';

const $ = require('gulp-load-plugins')();

// ================================================================
// CONSTS
// ================================================================
const path = {
  src: {
    styles: 'src/sass/styles.scss',
    js: {
      vendors: [
        'src/js/jquery.min.js',
        'src/js/jquery.flexslider.js',
        'src/js/waypoints.min.js',
      ],
      main: [
        'src/js/main.js',
      ],
    },
    images: './img/**/*',
  },

  build: {
    styles: './css/',
    js: './js/',
    images: './img/',
  },

  watch: {
    styles: 'src/sass/**/*',
    js: 'src/js/**/*',
    html: 'index.html',
  },
};

// ================================================================
// BUILD
// ================================================================
gulp.task('build', () => {
  sequence(
    [
      'images',
      'js-vendors',
      'js',
      'styles',
    ],
  );
});

// ================================================================
// STYLES : Build common stylesheets
// ================================================================
gulp.task('styles', () => {
  gulp.src(path.src.styles)
    .pipe($.changed(path.build.styles, { extension: '.css' }))
    .pipe($.sourcemaps.init())
    .pipe($.plumber())
    .pipe($.sassGlob())
    .pipe($.sass())
    .pipe($.autoprefixer())
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.cssnano())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(path.build.styles))
    .pipe($.livereload());
});

// ================================================================
// JS : Build common js.
// ================================================================
gulp.task('js', () => {
  gulp.src(path.src.js.main)
    .pipe($.changed(path.build.js, { extension: '.js' }))
    .pipe($.sourcemaps.init())
    .pipe($.plumber())
    .pipe($.concat('main.js'))
    .pipe($.babel({
      presets: [babelPreset],
      compact: false,
    }))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(path.build.js))
    .pipe($.livereload());
});

// ================================================================
// JS : Build common vendors js only.
// ================================================================
gulp.task('js-vendors', () => {
  gulp.src(path.src.js.vendors)
    .pipe($.changed(path.build.js, { extension: '.js' }))
    .pipe($.concat('vendors.js'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify())
    .pipe(gulp.dest(path.build.js));
});

// ================================================================
// Images
// ================================================================
gulp.task('images', () => {
  gulp.src(path.src.images)
    .pipe($.changed(path.build.images))
    .pipe($.imagemin())
    .pipe(gulp.dest(path.build.images));
});

// ================================================================
// Server simulation
// ================================================================
gulp.task('connect', () => {
  $.connect.server({
    root: '.',
    livereload: true,
  });
});

// ================================================================
// WATCH
// ================================================================
gulp.task('watch', () => {
  $.livereload.listen();
  gulp.watch(path.watch.js, ['js']);
  gulp.watch(path.watch.styles, ['styles']);
  gulp.watch(path.watch.html, $.livereload());
});

// ================================================================
// DEFAULT
// ================================================================
gulp.task('default', ['watch', 'connect']);
