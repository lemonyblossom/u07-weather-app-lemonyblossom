import fs from 'fs';
import readline from 'readline';

const inputFile = 'data/cities500.txt'; 
const outputFile = 'data/cities.json';  

const readInterface = readline.createInterface({
    input: fs.createReadStream(inputFile),
    console: false
});

const cities = [];

readInterface.on('line', function (line) {
    const columns = line.split('\t');
    const population = parseInt(columns[14], 10);
    
    if (population > 100000) {
        const city = {
            name: columns[1],
            lat: parseFloat(columns[4]),
            lon: parseFloat(columns[5]),
            country: columns[8],
            state: columns[10] || ''
        };
        cities.push(city);
    }
});

readInterface.on('close', function () {
    fs.writeFileSync(outputFile, JSON.stringify(cities, null, 2));
    console.log('Cities data has been written to', outputFile);
});
