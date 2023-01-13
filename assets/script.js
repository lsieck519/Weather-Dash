
function getWeather() {

var APIkey = 'b0fe402c620be3bc32a1e35b59ae76ec'
let cityname = 'New York'
let geoURL = ('http://api.openweathermap.org/geo/1.0/direct?q=' + cityname + '&limit=2&appid=' + APIkey);


var lat;
var lon;
var conditions;
var temperature;
var humidity;
var windS;


function getGeo(){
      fetch(geoURL)
          .then(function (response) {
              return response.json()       
          })
          .then(function (data) {
            lat = data[0].lat.toFixed(2)
            lon = data[0].lon.toFixed(2)
            console.log(lat)
            console.log(lon)

            let weatherURL = ('https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&units=imperial&appid=' + APIkey);
            console.log(weatherURL)

            function getForecast(){
                    fetch(weatherURL)
                        .then(function (response) {
                            return response.json()
                        })
                        .then(function (data) {
                            console.log(data);
                            conditions = data.current.weather[0].description
                            console.log(conditions)
                            let CC = document.querySelector('#CC');
                            CC.textContent = "Current Conditions: " + conditions

                            temperature = data.current.temp
                            console.log(temperature)
                            let temp = document.querySelector("#temp")
                            temp.textContent = "Temperature: " + temperature + " °F"

                            humidity = data.current.humidity
                            console.log(humidity)
                            let hum = document.querySelector("#humidity")
                            hum.textContent = "Humidity: " + humidity 

                            windS = data.current.wind_speed 
                            console.log(windS)
                            let wind = document.querySelector("#wind")
                            wind.textContent = "Wind Speed: " + windS + " mph"

                         })     
           
           
           }     getForecast()    
        })}
getGeo()

}

getWeather()

let today = new Date();
let date = document.querySelector("#date");
date.textContent = today.toDateString();

let days = [];
let daysRequired = 5
for (let i = 1; i <= daysRequired; i++) {
  days.push( moment().add(i, 'days').format('MMM Do' ) )
}
console.log(days)

day1 = days[0]
let d1 = document.querySelector('#day1');
d1.textContent = day1

day2 = days[1]
let d2 = document.querySelector('#day2');
d2.textContent = day2

day3 = days[2]
let d3 = document.querySelector('#day3');
d3.textContent = day3

day4 = days[3]
let d4 = document.querySelector('#day4');
d4.textContent = day4

day5 = days[4]
let d5 = document.querySelector('#day5');
d5.textContent = day5