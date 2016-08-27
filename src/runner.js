/**
 * Created by knut on 2016-04-17.
 */
var crib = require('./index.js');

module.exports.start = function(conf) {
    var fs = require('fs');
    var path = require('path');

    var cribHome = process.env.CRIB_HOME;
    if (!cribHome) {
        cribHome = process.cwd();
    }

    console.log('Started crib using ', cribHome);

    var conf = {
        plugins: []
    };

    var modulesPath = path.join(cribHome, 'crib_modules');

    conf.modulesPath = modulesPath;

    var files = fs.readdirSync(modulesPath);

    if (files.indexOf('crib-mq') < 0) {
        console.log('Error, crib-mq not found aborting');
        process.exit(0);
    }

    if (files.indexOf('crib-storage') < 0) {
        console.log('Error, crib-storage not found aborting');
        process.exit(0);
    }

    conf.plugins.push('crib-mq');
    conf.plugins.push('crib-storage');

    files.forEach((file)=> {
        if (file !== 'crib-mq' && file !== 'crib-storage' && file !== 'crib-ui' && file.match('crib-')) {
            console.log('Using plugin: ', file);
            conf.plugins.push(file);
        }
    });

    crib.start(conf);
}