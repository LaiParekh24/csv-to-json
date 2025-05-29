const fs = require('fs');
const path = require('path');

const RECORD_COUNT = 50000;
const FILE_PATH = path.join(__dirname, 'sample.csv');

const headers = [
  'name.firstName',
  'name.lastName',
  'age',
  'address.line1',
  'address.line2',
  'address.city',
  'address.state',
  'gender'
];

function generateRow(i) {
  return [
    `First${i}`,
    `Last${i}`,
    (Math.floor(Math.random() * 70) + 10).toString(),
    `Address ${i} Line1`,
    `Address ${i} Line2`,
    `City${i % 100}`,
    `State${i % 50}`,
    i % 2 === 0 ? 'male' : 'female'
  ].join(',');
}

function generateCSV() {
  const stream = fs.createWriteStream(FILE_PATH);
  stream.write(headers.join(',') + '\n');
  for (let i = 1; i <= RECORD_COUNT; i++) {
    stream.write(generateRow(i) + '\n');
  }
  stream.end(() => console.log(`sample.csv with ${RECORD_COUNT} records created.`));
}

generateCSV();
