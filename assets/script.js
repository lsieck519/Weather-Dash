//WEATHER RELATED JS//

var APIkey = '2e64565d10dd2c4f4e922c655105f38b'

let city;

function getCity() {
  city = $("#city-input").val();
  if (city) {saveToLocalStorage();
  } else {return}
}
getCity()

function saveToLocalStorage() {
  localStorage.setItem("lastSearch", city);
}

function loadRecentCity() {
  const storedCity = localStorage.getItem("lastSearch");
    if ("lastSearch"){
      city = storedCity; search()
    } else; {return}
  }
loadRecentCity()
  

$("#search").on("click",(x) => {
  x.preventDefault();
  getCity();
  search();
  future();
  $("#city-input").val("Search for another city");
})
;

let conditions;
let temperature;
let tempMax;
let tempMin;
let icon;
let humidity; 
let cityWind; 
let cityName;

// need to get lat and lon from weatherAPI in order to use in 5-day
let coordLat;
let coordLon;

function search() {
  // API Documentation https://openweathermap.org/current
    let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`;
    
    fetch(weatherAPI)
    
    .then(function (response){
      return response.json() 
    })
    .then(function (data) {
      console.log(data);

      icon = data.weather[0].icon
      console.log(icon)
      $("#icon").html(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`);

      cityName = data.name
      console.log(cityName)
      let name = document.querySelector('#city-name');
      name.textContent = "Today's Weather in " + cityName + ":" 
    
      conditions = data.weather[0].description.toUpperCase();
      console.log(conditions)
      let CC = document.querySelector('#conditions');
      CC.textContent = conditions

      temperature = data.main.temp.toFixed(1);
      console.log(temperature)
      let temp = document.querySelector("#temperature")
      temp.textContent = "Temperature: " + temperature + " °F"

      tempMax = data.main.temp_max.toFixed(1);
      console.log(tempMax)
      let max = document.querySelector("#tempMax")
      max.textContent = "High: " + tempMax + " °F"

      tempMin = data.main.temp_min.toFixed(1);
      console.log(tempMin)
      let min = document.querySelector("#tempMin")
      min.textContent = "Low: " + tempMin + " °F"

      humidity = data.main.humidity;
      console.log(humidity)
      let hum = document.querySelector("#humidity")
      hum.textContent = "Humidity: " + humidity + "%"

      cityWind = data.wind.speed;
      console.log(cityWind)
      let wind = document.querySelector("#wind")
      wind.textContent = "Wind Speed: " + cityWind + " MPH"

      coordLat = data.coord.lat;
      console.log(coordLat)

      coordLon = data.coord.lon;
      console.log(coordLon)
   })     
  }
    
let today = new moment().format('MMMM D, YYYY')
let date = document.querySelector("#date");
date.textContent = today



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


let day1ht;
let day1lt;
let day1hum;
let day1win;

function future(){
    // API documentation: https://openweathermap.org/api/one-call-3
    let fiveDayURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordLat}&lon=${coordLon}&cnt=5&units=imperial&appid=2e64565d10dd2c4f4e922c655105f38b`
    
    fetch(fiveDayURL)

    .then(function (response){
        return response.json() 
      })
      .then(function (data) {
        console.log(data);
      });

      let day1cond = "test";
      console.log(day1cond)

    }
