const { src, dest, watch, series, parallel } = require('gulp');
const del = require('del'); //For Cleaning build/dist for fresh export
const options = require("./config"); //paths and other options from config.js
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass')(require('sass')); //For Compiling SASS files
const postcss = require('gulp-postcss'); //For Compiling tailwind utilities with tailwind config
const concat = require('gulp-concat'); //For Concatinating js,css files
const uglify = require('gulp-terser');//To Minify JS files
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin'); //To Optimize Images
const cleanCSS = require('gulp-clean-css');//To Minify CSS files
const purgecss = require('gulp-purgecss');// Remove Unused CSS from Styles
const logSymbols = require('log-symbols'); //For Symbolic Console logs :) :P
const browserify = require('browserify');
const source  = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const styleList = [
    'node_modules/flickity/css/flickity.css',
    options.paths.src.main,
];

function devStyles(){
  const tailwindcss = require('tailwindcss');
  return src(styleList)
      .pipe(sassGlob())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([
        tailwindcss(options.config.tailwindJS),
        require('autoprefixer'),
      ]))
      .pipe(concat({ path: 'style.css'}))
      .pipe(dest(options.paths.dist.css));
}

function devScripts(){
  return browserify(['./src/js/main.js'], {debug: true})
      .transform('babelify', {
          presets: ['@babel/preset-env'],
          sourceMaps: true,
          global: true,
          ignore: [/\/node_modules\/(?!gsap\/)/],
          plugins: ['@babel/plugin-transform-runtime'],
      })
      .bundle()
      .pipe(source('scripts.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(dest(options.paths.dist.js));
}

function devImages(){
  return src(`${options.paths.src.img}/**/*`).pipe(dest(options.paths.dist.img));
}

function devFonts(){
    return src(`${options.paths.src.fonts}/**/*`).pipe(dest(options.paths.dist.fonts));
}

function watchFiles(){
  watch('./templates/**/*.ss');
  watch([options.config.tailwindJS, `${options.paths.src.css}/**/*`],series(devStyles));
  watch(`${options.paths.src.js}/**/*.js`,series(devScripts));
  watch(`${options.paths.src.img}/**/*`,series(devImages));
    watch(`${options.paths.src.fonts}/**/*`,series(devFonts));
  console.log("\n\t" + logSymbols.info,"Watching for Changes..\n");
}

function devClean(){
  console.log("\n\t" + logSymbols.info,"Cleaning dist folder for fresh start.\n");
  return del([options.paths.dist.base]);
}

function prodStyles(){
  return src(`${options.paths.dist.css}/**/*`)
      .pipe(purgecss({
          content: [
              'src/**/*.js',
              '../app/templates/**/*.ss'
          ],
          safelist: options.config.safelist,
          defaultExtractor: content => {
              const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
              const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []
              return broadMatches.concat(innerMatches)
          },
  }))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(dest(options.paths.build.css));
}

function prodScripts(){

    return browserify(['./src/js/main.js'], {debug: true})
        .transform('babelify', {
            presets: ['@babel/preset-env'],
            sourceMaps: true,
            global: true,
            ignore: [/\/node_modules\/(?!gsap\/)/],
            plugins: ['@babel/plugin-transform-runtime'],
        })
        .bundle()
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(options.paths.build.js));
}

function prodImages(){
  return src(options.paths.src.img + '/**/*').pipe(imagemin()).pipe(dest(options.paths.build.img));
}

function prodFonts(){
    return src(options.paths.src.fonts + '/**/*').pipe(imagemin()).pipe(dest(options.paths.build.fonts));
}

function prodClean(){
  console.log("\n\t" + logSymbols.info,"Cleaning build folder for fresh start.\n");
  return del([options.paths.build.base]);
}

function buildFinish(done){
  console.log("\n\t" + logSymbols.info,`Production build is complete. Files are located at ${options.paths.build.base}\n`);
  done();
}

exports.default = series(
    devClean, // Clean Dist Folder
    parallel(devStyles, devScripts, devImages, devFonts), //Run All tasks in parallel
    watchFiles // Watch for Live Changes
);

exports.prod = series(
    prodClean, // Clean Build Folder
    parallel(prodStyles, prodScripts, prodImages, prodFonts), //Run All tasks in parallel
    buildFinish
);
