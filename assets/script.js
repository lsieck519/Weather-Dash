var APIkey = 'b0fe402c620be3bc32a1e35b59ae76ec'

let cityname; 
let searches = []

let geoURL = ('http://api.openweathermap.org/geo/1.0/direct?q=' + cityname + '&limit=1&appid=' + APIkey);

// need coordinates from geo in order to call main weather api

let weatherURL = ('https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&appid=' + APIkey)