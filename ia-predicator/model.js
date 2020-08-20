const tf = require("@tensorflow/tfjs-node");

exports.createModel = function() {

    const model= tf.sequential();
    model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));
    model.add(tf.layers.dense( {  units: 1, useBias: true} ));

    //console.log(model);
    return (model);
}