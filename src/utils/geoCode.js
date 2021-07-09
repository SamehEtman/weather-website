const request = require('request')

const getGeoCode = (address , callback)=>{
    const geoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2FtZWg5OCIsImEiOiJja3F0Znd1aXowN25jMm9vMmxyaW0zajU3In0.eXJf1wSUAFHVmiiH5rTNDw&limit=1`
    request({url: geoCodeURL , json: true} , (error , responce) =>{
        if (error){
            callback('Unable to connect to location service!' , undefined);
        }else if (responce.body.features.length === 0){
            
            callback(undefined , "Cant't find location!");
        }else {
            const data = {
                name : responce.body.features[0].place_name,
                lat : responce.body.features[0].center[1],
                lon : responce.body.features[0].center[0],
            }
            callback(undefined , data)
        }
    })
}

module.exports = {
    getGeoCode:getGeoCode
}