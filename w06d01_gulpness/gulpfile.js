const gulp     = require('gulp');
const print    = require('gulp-print');
const postcss  = require('gulp-postcss');
const nested   = require('postcss-nested');
const atImport = require('postcss-import');
const cssNext  = require('postcss-cssnext');

// List all tasks `gulp -T`
// Run a specific task with `gulp <name-of-task>`

const something = () => {
  console.log('Running something task');
};

gulp.task('something', something);

gulp.task('css', () => {
  return gulp.src('src/css/style.css')
    .pipe(print())
    .pipe(postcss([
      atImport,
      cssNext({browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}),
      nested
    ]))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.css', ['css']);
});

gulp.task('default', ['css', 'watch']);
