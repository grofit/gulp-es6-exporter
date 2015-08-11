var through = require('through2');
var gutil = require('gulp-util');
var path = require("path");
var PluginError = gutil.PluginError;
var File = gutil.File;

// consts
const PLUGIN_NAME = 'gulp-es6-exporter';

var generateExportFor = function(sourceFile, rootDir) {
    var srcPath = path.dirname(sourceFile);
    var extension = path.extname(sourceFile);
    var srcFilename = path.basename(sourceFile, extension);
    var relativePath = path.relative(rootDir, srcPath);
    relativePath = (relativePath == "" ? "." : "./" + relativePath);
    return new Buffer('export * from "' + relativePath + "/" + srcFilename + '"\n');
};

// plugin level function (dealing with files)
function gulpExporter(destinationFile, options) {

    if (!destinationFile) {
        throw new PluginError(PLUGIN_NAME, 'Missing destination file');
    }
    options = options || {};
    var root = options.root || "./";

    var contents = new Buffer("");

    function bufferContents(file, enc, cb) {
        // ignore empty files
        if (file.isNull()) {
            cb();
            return;
        }

        // we don't do streams (yet)
        if (file.isStream()) {
            throw new PluginError(PLUGIN_NAME, "streaming is not supported");
            cb();
            return;
        }

        var newExport = generateExportFor(file.path, root);
        contents = Buffer.concat([contents, newExport]);
        cb();
    }

    function endStream(cb) {
        // no files passed in, no file goes out
        if (!contents) {
            cb();
            return;
        }

        var exporterFile = new File();
        exporterFile.contents = contents;
        exporterFile.path = destinationFile;
        this.push(exporterFile);

        cb();
    }

    return through.obj(bufferContents, endStream);
};

// exporting the plugin main function
module.exports = gulpExporter;