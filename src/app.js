function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
 let iconElement = document.querySelector("#icon");


 function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days(day);
}


 function displayForecast(response) {
 let forecast = response.data.daily;

 let forecastElement = document.querySelector("#forecast"); 
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    
    let forecastDay = response.data.daily[index];
    if (index < 6) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
     <div class="weather-forecast-date">${day}</div>
     <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="sun" width="37"/>
     <div class="weather-forecast-temperatures">
       <span class="weather-forecast-min">${Math.round(forecastDay.temp.min)}
         °
      </span>
       <span class="weather-forecast-max">${Math.round(forecastDay.temp.max)}
         °
       </span>
   </div>
   </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

 function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b6031a652b4784b105a070ffbe0c5b26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
 }

 function displayWeatherCondition(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].description;

   iconElement.setAttribute("src", 
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);      
   iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
    }
  
  function searchCity(city) {
    let apiKey = "b6031a652b4784b105a070ffbe0c5b26";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  
  function searchLocation(position) {
    let apiKey = "b6031a652b4784b105a070ffbe0c5b26";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  function displayFahrenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    FahrenheitLink.classList.add("active");
    let FahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(FahrenheitTemperature);
  }


  function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    FahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

    celsiusTemperature = response.data.main.temp;

  }
  let celsiusTemperature = null;
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  let FahrenheitLink = document.querySelector("#fahrenheit-link");
  FahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsiusTemperature);

  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  searchCity("Chicago");
  