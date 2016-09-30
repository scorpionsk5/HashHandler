(function (require) {
    var minify = require('minify'),
        fs = require('fs');

    minify('src/hashHandler.js', function (error, data) {
        if (error)
            console.error(error.message);
        else {
            fs.writeFile('finalBuild/hashHandler.min.js', data, function (err, fileRef) {
                if (err) {
                    console.log(err);
                }
            });
        };
    });

})(require);
