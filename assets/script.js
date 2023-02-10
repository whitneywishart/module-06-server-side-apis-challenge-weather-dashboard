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



// Weather display function
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

    //Add search result to search history buttons
    $(cityList).append('<li id="history">' + searchedCity + '</li>');



    //Clear the form after submit button click
    $('input[name="city-search-name"]').val("");



    // Fetch current search
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
            temp.innerHTML = "Temp: " + Number(1.8 * (tempIndex - 273) + 32).toFixed(1) + " °F";
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

                    // Icon variables
                    var forecastDayOneIcon = document.getElementById("day-one-icon");
                    var forecastDayTwoIcon = document.getElementById("day-two-icon");
                    var forecastDayThreeIcon = document.getElementById("day-three-icon");
                    var forecastDayFourIcon = document.getElementById("day-four-icon");
                    var forecastDayFiveIcon = document.getElementById("day-five-icon");

                    // Temp variables
                    var forecastDayOneTemp = document.getElementById("day-one-temp");
                    var forecastDayTwoTemp = document.getElementById("day-two-temp");
                    var forecastDayThreeTemp = document.getElementById("day-three-temp");
                    var forecastDayFourTemp = document.getElementById("day-four-temp");
                    var forecastDayFiveTemp = document.getElementById("day-five-temp");

                    // Wind variables
                    var forecastDayOneWind = document.getElementById("day-one-wind");
                    var forecastDayTwoWind = document.getElementById("day-two-wind");
                    var forecastDayThreeWind = document.getElementById("day-three-wind");
                    var forecastDayFourWind = document.getElementById("day-four-wind");
                    var forecastDayFiveWind = document.getElementById("day-five-wind");

                    // Humidity variables
                    var forecastDayOneHumidity = document.getElementById("day-one-humidity");
                    var forecastDayTwoHumidity = document.getElementById("day-two-humidity");
                    var forecastDayThreeHumidity = document.getElementById("day-three-humidity");
                    var forecastDayFourHumidity = document.getElementById("day-four-humidity");
                    var forecastDayFiveHumidity = document.getElementById("day-five-humidity");

                    // 5 day forecast fetch dates variables
                    var forecastDateOneTimeStamp = data['list'][4]['dt']
                    var forecastDateTwoTimeStamp = data['list'][15]['dt']
                    var forecastDateThreeTimeStamp = data['list'][20]['dt']
                    var forecastDateFourTimeStamp = data['list'][28]['dt']
                    var forecastDateFiveTimeStamp = data['list'][38]['dt']


                    // Forecast day one
                    var forecastOneConvert = new Date(forecastDateOneTimeStamp * 1000);
                    var forecastDayOneDate = (forecastOneConvert.toLocaleDateString());
                    var forecastDayOneDefaultTemp = data.list[4].main.temp;
                    var forecastDayOneDefaultWind = data.list[4].wind.speed;
                    var forecastDayOneDefaultHumidity = data.list[4].main.humidity;

                    // Forecast day two
                    var forecastTwoConvert = new Date(forecastDateTwoTimeStamp * 1000);
                    var forecastDayTwoDate = (forecastTwoConvert.toLocaleDateString());
                    var forecastDayTwoDefaultTemp = data.list[15].main.temp;
                    var forecastDayTwoDefaultWind = data.list[15].wind.speed;
                    var forecastDayTwoDefaultHumidity = data.list[15].main.humidity;

                    // Forecast day three
                    var forecastThreeConvert = new Date(forecastDateThreeTimeStamp * 1000);
                    var forecastDayThreeDate = (forecastThreeConvert.toLocaleDateString());
                    var forecastDayThreeDefaultTemp = data.list[20].main.temp;
                    var forecastDayThreeDefaultWind = data.list[20].wind.speed;
                    var forecastDayThreeDefaultHumidity = data.list[20].main.humidity;

                    // Forecast day four
                    var forecastFourConvert = new Date(forecastDateFourTimeStamp * 1000);
                    var forecastDayFourDate = (forecastFourConvert.toLocaleDateString());
                    var forecastDayFourDefaultTemp = data.list[28].main.temp;
                    var forecastDayFourDefaultWind = data.list[28].wind.speed;
                    var forecastDayFourDefaultHumidity = data.list[28].main.humidity;

                    // Forecast day five
                    var forecastFiveConvert = new Date(forecastDateFiveTimeStamp * 1000);
                    var forecastDayFiveDate = (forecastFiveConvert.toLocaleDateString());
                    var forecastDayFiveDefaultTemp = data.list[38].main.temp;
                    var forecastDayFiveDefaultWind = data.list[38].wind.speed;
                    var forecastDayFiveDefaultHumidity = data.list[38].main.humidity;


                    // Get day one icon
                    var forecastDateOneIcon = 'https://openweathermap.org/img/w/' + data.list[4].weather[0].icon + '.png';


                    //Display day one forecast info
                    forecastDayOneCityDate.innerHTML = forecastDayOneDate;
                    forecastDayOneIcon.setAttribute('src', forecastDateOneIcon);
                    forecastDayOneTemp.innerHTML = "Temp: " + Number(1.8 * (forecastDayOneDefaultTemp - 273) + 32).toFixed(1) + " °F";
                    forecastDayOneWind.innerHTML = "Wind: " + forecastDayOneDefaultWind + " MPH";
                    forecastDayOneHumidity.innerHTML = "Humidity: " + forecastDayOneDefaultHumidity + "%";


                    // Get day two icon
                    var forecastDateTwoIcon = 'https://openweathermap.org/img/w/' + data.list[15].weather[0].icon + '.png';
                    //Display day two forecast info
                    forecastDayTwoCityDate.innerHTML = forecastDayTwoDate;
                    forecastDayTwoIcon.setAttribute('src', forecastDateTwoIcon);
                    forecastDayTwoTemp.innerHTML = "Temp: " + Number(1.8 * (forecastDayTwoDefaultTemp - 273) + 32).toFixed(1) + " °F";
                    forecastDayTwoWind.innerHTML = "Wind: " + forecastDayTwoDefaultWind + " MPH";
                    forecastDayTwoHumidity.innerHTML = "Humidity: " + forecastDayTwoDefaultHumidity + "%";


                    // Get day three icon
                    var forecastDateThreeIcon = 'https://openweathermap.org/img/w/' + data.list[20].weather[0].icon + '.png';
                    //Display day three forecast info
                    forecastDayThreeCityDate.innerHTML = forecastDayThreeDate;
                    forecastDayThreeIcon.setAttribute('src', forecastDateThreeIcon);
                    forecastDayThreeTemp.innerHTML = "Temp: " + Number(1.8 * (forecastDayThreeDefaultTemp - 273) + 32).toFixed(1) + " °F";
                    forecastDayThreeWind.innerHTML = "Wind: " + forecastDayThreeDefaultWind + " MPH";
                    forecastDayThreeHumidity.innerHTML = "Humidity: " + forecastDayThreeDefaultHumidity + "%";


                    // Get day four icon
                    var forecastDateFourIcon = 'https://openweathermap.org/img/w/' + data.list[28].weather[0].icon + '.png';
                    //Display day four forecast info
                    forecastDayFourCityDate.innerHTML = forecastDayFourDate;
                    forecastDayFourIcon.setAttribute('src', forecastDateFourIcon);
                    forecastDayFourTemp.innerHTML = "Temp: " + Number(1.8 * (forecastDayFourDefaultTemp - 273) + 32).toFixed(1) + " °F";
                    forecastDayFourWind.innerHTML = "Wind: " + forecastDayFourDefaultWind + " MPH";
                    forecastDayFourHumidity.innerHTML = "Humidity: " + forecastDayFourDefaultHumidity + "%";


                    // Get day five icon
                    var forecastDateFiveIcon = 'https://openweathermap.org/img/w/' + data.list[38].weather[0].icon + '.png';
                    //Display day five forecast info
                    forecastDayFiveCityDate.innerHTML = forecastDayFiveDate;
                    forecastDayFiveIcon.setAttribute('src', forecastDateFiveIcon);
                    forecastDayFiveTemp.innerHTML = "Temp: " + Number(1.8 * (forecastDayFiveDefaultTemp - 273) + 32).toFixed(1) + " °F";
                    forecastDayFiveWind.innerHTML = "Wind: " + forecastDayFiveDefaultWind + " MPH";
                    forecastDayFiveHumidity.innerHTML = "Humidity: " + forecastDayFiveDefaultHumidity + "%";


                    // Grab last searched city
                    var mostRecentSearchResult = document.getElementById("city-list").lastChild.innerHTML;
                    console.log(mostRecentSearchResult);

                    /////////////////TEST///////////////////////////////////
                    // When search button is clicked, perform the search function
                    searchButton.addEventListener("click", historySearchDisplay);

                    // History weather display function
                    function historySearchDisplay(event) {
                        event.preventDefault();



                        // Fetch history search
                        var historyQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + mostRecentSearchResult + "&appid=" + apiKey;


                        fetch(historyQueryURL)
                            .then(response => response.json())
                            .then(data => {


                                // History city display
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

                                var historyForecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

                                fetch(historyForecastURL)
                                    .then(response => response.json())
                                    .then(data => {


                                        // 5 day forecast DOM variables
                                        var forecastDayOneCityDate = document.getElementById("forecast-date-one");
                                        var forecastDayTwoCityDate = document.getElementById("forecast-date-two");
                                        var forecastDayThreeCityDate = document.getElementById("forecast-date-three");
                                        var forecastDayFourCityDate = document.getElementById("forecast-date-four");
                                        var forecastDayFiveCityDate = document.getElementById("forecast-date-five");

                                        // Icon variables
                                        var forecastDayOneIcon = document.getElementById("day-one-icon");
                                        var forecastDayTwoIcon = document.getElementById("day-two-icon");
                                        var forecastDayThreeIcon = document.getElementById("day-three-icon");
                                        var forecastDayFourIcon = document.getElementById("day-four-icon");
                                        var forecastDayFiveIcon = document.getElementById("day-five-icon");

                                        // Temp variables
                                        var forecastDayOneTemp = document.getElementById("day-one-temp");
                                        var forecastDayTwoTemp = document.getElementById("day-two-temp");
                                        var forecastDayThreeTemp = document.getElementById("day-three-temp");
                                        var forecastDayFourTemp = document.getElementById("day-four-temp");
                                        var forecastDayFiveTemp = document.getElementById("day-five-temp");

                                        // Wind variables
                                        var forecastDayOneWind = document.getElementById("day-one-wind");
                                        var forecastDayTwoWind = document.getElementById("day-two-wind");
                                        var forecastDayThreeWind = document.getElementById("day-three-wind");
                                        var forecastDayFourWind = document.getElementById("day-four-wind");
                                        var forecastDayFiveWind = document.getElementById("day-five-wind");

                                        // Humidity variables
                                        var forecastDayOneHumidity = document.getElementById("day-one-humidity");
                                        var forecastDayTwoHumidity = document.getElementById("day-two-humidity");
                                        var forecastDayThreeHumidity = document.getElementById("day-three-humidity");
                                        var forecastDayFourHumidity = document.getElementById("day-four-humidity");
                                        var forecastDayFiveHumidity = document.getElementById("day-five-humidity");

                                        // 5 day forecast fetch dates variables
                                        var forecastDateOneTimeStamp = data['list'][4]['dt']
                                        var forecastDateTwoTimeStamp = data['list'][15]['dt']
                                        var forecastDateThreeTimeStamp = data['list'][20]['dt']
                                        var forecastDateFourTimeStamp = data['list'][28]['dt']
                                        var forecastDateFiveTimeStamp = data['list'][38]['dt']


                                        // Forecast day one
                                        var forecastOneConvert = new Date(forecastDateOneTimeStamp * 1000);
                                        var forecastDayOneDate = (forecastOneConvert.toLocaleDateString());
                                        var forecastDayOneDefaultTemp = data.list[4].main.temp;
                                        var forecastDayOneDefaultWind = data.list[4].wind.speed;
                                        var forecastDayOneDefaultHumidity = data.list[4].main.humidity;

                                        // Forecast day two
                                        var forecastTwoConvert = new Date(forecastDateTwoTimeStamp * 1000);
                                        var forecastDayTwoDate = (forecastTwoConvert.toLocaleDateString());
                                        var forecastDayTwoDefaultTemp = data.list[15].main.temp;
                                        var forecastDayTwoDefaultWind = data.list[15].wind.speed;
                                        var forecastDayTwoDefaultHumidity = data.list[15].main.humidity;

                                        // Forecast day three
                                        var forecastThreeConvert = new Date(forecastDateThreeTimeStamp * 1000);
                                        var forecastDayThreeDate = (forecastThreeConvert.toLocaleDateString());
                                        var forecastDayThreeDefaultTemp = data.list[20].main.temp;
                                        var forecastDayThreeDefaultWind = data.list[20].wind.speed;
                                        var forecastDayThreeDefaultHumidity = data.list[20].main.humidity;

                                        // Forecast day four
                                        var forecastFourConvert = new Date(forecastDateFourTimeStamp * 1000);
                                        var forecastDayFourDate = (forecastFourConvert.toLocaleDateString());
                                        var forecastDayFourDefaultTemp = data.list[28].main.temp;
                                        var forecastDayFourDefaultWind = data.list[28].wind.speed;
                                        var forecastDayFourDefaultHumidity = data.list[28].main.humidity;

                                        // Forecast day five
                                        var forecastFiveConvert = new Date(forecastDateFiveTimeStamp * 1000);
                                        var forecastDayFiveDate = (forecastFiveConvert.toLocaleDateString());
                                        var forecastDayFiveDefaultTemp = data.list[38].main.temp;
                                        var forecastDayFiveDefaultWind = data.list[38].wind.speed;
                                        var forecastDayFiveDefaultHumidity = data.list[38].main.humidity;


                                        // Get day one icon
                                        var forecastDateOneIcon = 'https://openweathermap.org/img/w/' + data.list[4].weather[0].icon + '.png';


                                        //Display day one forecast info
                                        forecastDayOneCityDate.innerHTML = forecastDayOneDate;
                                        forecastDayOneIcon.setAttribute('src', forecastDateOneIcon);
                                        forecastDayOneTemp.innerHTML = "Temp: " + Number(1.8 * (forecastDayOneDefaultTemp - 273) + 32).toFixed(1) + " °F";
                                        forecastDayOneWind.innerHTML = "Wind: " + forecastDayOneDefaultWind + " MPH";
                                        forecastDayOneHumidity.innerHTML = "Humidity: " + forecastDayOneDefaultHumidity + "%";


                                        // Get day two icon
                                        var forecastDateTwoIcon = 'https://openweathermap.org/img/w/' + data.list[15].weather[0].icon + '.png';
                                        //Display day two forecast info
                                        forecastDayTwoCityDate.innerHTML = forecastDayTwoDate;
                                        forecastDayTwoIcon.setAttribute('src', forecastDateTwoIcon);
                                        forecastDayTwoTemp.innerHTML = "Temp: " + Number(1.8 * (forecastDayTwoDefaultTemp - 273) + 32).toFixed(1) + " °F";
                                        forecastDayTwoWind.innerHTML = "Wind: " + forecastDayTwoDefaultWind + " MPH";
                                        forecastDayTwoHumidity.innerHTML = "Humidity: " + forecastDayTwoDefaultHumidity + "%";


                                        // Get day three icon
                                        var forecastDateThreeIcon = 'https://openweathermap.org/img/w/' + data.list[20].weather[0].icon + '.png';
                                        //Display day three forecast info
                                        forecastDayThreeCityDate.innerHTML = forecastDayThreeDate;
                                        forecastDayThreeIcon.setAttribute('src', forecastDateThreeIcon);
                                        forecastDayThreeTemp.innerHTML = "Temp: " + Number(1.8 * (forecastDayThreeDefaultTemp - 273) + 32).toFixed(1) + " °F";
                                        forecastDayThreeWind.innerHTML = "Wind: " + forecastDayThreeDefaultWind + " MPH";
                                        forecastDayThreeHumidity.innerHTML = "Humidity: " + forecastDayThreeDefaultHumidity + "%";


                                        // Get day four icon
                                        var forecastDateFourIcon = 'https://openweathermap.org/img/w/' + data.list[28].weather[0].icon + '.png';
                                        //Display day four forecast info
                                        forecastDayFourCityDate.innerHTML = forecastDayFourDate;
                                        forecastDayFourIcon.setAttribute('src', forecastDateFourIcon);
                                        forecastDayFourTemp.innerHTML = "Temp: " + Number(1.8 * (forecastDayFourDefaultTemp - 273) + 32).toFixed(1) + " °F";
                                        forecastDayFourWind.innerHTML = "Wind: " + forecastDayFourDefaultWind + " MPH";
                                        forecastDayFourHumidity.innerHTML = "Humidity: " + forecastDayFourDefaultHumidity + "%";


                                        // Get day five icon
                                        var forecastDateFiveIcon = 'https://openweathermap.org/img/w/' + data.list[38].weather[0].icon + '.png';
                                        //Display day five forecast info
                                        forecastDayFiveCityDate.innerHTML = forecastDayFiveDate;
                                        forecastDayFiveIcon.setAttribute('src', forecastDateFiveIcon);
                                        forecastDayFiveTemp.innerHTML = "Temp: " + Number(1.8 * (forecastDayFiveDefaultTemp - 273) + 32).toFixed(1) + " °F";
                                        forecastDayFiveWind.innerHTML = "Wind: " + forecastDayFiveDefaultWind + " MPH";
                                        forecastDayFiveHumidity.innerHTML = "Humidity: " + forecastDayFiveDefaultHumidity + "%";





                                    })

                            }

                            )
                    }
                })
        })
}
