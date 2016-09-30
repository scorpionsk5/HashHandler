(function (require) {

    var minify = require('minify'),
        fs = require('fs'),
        loggerString = '',
        logger = function (logEntry) {
            loggerString = loggerString + (new Date()).toISOString() + ': ' + logEntry + '\n';
        },
        writeLog = function () {
            fs.writeFile('buildLog.txt', loggerString);
        };

    logger('Build Started...');

    minify('src/hashHandler.js', function (error, data) {
        if (error) {
            logger(error.message);
            writeLog();
        }
        else {
            var licenseText = '/*Copyright (c) 2016 Shashi Kumar D, for more details visit - https://github.com/scorpionsk5/HashHandler/blob/master/License.txt */\n';
            data = licenseText + data;
            fs.writeFile('build/hashHandler.min.js', data, function (err, fileRef) {
                if (err) {
                    logger(err.message);
                }
                else {
                    logger('Build Completed Successfully!!!');
                };
                writeLog();
            });
        };
    });

})(require);
