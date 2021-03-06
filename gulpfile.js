const { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    del = require("del"),
    fileinclude = require('gulp-file-include');
    scss = require('gulp-sass')(require('sass')),
    group_media = require("gulp-group-css-media-queries"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    concat = require("gulp-concat"),
    csso = require("gulp-csso");

let project_folder = "dist";
let source_folder = "src";

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder +"/js/",
        components: project_folder +"/components/",
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"], // include-файлы помечать "_"
        css: source_folder + "/**/*.scss",
        js: source_folder + "/**/*.js",
        components: source_folder + "/components/",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/**/*.scss, ['sass']",
        js: source_folder + "/js/**/*.js",
        components: source_folder + "/components/**/*.+(js|scss)",
    },
    clean: "./" + project_folder + "/"
}

    function browserSync (params) {
        browsersync.init({
            server: {
                baseDir: "./" + project_folder + "/"
            },
            port: 3000,
            notify: false,
        })
    }

    function html() {
        return src(path.src.html)
            .pipe(fileinclude())
            .pipe(dest(path.build.html))
            .pipe(browsersync.stream())
    }

    function watchFiles(params) {
        gulp.watch([path.watch.html], html);
        gulp.watch([path.watch.css], css);
        gulp.watch([path.watch.js], js);
    }

    function clean(params) {
        return del(path.clean);
    }

    function css() {
        return src(path.src.css)
            .pipe(
                scss().on("error", scss.logError)
            )
            .pipe(
                group_media()
            )
            .pipe(csso())
            .pipe(concat('styles.css'))
            .pipe(dest(path.build.css))
            .pipe(
                rename({
                    extname: ".min.css"
                })
            )
            .pipe(dest(path.build.css))
            .pipe(browsersync.stream())
    }

    function js() {
        return src(path.src.js)
            .pipe(concat('index.js'))
            .pipe(dest(path.build.js))
            .pipe(
                uglify()
            )
            .pipe(
                rename({
                    extname: ".min.js"
                })
            )
            .pipe(dest(path.build.js))
            .pipe(browsersync.stream())
    }

    let build = gulp.series(clean, gulp.parallel(js, css, html));
    let watch = gulp.parallel(build, watchFiles, browserSync);

    exports.js = js;
    exports.css = css;
    exports.html = html;
    exports.build = build;
    exports.watch = watch;
    exports.default = watch;