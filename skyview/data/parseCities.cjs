"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const csv = __importStar(require("csv-parser"));
const results = [];
fs.createReadStream('data/cities500.txt')
    .pipe(csv({ separator: '\t' }))
    .on('data', (data) => {
    console.log('Read data:', data); // Log each row read from the file
    // Filter to only include unique city names with necessary fields
    if (data.feature_class === 'P') { // 'P' stands for populated place
        results.push({
            name: data.name,
            lat: parseFloat(data.latitude),
            lon: parseFloat(data.longitude),
            country: data.country_code,
            state: data.admin1_code,
        });
    }
})
    .on('end', () => {
    console.log('Finished reading file. Number of cities:', results.length);
    if (results.length > 0) {
        fs.writeFileSync('public/filteredCities.json', JSON.stringify(results, null, 2));
        console.log('Filtered city data has been written to public/filteredCities.json');
    }
    else {
        console.log('No city data found.');
    }
})
    .on('error', (error) => {
    console.error('Error reading or parsing file:', error);
});
