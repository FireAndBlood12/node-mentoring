const { pipeline } = require('stream');
const fs = require('fs');
const csv = require('csvtojson');

const csvFilePath = './csv/books.csv';
const resultFilePath = './result/books.txt';

const readStream = fs.createReadStream(csvFilePath, {
    highWaterMark: 10
});
const writeStream = fs.createWriteStream(resultFilePath, {
    highWaterMark: 10
});

pipeline(
    readStream,
    csv(),
    writeStream,
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    }
);
