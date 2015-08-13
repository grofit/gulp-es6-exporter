var gulp = require("gulp");
var exporter = require("./index");

gulp.task('default', function() {
    return gulp.src("./test/*.js")
        .pipe(exporter("amaze.js", { module: 'super-amazing' }))
        .pipe(gulp.dest('./'));
});