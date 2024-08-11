import * as fs from 'fs';
import * as readline from 'readline';
import { Writable } from 'stream';

interface City {
   id: string;
   name: string;
   altName: string;
   altNames: string[];
   lat: number;
   lon: number;
   featureClass: string;
   featureCode: string;
   country: string;
   cc2: string;
   admin1: string;
   admin2: string;
   admin3: string;
   admin4: string;
   population: number;
   elevation: string;
   dem: string;
   timezone: string;
   modificationDate: string;
}

async function parseCities() {
   const inputFile = 'data/cities500.txt';
   const outputFile = 'public/filteredCities.json';
   const cities: City[] = [];

   const readStream = fs.createReadStream(inputFile);
   const writeStream = fs.createWriteStream(outputFile);

   const rl = readline.createInterface({
      input: readStream,
      output: new Writable({
         write(chunk, encoding, callback) {
            callback();
         }
      }),
      terminal: false
   });

   rl.on('line', (line) => {
      const [
         id, name, altName, altNames, lat, lon,
         featureClass, featureCode, country, cc2,
         admin1, admin2, admin3, admin4, population,
         elevation, dem, timezone, modificationDate
      ] = line.split('\t');

      cities.push({
         id,
         name,
         altName,
         altNames: altNames.split(','),
         lat: parseFloat(lat),
         lon: parseFloat(lon),
         featureClass,
         featureCode,
         country,
         cc2,
         admin1,
         admin2,
         admin3,
         admin4,
         population: parseInt(population),
         elevation,
         dem,
         timezone,
         modificationDate
      });
   });

   rl.on('close', () => {
      writeStream.write(JSON.stringify(cities, null, 2));
      writeStream.end();
   });

   writeStream.on('finish', () => {
      console.log('Filtered cities have been written to', outputFile);
   });
}

parseCities().catch(console.error);
