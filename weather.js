// OpenWeatherMap API http://openweathermap.org/API
var http = require('http');

// Print out message
function printMessage(city, description, temperature,tempMin, tempMax, wind, clouds){
    var message = 'Currently, ' + city + ' has ' + description + 
            ', a temperature of ' + temperature + ' degrees Celsius' +
            ', a wind speed of ' + wind + 
            ' m/s and clouds covering ' + clouds + '% of the sky.' +
            ' The max Temperature today was ' + tempMax + ' degrees Celsius' +
            ' and the min temperature was ' + tempMin + ' degrees Celsius.';
    console.log(message);
}

//Print out error
function printError(error){
    console.error(error.message);
}

function getWeather(city){
    // API Key
    var key = '32dcecf64758538772770c237d4eec22';

    // Connect to the API
    var request = http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&APPID=' + key, function(response){
        var body = '';
        // Read data
        response.on('data', function(chunk){
            body += chunk;
        });
        response.on('end', function(){
          if (response.statusCode === 200) {
            try {
            // Parse the data
            var weather = JSON.parse(body);
            // Print the data
            printMessage(weather.name, weather.weather[0].description, weather.main.temp.toFixed(1),
            weather.main.temp_min, weather.main.temp_max, weather.wind.speed, weather.clouds.all);
            } catch(error) {
              // Parse Error 
              printError(error);
            }
          } else {
              // Status Code Error
              printError({message: 'There was an error getting the weather for ' + city + '. (' + http.STATUS_CODES[response.statusMessage] + ')'});
            }
        });
    });
    request.on('error', printError);
}

var city = process.argv.slice(2);
getWeather(city);