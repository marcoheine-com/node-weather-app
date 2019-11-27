// OpenWeatherMap API http://openweathermap.org/API
const http = require('http');

// Print out message
const printMessage = (city, description, temperature,tempMin, tempMax, wind, clouds) => {
  const message = `Currently, ${city} has ${description}, a temperature of ${temperature} degrees Celsius, a wind speed of ${wind} m/s and clouds covering ${clouds}% of the sky. The max Temperature today was ${tempMax} degrees Celsius and the min temperature was ${tempMin} degrees Celsius.`;
  
  console.log(message);
};

//Print out error
const printError = (error) => console.error(error.message);

const getWeather = (city) => {
    // API Key
    const API_KEY = '';
    const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?q=';

    // Connect to the API
    const request = http.get(`${BASE_URL}${city}&units=metric&APPID=${API_KEY}`, response => {
        let body = '';
        // Read data
        response.on('data', chunk => {
            body += chunk;
        });
        response.on('end', () => {
          if (response.statusCode === 200) {
            try {
            // Parse the data
            const weather = JSON.parse(body);
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

const city = process.argv.slice(2);
getWeather(city);