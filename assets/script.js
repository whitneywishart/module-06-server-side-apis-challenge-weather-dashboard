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


    // Fetch current
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + apiKey;


    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            // console.log(data);

            // Current city display
            var cityName = data['name'];
            var weatherIcon = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            var tempIndex = data['main']['temp'];
            var windIndex = data['wind']['speed'];
            var humidityIndex = data['main']['humidity'];
            var lat = data['coord']['lat'];
            var lon = data['coord']['lon'];


            currentCityName.innerHTML = cityName + " " + "(" + today.format("M/D/YYYY") + ")";
            icon.innerHTML = weatherIcon;
            icon.setAttribute('src', weatherIcon);
            temp.innerHTML = "Temp: " + Number(1.8 * (tempIndex - 273) + 32).toFixed(1) + "°F";
            wind.innerHTML = "Wind: " + windIndex + " MPH";
            humidity.innerHTML = "Humidity: " + humidityIndex + "%";



            var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

            fetch(forecastURL)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);

                    // 5 day forecast DOM variables
                    var forecastDayOneCityDate = document.getElementById("forecast-date-one");
                    var forecastDayTwoCityDate = document.getElementById("forecast-date-two");
                    var forecastDayThreeCityDate = document.getElementById("forecast-date-three");
                    var forecastDayFourCityDate = document.getElementById("forecast-date-four");
                    var forecastDayFiveCityDate = document.getElementById("forecast-date-five");
                    var forecastDayOneIcon = document.getElementById("day-one-icon");
                    var forecastDayOneTemp = document.getElementById("day-one-temp");
                    var forecastDayOneWind = document.getElementById("day-one-wind");
                    var forecastDayOneHumidity = document.getElementById("day-one-humidity");

                    // 5 day forecast fetch dates variables
                    var forecastDateOneTimeStamp = data['list'][4]['dt']
                    var forecastDateTwoTimeStamp = data['list'][15]['dt']
                    var forecastDateThreeTimeStamp = data['list'][20]['dt']
                    var forecastDateFourTimeStamp = data['list'][28]['dt']
                    var forecastDateFiveTimeStamp = data['list'][38]['dt']


                    // Convert 5 day forecast dates
                    var forecastOneConvert = new Date(forecastDateOneTimeStamp * 1000);
                    var forecastDayOneDate = (forecastOneConvert.toLocaleDateString());

                    var forecastTwoConvert = new Date(forecastDateTwoTimeStamp * 1000);
                    var forecastDayTwoDate = (forecastTwoConvert.toLocaleDateString());

                    var forecastThreeConvert = new Date(forecastDateThreeTimeStamp * 1000);
                    var forecastDayThreeDate = (forecastThreeConvert.toLocaleDateString());

                    var forecastFourConvert = new Date(forecastDateFourTimeStamp * 1000);
                    var forecastDayFourDate = (forecastFourConvert.toLocaleDateString());

                    var forecastFiveConvert = new Date(forecastDateFiveTimeStamp * 1000);
                    var forecastDayFiveDate = (forecastFiveConvert.toLocaleDateString());

                    // Get day one icon
                    var forecastDateOneIcon = 'https://openweathermap.org/img/w/' + data.list[4].weather[0].icon + '.png';

                    //Display day one forecast info
                    forecastDayOneCityDate.innerHTML = forecastDayOneDate;
                    forecastDayOneIcon.setAttribute('src', forecastDateOneIcon);
                    forecastDayOneTemp.innerHTML = "Temp: " + Number(1.8 * (tempIndex - 273) + 32).toFixed(1) + "°F";
                    forecastDayOneWind.innerHTML = "Wind: " + windIndex + " MPH";
                    forecastDayOneHumidity.innerHTML = "Humidity: " + humidityIndex + "%";




                    //Display day two forecast info
                    forecastDayTwoCityDate.innerHTML = forecastDayTwoDate;
                    forecastDayThreeCityDate.innerHTML = forecastDayThreeDate;
                    forecastDayFourCityDate.innerHTML = forecastDayFourDate;
                    forecastDayFiveCityDate.innerHTML = forecastDayFiveDate;
                })


            //Add search result to search history buttons
            $(cityList).append('<li id="history">' + searchedCity + '</li>');

            //Clear the form after submit button click
            $('input[name="city-search-name"]').val("");

        }

        )
}





