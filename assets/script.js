//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history


//OpenWeather API key
var apiKey = "3b514f9dc14d94faaf7e8d6ab26cccc1";

//City search field and previous city search list variables
var searchForm = $('#city-form');
var cityList = $('#city-list');


//Function to process search entries
function renderSearchEntry(event) {
    event.preventDefault();

    //Select form element by name attribute and grab value
    var citySearch = document.querySelector('input[name="city-search-name"]').value;


    //Alert if no city name entered
    if (!citySearch) {
        alert("Please enter a city name.");
        return;
    }

    
    //Add searched cities to local storage
    localStorage.setItem("City", citySearch);
    
    //Add search result to search history buttons
    cityList.append('<li id="history">' + citySearch + '</li>');

    //Clear the form after submit button click
    $('input[name="city-search-name"]').val("");
    console.log(citySearch);


}

//List of previously searched cities as buttons
searchForm.on("submit", renderSearchEntry);


//variable to store user input for latitude and longitude
var lat;
var lon;

//openWeather query URL
var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

console.log(queryURL);
//call API
// fetch(queryURL);



