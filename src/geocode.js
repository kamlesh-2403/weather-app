const request = require('request')


const geocode = (address,callback) =>{
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2FtbGVzaC0xNjExIiwiYSI6ImNrZGQ3a2M2MDE5YnIyem1ocWhsNHVscXMifQ.sq-dVHMNN-msEa0NrlxAQA'
   
    request({ url:url ,json: true }, (error,response)=>{
    if(error){
        callback('unable to connect the place',undefined)
    }else if(response.body.features.length===0){
        callback('no such place exist',undefined)
    }else{
        callback(undefined,{
            latitude : response.body.features[0].center[1],
            longitude : response.body.features[0].center[0],
            location: response.body.features[0].place_name
        })
    }
    })
}
module.exports = geocode