/**
 * Created by knut on 2016-04-17.
 */
var pm2 = require('pm2');



module.exports.start = function(conf){
    console.log('cwd ',process.cwd());

    pm2.connect(function(err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        conf.plugins.push('crib-mq');
        conf.plugins.forEach(function (plugin) {
            console.log('Starting ','node_modules/' + plugin + '/src/index.js');
            pm2.start({
                script: 'node_modules/' + plugin + '/src/index.js',         // Script to be run
                exec_mode: 'cluster',        // Allow your app to be clustered
                instances: 1,                // Optional: Scale your app by 4
                max_memory_restart: '100M'   // Optional: Restart your app if it reaches 100Mo
            }, function (err, apps) {
                console.log(err);
                pm2.disconnect();
            });
        });
    });
}