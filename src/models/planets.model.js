const { parse }= require('csv-parse');
const fs = require('fs');
const path = require('path');

const planets = require('./planets.mongo')



const HabitablePlanet = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
     && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
     && planet['koi_prad'] < 1.6;
}

const loadPlanets = () => new Promise((resolve,reject) =>{
        fs.createReadStream("./kepler_data.csv")
        .pipe(parse({
            comment: '#',
            columns: true
        }))
        .on('data',async (data) => {
            if(HabitablePlanet(data)) {
                savePlanet(data);
            }
        })
        .on('error', (err) =>{
            console.log(err)
            return reject(err);
        })
        .on('end',async () => {
            const cntplanet = (await getAllPlanets()).length;
            console.log(`${cntplanet} planets are discovered which are habitable for humans`);
            return resolve();
        })
    })



async function getAllPlanets(){
    return await planets.find({});
}

async function savePlanet(planet) {
    try{
        await planets.updateOne({
            keplerName:planet.kepler_name,
        },{
            keplerName:planet.kepler_name,
        },{
            upsert:true,
        });
    } catch(e){
        console.log(e);
    }
    
}

module.exports = {
    loadPlanets,
    getAllPlanets,
} 