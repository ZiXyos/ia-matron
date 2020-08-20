const tf = require("@tensorflow/tfjs-node");
const { func } = require("@tensorflow/tfjs-data");
const fs = require("fs").promises;
const fetch = require("node-fetch");

const trainner = require("./trainning");
const modeliser = require("./model")

async function getData() {

    const carsDataReq = await fetch("https://storage.googleapis.com/tfjs-tutorials/carsData.json");
    const carsData = await carsDataReq.json();
    const cleaned = carsData.map( car => ({

        mpg: car.Miles_per_Gallon,
        horsepower: car.Horsepower,
    })).filter(car => (car.mpg != null && car.horsepower != null));

    return (cleaned);
}

async function run() {

    const data = await getData();
    const tensorData = trainner.convertToTensor(data);
    const {inputs, labels} = tensorData;
    const model = modeliser.createModel();

    const values = data.map(d => ({

        x: d.horsepower,
        y: d.mpg,
    }));

    //console.log(values);
    await trainner.trainModel(model, inputs, labels);
    console.log('Done Training 🏋🏾‍♂️💪🏾');
}

run();