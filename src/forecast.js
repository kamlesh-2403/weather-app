const request = require('request')
// // we sill pass two arguments 1 is the url other is the callback function
// // describing what to do with the response and error generation 
// // if we didnt got the response (a callback function)

const forecast = (latitude,longitude,callback) => {
    
var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&units=metric&appid=41f7aa18fad0d6b97b99c26610edc67e'

request({ url: url,json:true }, (error, response) => {
    if(error){
        callback('unable to access ')
    }else if(response.body.length===0){
        callback('unable to access the destination')
    }    
    else{
        callback(undefined,{
            temp:response.body.main.temp,
            humidity:response.body.main.humidity
        })
    }        
})
}
module.exports = forecast
