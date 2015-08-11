# gulp-es6-exporter
A VERY rough gulp task for re-exporting directories of es6 modules

Do not use for anything live, it was just a prototype to see how easy it was to generate re-exporting files for large projects.

Assuming you do not care and want to try it anyway...

```
var gulp = require("gulp");
var exporter = require("./index");

gulp.task('default', function() {
    return gulp.src("./test/*.js")
        .pipe(exporter("amaze.js"))
        .pipe(gulp.dest('./test'));
});
```

This would re-export everything within the test directory, into a file called amaze.js.

You can however provide the option root to provide where it is running from:

```
exporter("amaze.js", { root: "test" })
```

This would assume it is re-exporting from within the test folder so it would remove the "./test" prefix and put in "./".