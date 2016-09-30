(function (require) {
    var minify = require('minify'),
        fs = require('fs');

    minify('src/hashHandler.js', function (error, data) {
        if (error)
            console.error(error.message);
        else {
            var licenseText = '/*Copyright (c) 2016 Shashi Kumar D, for more details visit - */';
            data = licenseText + data;
            fs.writeFile('build/hashHandler.min.js', data, function (err, fileRef) {
                if (err) {
                    console.log(err);
                }
            });
        };
    });

})(require);
