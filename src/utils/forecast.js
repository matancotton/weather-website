
const request = require('request')


const forecast = (longtitude,latitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=b44181c56688bd2cb3e572212ba9e69d&query=${latitude},${longtitude}&units=m`
    request({url,json:true},(err,{body})=>{
        if (err)
            callback('not able to connect to the server',undefined)
        else if (body.error)
            callback('not a valid location',undefined)
        else {
            const {weather_descriptions,temperature,feelslike,humidity} = body.current
            callback(undefined,`${weather_descriptions[0]}. It is currently ${temperature} degrees out, feels like ${feelslike} degrees and the humidity is ${humidity}%.`)
        }
            
    })
}

module.exports = forecast