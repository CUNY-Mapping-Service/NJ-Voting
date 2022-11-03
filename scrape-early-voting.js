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

const url = "https://nj.gov/state/elections/vote-early-voting.shtml";

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
        //const regex = new RegExp('/\t/g')
        let evcarr = $(`#${county} tr`).text().split('*EVC')
        evcarr = evcarr.map(a=>a.replace('\t  \t','').replace('\t\t',' ').replace('-','').split('\t,\t')).filter(a=>!a.includes('\n'))
        if(evcarr[0][0].includes('Location')) evcarr.shift();
        locations[county]=evcarr
    })
    console.log(locations)
}

