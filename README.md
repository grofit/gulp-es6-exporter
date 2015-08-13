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

// Created amaze.js
export * from './test-1';
export * from './test-2';
//etc

// If we were not to use the root option it would output

// Created amaze.js (without root)
export * from './test/test-1';
export * from './test/test-2';
//etc
```
This would assume it is re-exporting from within the test folder so it would remove the "./test" prefix and put in "./".

There is also for typescript people the option for module to wrap the re-exports within a new module.

```
exporter("amaze.ts", { module: "spiffy-module" });

// Created amaze.ts
module "spiffy-module"
{
    export * from "./test/test-1";
    export * from "./test/test-2";
    // etc
}
```

This is the reason I made the module to basically wrap my internal files in an external module without having to litter module syntax throughout each.

