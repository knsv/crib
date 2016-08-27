/**
 * Created by knut on 2016-04-17.
 */
module.exports = {
    plugins:[
        'crib-storage',
        'crib-scheduler',
        'crib-hue',
        'crib-slack',
        'crib-inst',
        // 'crib-ui'
    ],
    CRIB_BUSS_URL:process.env.CRIB_BUSS_URL
};