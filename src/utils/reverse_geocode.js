const request = require('request');

const reverse_geocode = (latitude,longitude,callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+longitude+","+latitude+".json?types=locality&access_token=pk.eyJ1Ijoia2VzaGF2LW11bmRyYSIsImEiOiJjazlneTZlNjIwcGxkM210YjMwbHNqcjJkIn0.KNmYlZRg9Wk0w8-5kzKzeg&limit=1";
    
    request({url,json : true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location Service !!!',undefined)
        }else if(body.features.length === 0){
            callback('Unable to map your cordinates.Try another location',undefined)
        }else{
            callback(undefined,{
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = reverse_geocode;