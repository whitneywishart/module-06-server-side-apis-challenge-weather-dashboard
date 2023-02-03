//Declare variables
//OpenWeather API key
var apiKey = "3b514f9dc14d94faaf7e8d6ab26cccc1";

//variable to store user input for latitude and longitude, no initial value assignments
var lat;
var lon;

//openWeather query URL
var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

//call API
fetch(queryURL);

