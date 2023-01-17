$(document).ready(function () {

//APIkey to call openweathermap API
var APIkey = '2e64565d10dd2c4f4e922c655105f38b'

//getting value for today's date and rendering the value in the header
let today = new moment().format('MMMM D, YYYY')
let date = document.querySelector("#date");
date.textContent = today 


// For the Five Day Forecast:

// initializing empty array in order to store results of for loop; 
// only looping to get next five days, no more
let days = [];
let daysRequired = 5 
for (let count = 1; count <= daysRequired; count++) {
  days.push(moment().add(count, 'days').format('MMM Do'))
}
console.log(days)

//each day variable corresponds with that day's position in the days array, index starting at zero
//also setting the values of the corresponding elements (selected by ID) for each of the five days
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


// For weather search by city name:

// global variables
let city;
let searchedcities = []


// the purpose of this function is to go ahead and load the last searched city IF there is a value for the lastSearch key in local storage
// then we will call search function using that value as the value for the variable city 
function loadRecent() {
  let storedCity = localStorage.getItem("lastSearch");
    if ("lastSearch"){
      city = storedCity; 
      search();
    } else {return};
  }
loadRecent()


// if there are any items in the searchedCities array, they will be rendered to the page
// if there weren't any values for searchedCities, there is nothing to prepend 
// using prepend instead of append to add each new item to the top of the list rather than at the bottom
function listHistory() {
  let recentCities = JSON.parse(localStorage.getItem("searchedCities"));
  if (recentCities) {
      searchedcities = recentCities;
  } else {
      searchedcities = [];
  }
  $("#history").text(""); 
  searchedcities.forEach((city) => {
  $("#history").prepend("<tr><td>" + city + "</td></tr>");
});
}
listHistory()


// event listener for search button 
// when the search button (id="search" in html) is clicked, several functions will be called
// these functions do the work of getting the city input, using that value in the search function, 
// as well as saving that value to search history and adding it to the recent searches list 
let clickSearch = document.querySelector("#search")
clickSearch.addEventListener('click', (event) => {
  event.preventDefault();
  getCity();
  search();
  saveHistory();
  listHistory();
  $("#city-input").val("");
}
)


// retrieve user input for city search, using toUpperCase() to avoid duplicate cities caused by variances in capitalization
// the value for the variable city will be whatever the value of the input is after it is uppercased 
// the input we are referring to is specified by the #city-input id from html 
// if there isn't any input when getCity() is called (when search button is clicked), there will be an alert 
function getCity() {
  city = $("#city-input").val().toUpperCase();
  if (city && searchedcities.includes(city) !== true) {
    saveHistory();
    return city;
  } else if (!city) {
    alert("Please enter a city name");
  }
}


// if it is true that a city is NOT already in the local storage, it will be saved 
// we don't want to save duplicates bc we dont want duplicates in the recent searches list on the page 
function saveHistory() {
  if (searchedcities.includes(city) !== true){
  localStorage.setItem("lastSearch", city);
  searchedcities.push(city)
  localStorage.setItem("searchedCities", JSON.stringify(searchedcities));
  console.log(searchedcities)}
  else {return}
}

// event handler for recently searched cities in recent searches (history) table
// the text value of that row will be assigned to listedCity 
// and listedCity is used as the value for city when search() is called
$(document).on("click", "tr", (event) => {
  event.preventDefault();
  let listedCity = $(event.target).text();
  city = listedCity;
  search();
}
)

// event handler for clear button; we are removing the entire searchedCities key and all of its values from localstorage
// and by calling the next two functions, we are essentially refreshing the page to display no results for recent searches
let clear = document.querySelector('#clear')
clear.addEventListener('click', () => {
  localStorage.removeItem("searchedCities"); 
  listHistory();
}
)


// function to search for today's weather
// city and APIkey in url are both values from global variables
function search() {
  // API Documentation https://openweathermap.org/current
    let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`;
    let conditions;
    let temperature;
    let tempMax;
    let tempMin;
    let icon;
    let humidity; 
    let cityWind; 
    let cityName;
    let coordLat;
    let coordLon;
    
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
      name.textContent = "Today in " + cityName + ":" 
    
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

      //we will not add coordLat and coordLon to the webpage but we need them for the next api call 
      coordLat = data.coord.lat;
      console.log(coordLat)

      coordLon = data.coord.lon;
      console.log(coordLon)

      //calling five day forecast future function using lat and lon
      future(coordLat, coordLon);
  })
    
}
//specifying parameters needed for this function -- it will not work until we get lat and lon from the previous API results
function future(coordLat, coordLon){

    // API documentation: https://openweathermap.org/api/one-call-3
    let fiveDayURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordLat}&lon=${coordLon}&cnt=5&units=imperial&appid=${APIkey}`
    
    //initializing variables for each day and each day's weather conditions, icon, high temp, low temp, humidity, and wind speed
    //all values will be assigned using the api response data 
      let day1icon;
      let day1cond;
      let day1ht;
      let day1lt;
      let day1hum;
      let day1win;
      
      let day2icon;
      let day2cond;
      let day2ht;
      let day2lt;
      let day2hum;
      let day2win;
      
      let day3icon;
      let day3cond;
      let day3ht;
      let day3lt;
      let day3hum;
      let day3win;
      
      let day4icon;
      let day4cond;
      let day4ht;
      let day4lt;
      let day4hum;
      let day4win;
      
      let day5icon;
      let day5cond;
      let day5ht;
      let day5lt;
      let day5hum;
      let day5win;

    fetch(fiveDayURL)

    .then(function (response){
        return response.json() 
      })
      .then(function (data) {
        console.log(data);

        //day 1 of 5
        day1icon = data.daily[1].weather[0].icon;
        console.log(day1icon)
        $("#d1i").html(`<img src="http://openweathermap.org/img/wn/${day1icon}@2x.png">`);
  
        day1cond = data.daily[1].weather[0].description.toUpperCase();
        console.log(day1cond)
        let d1c = document.querySelector('#d1c');
        d1c.textContent = day1cond

        day1ht = data.daily[1].temp.max;
        console.log(day1ht)
        let d1ht = document.querySelector("#d1ht")
        d1ht.textContent = "High: " + day1ht + " °F"

        day1lt = data.daily[1].temp.min;
        console.log(day1lt)
        let d1lt = document.querySelector("#d1lt")
        d1lt.textContent = "Low: " + day1lt + " °F"

        day1hum = data.daily[1].humidity;
        console.log(day1hum)
        let d1h = document.querySelector("#d1h")
        d1h.textContent = "Humidity: " + day1hum + "%"

        day1win = data.daily[1].wind_speed;
        console.log(day1win)
        let d1ws = document.querySelector("#d1ws")
        d1ws.textContent = "Wind: " + day1win + " mph"

        //day 2 of 5
        day2icon = data.daily[2].weather[0].icon;
        console.log(day2icon)
        $("#d2i").html(`<img src="http://openweathermap.org/img/wn/${day2icon}@2x.png">`);

        day2cond = data.daily[2].weather[0].description.toUpperCase();
        console.log(day2cond)
        let d2c = document.querySelector('#d2c');
        d2c.textContent = day2cond

        day2ht = data.daily[2].temp.max;
        console.log(day2ht)
        let d2ht = document.querySelector("#d2ht")
        d2ht.textContent = "High: " + day2ht + " °F"

        day2lt = data.daily[2].temp.min;
        console.log(day2lt)
        let d2lt = document.querySelector("#d2lt")
        d2lt.textContent = "Low: " + day2lt + " °F"

        day2hum = data.daily[2].humidity;
        console.log(day2hum)
        let d2h = document.querySelector("#d2h")
        d2h.textContent = "Humidity: " + day2hum + "%"

        day2win = data.daily[2].wind_speed;
        console.log(day2win)
        let d2ws = document.querySelector("#d2ws")
        d2ws.textContent = "Wind: " + day2win + " mph"


        // day 3 of 5
        day3icon = data.daily[3].weather[0].icon;
        console.log(day3icon)
        $("#d3i").html(`<img src="http://openweathermap.org/img/wn/${day3icon}@2x.png">`);

        day3cond = data.daily[3].weather[0].description.toUpperCase();
        console.log(day3cond)
        let d3c = document.querySelector('#d3c');
        d3c.textContent = day3cond

        day3ht = data.daily[3].temp.max;
        console.log(day3ht)
        let d3ht = document.querySelector("#d3ht")
        d3ht.textContent = "High: " + day3ht + " °F"

        day3lt = data.daily[3].temp.min;
        console.log(day3lt)
        let d3lt = document.querySelector("#d3lt")
        d3lt.textContent = "Low: " + day3lt + " °F"

        day3hum = data.daily[3].humidity;
        console.log(day3hum)
        let d3h = document.querySelector("#d3h")
        d3h.textContent = "Humidity: " + day3hum + "%"

        day3win = data.daily[3].wind_speed;
        console.log(day3win)
        let d3ws = document.querySelector("#d3ws")
        d3ws.textContent = "Wind: " + day3win + " mph"

        // day 4 of 5
        day4icon = data.daily[4].weather[0].icon;
        console.log(day4icon)
        $("#d4i").html(`<img src="http://openweathermap.org/img/wn/${day4icon}@2x.png">`);

        day4cond = data.daily[4].weather[0].description.toUpperCase();
        console.log(day4cond)
        let d4c = document.querySelector('#d4c');
        d4c.textContent = day4cond

        day4ht = data.daily[4].temp.max;
        console.log(day4ht)
        let d4ht = document.querySelector("#d4ht")
        d4ht.textContent = "High: " + day4ht + " °F"

        day4lt = data.daily[4].temp.min;
        console.log(day4lt)
        let d4lt = document.querySelector("#d4lt")
        d4lt.textContent = "Low: " + day4lt + " °F"

        day4hum = data.daily[4].humidity;
        console.log(day4hum)
        let d4h = document.querySelector("#d4h")
        d4h.textContent = "Humidity: " + day4hum + "%"

        day4win = data.daily[4].wind_speed;
        console.log(day4win)
        let d4ws = document.querySelector("#d4ws")
        d4ws.textContent = "Wind: " + day4win + " mph"

        // day 5 of 5
        day5icon = data.daily[5].weather[0].icon;
        console.log(day5icon)
        $("#d5i").html(`<img src="http://openweathermap.org/img/wn/${day5icon}@2x.png">`);

        day5cond = data.daily[5].weather[0].description.toUpperCase();
        console.log(day5cond)
        let d5c = document.querySelector('#d5c');
        d5c.textContent = day5cond

        day5ht = data.daily[5].temp.max;
        console.log(day5ht)
        let d5ht = document.querySelector("#d5ht")
        d5ht.textContent = "High: " + day5ht + " °F"

        day5lt = data.daily[5].temp.min;
        console.log(day5lt)
        let d5lt = document.querySelector("#d5lt")
        d5lt.textContent = "Low: " + day5lt + " °F"

        day5hum = data.daily[5].humidity;
        console.log(day5hum)
        let d5h = document.querySelector("#d5h")
        d5h.textContent = "Humidity: " + day5hum + "%"

        day5win = data.daily[5].wind_speed;
        console.log(day5win)
        let d5ws = document.querySelector("#d5ws")
        d5ws.textContent = "Wind: " + day5win + " mph"

  })

}})
