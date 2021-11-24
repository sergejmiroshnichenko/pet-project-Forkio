import gulp from 'gulp';
import clean from 'gulp-clean';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import minify from 'gulp-minify';
import BS from 'browser-sync';
const browserSync = BS.create();
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import imagemin from 'gulp-imagemin';
import group_media from 'gulp-group-css-media-queries';
const sass = gulpSass(dartSass);

gulp.task('clean', () => gulp.src(['dist/css/*', 'dist/js/*'], {read: false}).pipe(clean()));
gulp.task('buildCss', () => gulp.src('src/scss/**/*', {allowEmpty: true})
    .pipe(sass())
    .pipe(
        group_media()
    )
    .pipe(autoprefixer({cascade: false}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('dist/css')));
gulp.task('buildJs', () => gulp.src('src/js/**/*', {allowEmpty: true})
    .pipe(concat('scripts.js'))
    .pipe(minify({ext:{min: '.min.js'}}))
    .pipe(gulp.dest('dist/js')));
gulp.task('buildImg', () => gulp.src('src/img/**/*', {allowEmpty: true})
    .pipe(imagemin({
            progressive : true,
            svgoPlugins : [{ removeViewBox: false}],
            interlaced : true,
            optimizationLevel : 3
        })
    )
    .pipe(gulp.dest('dist/img')));

gulp.task('build', gulp.series('clean', 'buildCss', 'buildJs', 'buildImg'));
gulp.task('dev', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(['src/**/*', 'index.html']).on('change', gulp.series('clean', 'buildCss', 'buildJs', 'buildImg', browserSync.reload));
});
