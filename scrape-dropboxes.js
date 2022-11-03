const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const {
	start
} = require('repl');

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const counties = [
    'atlantic',
    'bergen',
    'Burlington',
    'Camden',
    'capemay',
    'Cumberland',
    'essex',
    'gloucester',
    'hudson',
    'hunterdon',
    'mercer',
    'middlesex',
    'monmouth',
    'morris',
    'Ocean',
    'Passaic',
    'Salem',
    'Somerset',
    'Sussex',
    'Union',
    'Warren'
]

let _date = new Date();

const url = "https://nj.gov/state/elections/vote-secure-drop-boxes.shtml";

function main(){
    scrape(url)
}


main();

async function scrape(_url){
    const html = await rp(_url);
	const $ = cheerio.load(html);
    let locations = {}
    counties.forEach(county=>{
        locations[county] = [];
        let evcarr = $('table.table tbody tr').text();
        evcarr = evcarr
        .split('\t  \t')
        .map(l => l.split('\t\t').map(_l=>_l.split('\t \t')[0].replace('\t',', ')))
            
                //.join(',')
               // .split(', ,')[0]));


        locations[county]=evcarr
    })
    console.log(locations)
}

