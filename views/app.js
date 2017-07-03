const yargs=require('yargs');

const geocode=require('./geocode/geocode');
const weather=require('./weather/weather');
const argv=yargs
   .options({
   a:{
    demand:true,
    alias:'address',
    describe:'Address to fecth weather for',
    string:true
   }

   })

   .help()
   .alias('help','h')
   .argv;

   geocode.geocodeAddress(argv.address,(erroMessgae,results)=>{
     if(erroMessgae){

       console.log(erroMessgae);
     } else {
      console.log(results.address);
      weather.getWeather(results.latitude,results.longitude,(erroMessgae,weatherResult)=>{
        if(erroMessgae){

           console.log(erroMessgae);
         } else {
           console.log(`it is currently ${weatherResult.temperature}. it's feel like ${weatherResult.apparentTemperature}.` );
         }

      });

     }
   });
