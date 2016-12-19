const gulp  = require("gulp");
const babel = require("gulp-babel");

gulp.task('es6', () => {
  return gulp.src('src/main.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['es6'], () => {
  gulp.watch('src/main.js', ['es6']);
});