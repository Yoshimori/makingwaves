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

var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var buffer = require('vinyl-buffer');



var scssSource = [
    "src/scss/*.scss"
]

var scssIncludePaths = [
    "./bower_components"
]

var jsSource = [
    "bower_components/jquery/dist/jquery.min.js",
    "src/js/lib/greets.js",
    "src/js/main.js"
  ];
  
  // ============================================
  // JS tasks
  // ============================================
  
  // Concatenate JS
  
  gulp.task('js:dev', function() {
      return gulp.src(jsSource)
          .pipe(sourcemaps.init()) //odpalam generowanie sourcemapy
          .pipe(concat('main.js')) //łaczę pliki
          .pipe(rename({suffix: '.min'})) //zmieniam nazwę
          .pipe(sourcemaps.write('./maps')) //tworzę sourcemapę
          .pipe(gulp.dest('dist/js')) //wszystko zapisuję w dist/js
          .pipe(browserSync.stream())
  });
  
  // Minify JS
  
  gulp.task('js:prod', function() {
      return gulp.src(jsSource)
          .pipe(sourcemaps.init())
          .pipe(concat('main.js'))
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
    return gulp.src(scssSource)
    .pipe(sourcemaps.init())
    .pipe(sass({errLogToConsole: true, outputStyle: 'expanded', includePaths:scssIncludePaths}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ["> 1%"]}))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({match: '**/*.css'}))
    });

    gulp.task('sass:dev', function() {
    return gulp.src(scssSource)
    .pipe(wait(100))
    .pipe(sourcemaps.init())
    .pipe(sass({errLogToConsole: true, outputStyle: 'expanded', includePaths:scssIncludePaths}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ["> 1%"]}))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({match: '**/*.css'}))
    });


// ============================================
// HTML tasks
// ============================================

    gulp.task('copy-html-files', function () {  // kopiowanie html
        return gulp.src('./src/*.html') // stream source
        .pipe(gulp.dest('./dist')) // copy to dist/views
        .pipe(browserSync.stream({match: '**/*.html'}))
    });

    gulp.task('svgopt', function() {

        gulp.src('assets/images/*')
            .pipe(svgo())
            .pipe(gulp.dest('dist/images'));
    });


// ============================================
// BROWSER SYNC
// ============================================

    gulp.task('browserSync', function (){
        var files = [
            '*.html',
            'css/*.css',
            'js/*.js'
        ];
        browserSync.init(files, {
            server: {
                baseDir: './dist'
            }
        });
    });

// ============================================
//  WATCH
// ============================================

    gulp.task('watch:prod', function() {
        gulp.watch('src/js/**/*.js', ['ts:prod']).on('error', swallowError);
        gulp.watch('src/scss/**/*.scss', ['sass:prod']).on('error', swallowError);
        gulp.watch('src/*.html', ['copy-html-files']).on('error', swallowError);
    });

    gulp.task('watch:dev', function() {
    gulp.watch('src/js/**/*.js', ['js:dev']).on('error', swallowError);
    gulp.watch('src/scss/**/*.scss', ['sass:dev']).on('error', swallowError);
    gulp.watch('src/*.html', ['copy-html-files']).on('error', swallowError);
    gulp.watch('./src/html/**/*.html',['fileinclude']).on('error', swallowError);
    });

    gulp.task('dev', function() {
    gulp.start('sass:dev', 'js:dev', 'copy-html-files', 'watch:dev');
    });

    gulp.task('prod', function() {
    gulp.start('sass:prod', 'ts:prod', 'copy-html-files', 'watch:prod');
    });

    gulp.task('default', [ 'copy-html-files', 'dev', 'browserSync']);

// ============================================
// Functions
// ============================================

function swallowError (error) {
    console.log(error.toString())    
    this.emit('end')
}

