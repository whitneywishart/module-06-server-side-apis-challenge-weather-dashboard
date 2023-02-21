// Global variables
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
var historyCityList = document.getElementById("city-list");
var lastCity = searchHistory[searchHistory.length - 1];
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + lastCity + "&appid=" + apiKey;
var modalBtn = document.getElementById("modal-btn")
var modal = document.querySelector(".modal")
var closeBtn = document.querySelector(".close-btn")





// Create and persist search history buttons
function createHistoryButtons() {
    for (var i = 0; i < searchHistory.length; i++) {
        var createHistoryButton = document.createElement("button");
        createHistoryButton.textContent = searchHistory[i]
        historyCityList.appendChild(createHistoryButton);

    }
}

createHistoryButtons();


// Listen for search button click and add to local storage
searchButton.addEventListener("click", addToStorage);


// Add to storage function
function addToStorage() {
    //Alert if no city name entered
    var citySearch = document.getElementById("city-search").value;
    if (!citySearch) {
        alert("Please enter a city name.");
        return;
    }
    // Grab search input for city name and add to local storage
    var searchedCity = document.getElementById("city-search").value;
    searchHistory.push(searchedCity)

    // Send search history to local storage and stringify
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

}


// Fetch, display and persist last searched weather
function weather() {
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
            temp.innerHTML = "Temp: " + Number(1.8 * (tempIndex - 273) + 32).toFixed(1) + " °F";
            wind.innerHTML = "Wind: " + windIndex + " MPH";
            humidity.innerHTML = "Humidity: " + humidityIndex + "%";

            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;


            // 5 day forecast
            fetch(forecastURL)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);

                    // Date DOM variables
                    var forecastDayOneCityDate = document.getElementById("forecast-date-one");
                    var forecastDayTwoCityDate = document.getElementById("forecast-date-two");
                    var forecastDayThreeCityDate = document.getElementById("forecast-date-three");
                    var forecastDayFourCityDate = document.getElementById("forecast-date-four");
                    var forecastDayFiveCityDate = document.getElementById("forecast-date-five");

                    // Icon DOM variables
                    var forecastDayOneIcon = document.getElementById("day-one-icon");
                    var forecastDayTwoIcon = document.getElementById("day-two-icon");
                    var forecastDayThreeIcon = document.getElementById("day-three-icon");
                    var forecastDayFourIcon = document.getElementById("day-four-icon");
                    var forecastDayFiveIcon = document.getElementById("day-five-icon");

                    // Temp DOM variables
                    var forecastDayOneTemp = document.getElementById("day-one-temp");
                    var forecastDayTwoTemp = document.getElementById("day-two-temp");
                    var forecastDayThreeTemp = document.getElementById("day-three-temp");
                    var forecastDayFourTemp = document.getElementById("day-four-temp");
                    var forecastDayFiveTemp = document.getElementById("day-five-temp");

                    // Wind DOM variables
                    var forecastDayOneWind = document.getElementById("day-one-wind");
                    var forecastDayTwoWind = document.getElementById("day-two-wind");
                    var forecastDayThreeWind = document.getElementById("day-three-wind");
                    var forecastDayFourWind = document.getElementById("day-four-wind");
                    var forecastDayFiveWind = document.getElementById("day-five-wind");

                    // Humidity DOM variables
                    var forecastDayOneHumidity = document.getElementById("day-one-humidity");
                    var forecastDayTwoHumidity = document.getElementById("day-two-humidity");
                    var forecastDayThreeHumidity = document.getElementById("day-three-humidity");
                    var forecastDayFourHumidity = document.getElementById("day-four-humidity");
                    var forecastDayFiveHumidity = document.getElementById("day-five-humidity");


                    // 5 day forecast dates
                    var forecastDateTimeStamp = [
                        (new Date(data['list'][4]['dt'] * 1000).toLocaleDateString()),
                        (new Date(data['list'][15]['dt'] * 1000).toLocaleDateString()),
                        (new Date(data['list'][20]['dt'] * 1000).toLocaleDateString()),
                        (new Date(data['list'][28]['dt'] * 1000).toLocaleDateString()),
                        (new Date(data['list'][38]['dt'] * 1000).toLocaleDateString()),
                    ];

                    for (var i = 0; i < forecastDateTimeStamp.length; i++) {
                        // console.log("The date is " + forecastDateTimeStamp[i])
                    };



                    // 5 day forecast temperature
                    var forecastTemp = [
                        Number(1.8 * (data.list[4].main.temp - 273) + 32).toFixed(1) + " °F",
                        Number(1.8 * (data.list[15].main.temp - 273) + 32).toFixed(1) + " °F",
                        Number(1.8 * (data.list[20].main.temp - 273) + 32).toFixed(1) + " °F",
                        Number(1.8 * (data.list[28].main.temp - 273) + 32).toFixed(1) + " °F",
                        Number(1.8 * (data.list[38].main.temp - 273) + 32).toFixed(1) + " °F",
                    ];

                    for (var i = 0; i < forecastTemp.length; i++) {
                        // console.log("The temperature is " + forecastTemp[i])
                    };


                    // 5 day forecast wind speed
                    var windSpeed = [
                        data.list[4].wind.speed,
                        data.list[15].wind.speed,
                        data.list[20].wind.speed,
                        data.list[28].wind.speed,
                        data.list[38].wind.speed,
                    ];

                    for (var i = 0; i < windSpeed.length; i++) {
                        // console.log("The wind speed is " + windSpeed[i])
                    };


                    // 5 day forecast humidity
                    var humidityMeasure = [
                        data.list[4].main.humidity,
                        data.list[15].main.humidity,
                        data.list[20].main.humidity,
                        data.list[28].main.humidity,
                        data.list[38].main.humidity,
                    ];

                    for (var i = 0; i < humidityMeasure.length; i++) {
                        // console.log("The humidity is " + humidityMeasure[i])
                    };


                    // 5 day forecast icons
                    var forecastIcon = [
                        'https://openweathermap.org/img/w/' + data.list[4].weather[0].icon + '.png',
                        'https://openweathermap.org/img/w/' + data.list[15].weather[0].icon + '.png',
                        'https://openweathermap.org/img/w/' + data.list[20].weather[0].icon + '.png',
                        'https://openweathermap.org/img/w/' + data.list[28].weather[0].icon + '.png',
                        'https://openweathermap.org/img/w/' + data.list[38].weather[0].icon + '.png',
                    ];

                    for (var i = 0; i < forecastIcon.length; i++) {
                        // console.log("The icon is " + forecastIcon[i])
                    };



                    //Display day one forecast info
                    forecastDayOneCityDate.innerHTML = forecastDateTimeStamp[0];
                    forecastDayOneIcon.setAttribute('src', forecastIcon[0]);
                    forecastDayOneTemp.innerHTML = "Temp: " + forecastTemp[0] + " °F";
                    forecastDayOneWind.innerHTML = "Wind: " + windSpeed[0] + " MPH";
                    forecastDayOneHumidity.innerHTML = "Humidity: " + humidityMeasure[0] + "%";


                    //Display day two forecast info
                    forecastDayTwoCityDate.innerHTML = forecastDateTimeStamp[1];
                    forecastDayTwoIcon.setAttribute('src', forecastIcon[1]);
                    forecastDayTwoTemp.innerHTML = "Temp: " + forecastTemp[1] + " °F";
                    forecastDayTwoWind.innerHTML = "Wind: " + windSpeed[1] + " MPH";
                    forecastDayTwoHumidity.innerHTML = "Humidity: " + humidityMeasure[1] + "%";


                    //Display day three forecast info
                    forecastDayThreeCityDate.innerHTML = forecastDateTimeStamp[2];
                    forecastDayThreeIcon.setAttribute('src', forecastIcon[2]);
                    forecastDayThreeTemp.innerHTML = "Temp: " + forecastTemp[2] + " °F";
                    forecastDayThreeWind.innerHTML = "Wind: " + windSpeed[2] + " MPH";
                    forecastDayThreeHumidity.innerHTML = "Humidity: " + humidityMeasure[2] + "%";


                    //Display day four forecast info
                    forecastDayFourCityDate.innerHTML = forecastDateTimeStamp[3];
                    forecastDayFourIcon.setAttribute('src', forecastIcon[3]);
                    forecastDayFourTemp.innerHTML = "Temp: " + forecastTemp[3] + " °F";
                    forecastDayFourWind.innerHTML = "Wind: " + windSpeed[3] + " MPH";
                    forecastDayFourHumidity.innerHTML = "Humidity: " + humidityMeasure[0] + "%";


                    //Display day five forecast info
                    forecastDayFiveCityDate.innerHTML = forecastDateTimeStamp[4];
                    forecastDayFiveIcon.setAttribute('src', forecastIcon[4]);
                    forecastDayFiveTemp.innerHTML = "Temp: " + forecastTemp[4] + " °F";
                    forecastDayFiveWind.innerHTML = "Wind: " + windSpeed[4] + " MPH";
                    forecastDayFiveHumidity.innerHTML = "Humidity: " + humidityMeasure[4] + "%";



                })

        }

        )
}

