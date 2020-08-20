const tf =require("@tensorflow/tfjs-node");
const { func } = require("@tensorflow/tfjs-data");
const tfjsvis = require("@tensorflow/tfjs-vis")
const fs = require("fs").promises;
const fetch = require("node-fetch");

async function getData() {

    const carsDataReq = await fetch("https://storage.googleapis.com/tfjs-tutorials/carsData.json");
    const carsData = await carsDataReq.json();
    const cleaned = carsData.map( car => ({

        mpg: car.Miles_per_Gallon,
        horsepower: car.Horsepower,
    })).filter(car => (car.mpg != null && car.horsepower != null));

    console.log(cleaned);

    return (cleaned);
}

async function run() {

    const data = await getData();
    const values = data.map(d => ({

        x: d.horsepower,
        y: d.mpg,
    }));

    console.log(values);
}

run();