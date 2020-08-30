const {src, dest, parallel, watch} = require('gulp');
const pug                          = require('gulp-pug');
const sass                         = require('gulp-sass');
const minifyCSS                    = require('gulp-csso');
const concat                       = require('gulp-concat');

var srcDir  = "src";
var distDir = "dist";

function html() {
    return src(srcDir + '/pug/pages/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(dest(distDir))
}

function css() {
    return src(srcDir + '/scss/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(dest( distDir + '/css'))
}

function js() {
    return src([
        "node_modules/jquery/dist/jquery.js",
        srcDir + "/js/app.js",
    ], {sourcemaps: true})
        .pipe(concat('app.min.js'))
        .pipe(dest( distDir + '/js', {sourcemaps: true}))
}


function images() {
    return src(srcDir + '/images/**/*.*')
        .pipe(dest(distDir + '/images'));

}

function plugins() {
    return src(srcDir + '/plugins/**/*.*')
        .pipe(dest(distDir + '/plugins'));
}

function listen() {
    return watch(srcDir + "/**/*", parallel(html, css, js, images));
}

exports.html   = html;
exports.css    = css;
exports.js     = js;
exports.images = images;
exports.plugins = plugins;
exports.listen  = listen;

exports.default = parallel(html, css, js, images, plugins, listen);