weather();


// History button event listener
function historyWeather() {
    document.querySelectorAll('button').forEach(city => {
        city.addEventListener('click', event => {
            // console.log("you clicked " + city.textContent);
            var historyURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city.textContent + "&appid=" + apiKey;
            // console.log(historyURL);

            // Fetch and display history weather
            fetch(historyURL)
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
                    temp.innerHTML = "Temp: " + Number(1.8 * (tempIndex - 273) + 32).toFixed(1) + " °F";
                    wind.innerHTML = "Wind: " + windIndex + " MPH";
                    humidity.innerHTML = "Humidity: " + humidityIndex + "%";

                    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;


                    // 5 day forecast
                    fetch(forecastURL)
                        .then(response => response.json())
                        .then(data => {
                            // console.log(data);

                            // Date DOM variables
                            var forecastDayOneCityDate = document.getElementById("forecast-date-one");
                            var forecastDayTwoCityDate = document.getElementById("forecast-date-two");
                            var forecastDayThreeCityDate = document.getElementById("forecast-date-three");
                            var forecastDayFourCityDate = document.getElementById("forecast-date-four");
                            var forecastDayFiveCityDate = document.getElementById("forecast-date-five");

                            // Icon DOM variables
                            var forecastDayOneIcon = document.getElementById("day-one-icon");
                            var forecastDayTwoIcon = document.getElementById("day-two-icon");
                            var forecastDayThreeIcon = document.getElementById("day-three-icon");
                            var forecastDayFourIcon = document.getElementById("day-four-icon");
                            var forecastDayFiveIcon = document.getElementById("day-five-icon");

                            // Temp DOM variables
                            var forecastDayOneTemp = document.getElementById("day-one-temp");
                            var forecastDayTwoTemp = document.getElementById("day-two-temp");
                            var forecastDayThreeTemp = document.getElementById("day-three-temp");
                            var forecastDayFourTemp = document.getElementById("day-four-temp");
                            var forecastDayFiveTemp = document.getElementById("day-five-temp");

                            // Wind DOM variables
                            var forecastDayOneWind = document.getElementById("day-one-wind");
                            var forecastDayTwoWind = document.getElementById("day-two-wind");
                            var forecastDayThreeWind = document.getElementById("day-three-wind");
                            var forecastDayFourWind = document.getElementById("day-four-wind");
                            var forecastDayFiveWind = document.getElementById("day-five-wind");

                            // Humidity DOM variables
                            var forecastDayOneHumidity = document.getElementById("day-one-humidity");
                            var forecastDayTwoHumidity = document.getElementById("day-two-humidity");
                            var forecastDayThreeHumidity = document.getElementById("day-three-humidity");
                            var forecastDayFourHumidity = document.getElementById("day-four-humidity");
                            var forecastDayFiveHumidity = document.getElementById("day-five-humidity");


                            // 5 day forecast dates
                            var forecastDateTimeStamp = [
                                (new Date(data['list'][4]['dt'] * 1000).toLocaleDateString()),
                                (new Date(data['list'][15]['dt'] * 1000).toLocaleDateString()),
                                (new Date(data['list'][20]['dt'] * 1000).toLocaleDateString()),
                                (new Date(data['list'][28]['dt'] * 1000).toLocaleDateString()),
                                (new Date(data['list'][38]['dt'] * 1000).toLocaleDateString()),
                            ];

                            for (var i = 0; i < forecastDateTimeStamp.length; i++) {
                                // console.log("The date is " + forecastDateTimeStamp[i])
                            };



                            // 5 day forecast temperature
                            var forecastTemp = [
                                Number(1.8 * (data.list[4].main.temp - 273) + 32).toFixed(1) + " °F",
                                Number(1.8 * (data.list[15].main.temp - 273) + 32).toFixed(1) + " °F",
                                Number(1.8 * (data.list[20].main.temp - 273) + 32).toFixed(1) + " °F",
                                Number(1.8 * (data.list[28].main.temp - 273) + 32).toFixed(1) + " °F",
                                Number(1.8 * (data.list[38].main.temp - 273) + 32).toFixed(1) + " °F",
                            ];

                            for (var i = 0; i < forecastTemp.length; i++) {
                                // console.log("The temperature is " + forecastTemp[i])
                            };


                            // 5 day forecast wind speed
                            var windSpeed = [
                                data.list[4].wind.speed,
                                data.list[15].wind.speed,
                                data.list[20].wind.speed,
                                data.list[28].wind.speed,
                                data.list[38].wind.speed,
                            ];

                            for (var i = 0; i < windSpeed.length; i++) {
                                // console.log("The wind speed is " + windSpeed[i])
                            };


                            // 5 day forecast humidity
                            var humidityMeasure = [
                                data.list[4].main.humidity,
                                data.list[15].main.humidity,
                                data.list[20].main.humidity,
                                data.list[28].main.humidity,
                                data.list[38].main.humidity,
                            ];

                            for (var i = 0; i < humidityMeasure.length; i++) {
                                // console.log("The humidity is " + humidityMeasure[i])
                            };


                            // 5 day forecast icons
                            var forecastIcon = [
                                'https://openweathermap.org/img/w/' + data.list[4].weather[0].icon + '.png',
                                'https://openweathermap.org/img/w/' + data.list[15].weather[0].icon + '.png',
                                'https://openweathermap.org/img/w/' + data.list[20].weather[0].icon + '.png',
                                'https://openweathermap.org/img/w/' + data.list[28].weather[0].icon + '.png',
                                'https://openweathermap.org/img/w/' + data.list[38].weather[0].icon + '.png',
                            ];

                            for (var i = 0; i < forecastIcon.length; i++) {
                                // console.log("The icon is " + forecastIcon[i])
                            };



                            //Display day one forecast info
                            forecastDayOneCityDate.innerHTML = forecastDateTimeStamp[0];
                            forecastDayOneIcon.setAttribute('src', forecastIcon[0]);
                            forecastDayOneTemp.innerHTML = "Temp: " + forecastTemp[0] + " °F";
                            forecastDayOneWind.innerHTML = "Wind: " + windSpeed[0] + " MPH";
                            forecastDayOneHumidity.innerHTML = "Humidity: " + humidityMeasure[0] + "%";


                            //Display day two forecast info
                            forecastDayTwoCityDate.innerHTML = forecastDateTimeStamp[1];
                            forecastDayTwoIcon.setAttribute('src', forecastIcon[1]);
                            forecastDayTwoTemp.innerHTML = "Temp: " + forecastTemp[1] + " °F";
                            forecastDayTwoWind.innerHTML = "Wind: " + windSpeed[1] + " MPH";
                            forecastDayTwoHumidity.innerHTML = "Humidity: " + humidityMeasure[1] + "%";


                            //Display day three forecast info
                            forecastDayThreeCityDate.innerHTML = forecastDateTimeStamp[2];
                            forecastDayThreeIcon.setAttribute('src', forecastIcon[2]);
                            forecastDayThreeTemp.innerHTML = "Temp: " + forecastTemp[2] + " °F";
                            forecastDayThreeWind.innerHTML = "Wind: " + windSpeed[2] + " MPH";
                            forecastDayThreeHumidity.innerHTML = "Humidity: " + humidityMeasure[2] + "%";


                            //Display day four forecast info
                            forecastDayFourCityDate.innerHTML = forecastDateTimeStamp[3];
                            forecastDayFourIcon.setAttribute('src', forecastIcon[3]);
                            forecastDayFourTemp.innerHTML = "Temp: " + forecastTemp[3] + " °F";
                            forecastDayFourWind.innerHTML = "Wind: " + windSpeed[3] + " MPH";
                            forecastDayFourHumidity.innerHTML = "Humidity: " + humidityMeasure[0] + "%";


                            //Display day five forecast info
                            forecastDayFiveCityDate.innerHTML = forecastDateTimeStamp[4];
                            forecastDayFiveIcon.setAttribute('src', forecastIcon[4]);
                            forecastDayFiveTemp.innerHTML = "Temp: " + forecastTemp[4] + " °F";
                            forecastDayFiveWind.innerHTML = "Wind: " + windSpeed[4] + " MPH";
                            forecastDayFiveHumidity.innerHTML = "Humidity: " + humidityMeasure[4] + "%";



                        })

                }

                )
        })
    })
}

historyWeather();


