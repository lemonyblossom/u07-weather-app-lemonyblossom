import fs from 'fs';
import readline from 'readline';

const inputFile = 'data/cities500.txt'; 
const outputFile = 'data/cities.json';  
const filteredOutputFile = 'public/filteredCities.json'; 

const readInterface = readline.createInterface({
    input: fs.createReadStream(inputFile),
    console: false
});

const cities = [];

readInterface.on('line', function (line) {
    const columns = line.split('\t');
    const city = {
        id: columns[0],
        name: columns[1],
        altName: columns[2],
        altNames: columns[3].split(','),
        lat: parseFloat(columns[4]),
        lon: parseFloat(columns[5]),
        featureClass: columns[6],
        featureCode: columns[7],
        country: columns[8],
        cc2: columns[9],
        admin1: columns[10],
        admin2: columns[11],
        admin3: columns[12],
        admin4: columns[13],
        population: parseInt(columns[14], 10),
        elevation: parseInt(columns[15], 10) || null,
        dem: parseInt(columns[16], 10),
        timezone: columns[17],
        modificationDate: columns[18]
    };

    // Add the city to the list
    cities.push(city);
});

readInterface.on('close', function () {
    // Write all cities to cities.json
    fs.writeFileSync(outputFile, JSON.stringify(cities, null, 2));
    console.log('Cities data has been written to', outputFile);

    // Filter cities based on some criteria
    const filteredCities = cities.filter(city => city.population > 50000); // Example: filter by population size

    // Write filtered cities to filteredCities.json
    fs.writeFileSync(filteredOutputFile, JSON.stringify(filteredCities, null, 2));
    console.log('Filtered cities data has been written to', filteredOutputFile);
});
