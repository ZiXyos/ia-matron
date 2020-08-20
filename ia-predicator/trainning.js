const tf = require("@tensorflow/tfjs-node");
const tfvis = require("@tensorflow/tfjs-vis");

exports.convertToTensor = function(data) {

    return (tf.tidy( ()=> {

        tf.util.shuffle(data);
        /* convert data to tensor */
        const inputs = data.map( d => d.horsepower);
        const labels = data.map( d => d.mpg);
        const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
        const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

        /* normalize Data */

        const inputMax = inputTensor.max();
        const inputMin = inputTensor.min();
        const labelMax = labelTensor.max();
        const labelMin = labelTensor.min();

        const normalizeInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
        const normalizeLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

        return ({

            inputs: normalizeInputs,
            labels: normalizeLabels,

            inputMax,
            inputMin,
            labelMax,
            labelMin,
        });
    }));
};

exports.trainModel = async function(model, inputs, labels) {

    model.compile({

        optimizer: tf.train.adam(),
        loss: tf.losses.meanSquaredError,
        metrics: ['mse'],
    });

    const batchSize = 32;
    const epochs = 50;

    return( await model.fit(inputs, labels, {

        batchSize,
        epochs,
        shuffle: true,
        /*callbacks: tfvis.show.fitCallbacks(

            { name: 'Training Performance' },
            ['loss', 'mse'],
            { height: 200, callbacks: ['onEpochEnd'] }
          )*/
        })
    );

}
