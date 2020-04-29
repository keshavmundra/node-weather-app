const request = require('request')

const forecast = (latitude,longitude,callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=1e8e8d4ac86bbb4d831479a0c788b3a1&query="+latitude+","+longitude;
    request({url,json : true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather Service !!!',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined);
        }else{
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out.it feels like '+body.current.feelslike+' degree out.'+'The humidity in area : '+body.current.humidity+'%');
        }
    });
}

module.exports = forecast;