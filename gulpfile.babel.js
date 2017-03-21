import gulp from 'gulp';
import del from 'del';
import sequence from 'run-sequence';
import babelPreset from 'babel-preset-es2015';

const $ = require('gulp-load-plugins')();

// ================================================================
// CONSTS
// ================================================================
const buildDir = 'build';

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
    images: 'src/img/**/*',
    fonts: 'src/fonts/**/*',
    html: '*.html',
  },

  build: {
    styles: `${buildDir}/css/`,
    js: `${buildDir}/js/`,
    images: `${buildDir}/img/`,
    fonts: `${buildDir}/fonts/`,
    html: `${buildDir}`,
  },

  watch: {
    styles: 'src/sass/**/*',
    js: 'src/js/**/*',
    images: 'src/img/**/*',
    fonts: 'src/fonts/**/*',
    html: 'index.html',
  },
};

// ================================================================
// BUILD
// ================================================================
gulp.task('build', () => {
  sequence(
    'clear', [
      'fonts',
      'images',
      'html',
      'js-vendors',
      'js',
      'styles',
    ],
  );
});

// ================================================================
// Clear : Clear destination dir before build.
// ================================================================
gulp.task('clear', () => del(`${buildDir}/**/*`));

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
// Fonts
// ================================================================
gulp.task('fonts', () => {
  gulp.src(path.src.fonts)
    .pipe($.changed(path.build.fonts))
    .pipe(gulp.dest(path.build.fonts));
});

// ================================================================
// Html
// ================================================================
gulp.task('html', () => {
  gulp.src(path.src.html)
    .pipe($.changed(path.build.html))
    .pipe(gulp.dest(path.build.html))
    .pipe($.livereload());
});

// ================================================================
// Server simulation
// ================================================================
gulp.task('connect', () => {
  $.connect.server({
    root: 'build',
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
  gulp.watch(path.watch.html, ['html']);
});

// ================================================================
// DEFAULT
// ================================================================
gulp.task('default', ['watch', 'connect']);
