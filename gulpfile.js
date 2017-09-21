var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var svgo = require('gulp-svgo');

var wait = require('gulp-wait');

var jsSource = [
  "bower_components/jquery/dist/jquery.min.js",
  "app/js/*.js"
];

// ============================================
// JS tasks
// ============================================

// Concatenate JS

gulp.task('js:dev', function() {
    return gulp.src(jsSource)
        .pipe(sourcemaps.init()) //odpalam generowanie sourcemapy
        .pipe(concat('scripts.js')) //łaczę pliki
        .pipe(rename({suffix: '.min'})) //zmieniam nazwę
        .pipe(sourcemaps.write('./maps')) //tworzę sourcemapę
        .pipe(gulp.dest('dist/js')) //wszystko zapisuję w dist/js
        .pipe(browserSync.stream())
});

// Minify JS

gulp.task('js:prod', function() {
    return gulp.src('app/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream())
});

// ============================================
// SCSS tasks
// ============================================

gulp.task('sass:prod', function() {
  return gulp.src('app/scss/*.scss')//jak dodamy foldery to tutaj zmienic
  .pipe(sourcemaps.init())
  .pipe(sass({errLogToConsole: true, outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(autoprefixer({browsers: ["> 1%"]}))
  .pipe(cleanCSS())
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream({match: '**/*.css'}))
});

gulp.task('sass:dev', function() {
  return gulp.src('app/scss/*.scss')//jak dodamy foldery to tutaj zmienic
  .pipe(wait(100))
  .pipe(sourcemaps.init())
  .pipe(sass({errLogToConsole: true, outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(autoprefixer({browsers: ["> 1%"]}))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream({match: '**/*.css'}))
});


// ============================================
// HTML tasks
// ============================================

gulp.task('copy-html-files', function () {  // kopiowanie html
    return gulp.src('./app/*.html') // stream source
    .pipe(gulp.dest('./dist')) // copy to dist/views
    .pipe(browserSync.stream({match: '**/*.html'}))
});

gulp.task('svgopt', function() {

    gulp.src('app/images/*')
        .pipe(svgo())
        .pipe(gulp.dest('dist/images'));
});


// ============================================
gulp.task('browserSync', function (){
  var files = [
      '*.html',
      'css/*.css',
      'js/*.js'
  ];
  browserSync.init(files, {
      server: {
          baseDir: 'dist'
      }
  });
});

gulp.task('watch:prod', function() {
    gulp.watch('app/js/*.js', ['js:prod']);
    gulp.watch('app/scss/**/*.scss', ['sass:prod']);
    gulp.watch('app/*.html', ['copy-html-files']);
});

gulp.task('watch:dev', function() {
  gulp.watch('app/js/*.js', ['js:dev']);
  gulp.watch('app/scss/**/*.scss', ['sass:dev']);
  gulp.watch('app/*.html', ['copy-html-files']);
  gulp.watch('./app/html/**/*.html',['fileinclude']);
});

gulp.task('dev', function() {
  gulp.start('sass:dev', 'js:dev', 'copy-html-files', 'watch:dev');
});

gulp.task('prod', function() {
  gulp.start('sass:prod', 'js:prod', 'copy-html-files', 'watch:prod');
});

gulp.task('default', ['dev', 'browserSync']);
