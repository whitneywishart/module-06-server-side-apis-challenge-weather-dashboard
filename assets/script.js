//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history

//global variable for current time
var now = dayjs().format("HH");
var today = dayjs();

//add current date at top of page
$("#current-day").text(today.format("MMM D, YYYY, h:mm A"));


//OpenWeather API key
var apiKey = "3b514f9dc14d94faaf7e8d6ab26cccc1";

//City search field and previous city search list variables
var searchForm = $("#city-form");
var cityList = $("#city-list");
var currentCityDisplay = $("#current-city-display");


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
    currentCityDisplay.append(" " + citySearch + " " + "(" + today.format("M/D/YYYY") + ")");


    //Clear the form after submit button click
    $('input[name="city-search-name"]').val("");
    // console.log(citySearch);


    //FETCH WEATHER
    //OpenWeather query URL
    var queryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + citySearch + "&appid=" + apiKey;

    var iconURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + apiKey;

    fetch(queryURL)
        .then((response) => response.json())
    // .then((data) => console.log(data));

    fetch(iconURL)
        .then((response) => response.json())
        .then((data) => console.log(data));

    //get local storage and display on expected row
    $("#city-name").val(localStorage.getItem("City"));

}

//List of previously searched cities as buttons
searchForm.on("submit", renderSearchEntry);




