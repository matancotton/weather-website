const request =require('request')
const axios = require('axios')

const geocode = (adress, callback) =>{
    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoibWF0YW5jb3R0b24iLCJhIjoiY2tmc2YxMjVqMGM2bjJzc3ZvdmY5YWJ1aSJ9.fbU-apWpESrpI7XdV4F7ig&limit=1`
    request({url,json: true},(error,{body})=>{
        const {features} = body
        if (error){
            callback('unable to connect to the server',undefined)
        } else if (features.length===0) {
            callback('unable to find a location',undefined)
        }
        else {
            callback(undefined,{
                longtitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode