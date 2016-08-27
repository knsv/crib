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
            console.log('Starting ',conf.modulesPath + '/src/index.js');
            pm2.start({
                script: conf.modulesPath + '/' + plugin + '/src/index.js',         // Script to be run
                exec_mode: 'cluster',        // Allow your app to be clustered
                instances: 1,                // Optional: Scale your app by 4
                name: plugin,
                max_memory_restart: '100M',   // Optional: Restart your app if it reaches 100Mo
                log_file: "logs/"+plugin+".log",
                env: {
                    "CRIB_BUSS_URL": process.env.CRIB_BUSS_URL,
                    "CRIB_LOGGLY_TOKEN": process.env.CRIB_LOGGLY_TOKEN,
                    "CRIB_LOGGLY_DOMAIN": process.env.CRIB_LOGGLY_DOMAIN
                }
            }, function (err, apps) {
                console.log(err);
                pm2.disconnect();
            });
            console.log('Started ',plugin);
        });

        // console.log('Starting crib-ui');
        // pm2.start({
        //     script: '../crib-ui/src/index.js',         // Script to be run
        //     exec_mode: 'cluster',        // Allow your app to be clustered
        //     instances: 1,                // Optional: Scale your app by 4
        //     name: 'crib-ui',
        //     max_memory_restart: '100M',   // Optional: Restart your app if it reaches 100Mo
        //     log_file: "logs/crib-ui.log",
        // }, function (err, apps) {
        //     console.log(err);
        //     pm2.disconnect();
        // });
    });
};