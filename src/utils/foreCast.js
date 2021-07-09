const request = require('request')

const getForeCast = ({lat , lon , name} , callback)=>{
    const forCastURL = `http://api.openweathermap.org/data/2.5/find?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&cnt=1&appid=886bb38efe659c46eac3825623ae4435&units=metric`
    request({url : forCastURL , json : true} , (error , responce )=>{
        if (error){
            callback(`Can't find Weather service!` , undefined)
        }else if (responce.body.cod === '400'){
            const message = {
                error : "Unable to find this place try something else"
            }
            callback(undefined , message)
        }else {
            
            const data = {
                name,
                temp : responce.body.list[0].main.temp,
                descripe : responce.body.list[0].weather[0].description
            }
            callback(undefined , data)
        }
    })
}


module.exports = {
    getForeCast: getForeCast
}