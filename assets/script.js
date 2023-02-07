// Variables
var now = dayjs().format("HH");
var today = dayjs();
var apiKey = "3b514f9dc14d94faaf7e8d6ab26cccc1";
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
var searchButton = document.getElementById("search-button");
var searchedCity = document.getElementById("city-search").value;
var currentCityName = document.getElementById("current-city-display");
var temp = document.getElementById("current-temp-display");
var wind = document.getElementById("current-wind-display");
var humidity = document.getElementById("current-humidity-display");
var icon = document.getElementById("icon");
var cityList = document.getElementById("city-list");


// When search button is clicked, perform the search function
searchButton.addEventListener("click", currentSearchDisplay);


// Current weather display function
function currentSearchDisplay(event) {
    event.preventDefault();

    //Alert if no city name entered
    //Select form element by name attribute and grab value
    var citySearch = document.getElementById("city-search").value;


    //Alert if no city name entered
    if (!citySearch) {
        alert("Please enter a city name.");
        return;
    }

    // Grab search input for city name
    var searchedCity = document.getElementById("city-search").value || event.target.innerText;
    searchHistory.push(searchedCity)


    // Send search history to local storage and stringify
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    // console.log(searchHistory);


    // Fetch
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + apiKey;

    fetch(queryURL)
        .then(response => response.json())
        .then(data => {

            // Current city display
            var cityName = data['name'];
            var weatherIcon = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            var tempIndex = data['main']['temp'];
            var windIndex = data['wind']['speed'];
            var humidityIndex = data['main']['humidity'];

            currentCityName.innerHTML = cityName + " " + "(" + today.format("M/D/YYYY") + ")";
            icon.innerHTML = weatherIcon;
            icon.setAttribute('src', weatherIcon);
            temp.innerHTML = "Temp: " + Number(1.8 * (tempIndex - 273) + 32).toFixed(1) + "°F";
            wind.innerHTML = "Wind: " + windIndex + " MPH";
            humidity.innerHTML = "Humidity: " + humidityIndex + "%";

        })

    //Add search result to search history buttons
    $(cityList).append('<li id="history">' + searchedCity + '</li>');

    //Clear the form after submit button click
    $('input[name="city-search-name"]').val("");

}





