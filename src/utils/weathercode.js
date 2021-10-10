const request= require('request'); 



 const weathercode = (latitude, longitude, callback) => {
     const url =  'http://api.weatherstack.com/current?access_key=6bebf88a031842107de96ff0f9d648f2&query='+ longitude +','+ latitude +'&units=m';
     
    
     request({ url, json: true }, (error, {body}) => {
     if (error) {
     callback('Unable to connect to weather services!', undefined)
     } else if (body.error) {
     callback('Unable to find weather. Try another search.',undefined)
     } else {
     callback(undefined, {
     description: body.current.weather_descriptions[0],
     temperature:   body.current.temperature,
     feelsLike: body.current.feelslike
     })
     }
     })
    }


    module.exports= weathercode;