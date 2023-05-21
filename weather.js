let now = new Date();
let h3 = document.querySelector("h3");

let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h3.innerHTML = `${day}, ${month} ${date} ${year} ${hour}:${minutes}`;

function showTemperature(response) {
  console.log(response.data.main.temp);
  let h2 = document.querySelector("h2");
  let temperatureElement = document.querySelector("#no");
  let description = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  celTemp = response.data.main.temp;

  h2.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#fill-city");
  if (searchInput.value) {
    searchCity(searchInput.value);
  } else {
    let h2 = document.querySelector("h2");
    h2.innerHTML = null;
    alert("Please type a city");
  }
}

searchCity("Pretoria");

function searchCity(city) {
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function toF(event) {
   event.preventDefault();
   let temp = document.querySelector("#no");
  linked.classList.remove("active");
  linkef.classList.add("active");
   let fTemp = (celTemp * 9) / 5 + 32;
   temp.innerHTML = Math.round(fTemp);
 }

function toC(event) {
   event.preventDefault();
   linked.classList.add("active");
   linkef.classList.remove("active");
   let temp = document.querySelector("#no");
   temp.innerHTML = Math.round(celTemp);
 }

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let celTemp = null;

let form = document.querySelector("#fill-form");
form.addEventListener("submit", search);
navigator.geolocation.getCurrentPosition(retrievePosition);

let button = document.querySelector("#btn");
button.addEventListener("click", retrievePosition);

let linkef =  document.querySelector("#faren-link");
  linkef.addEventListener("click", toF);

let linked =  document.querySelector("#deg-link");
  linked.addEventListener("click", toC);
