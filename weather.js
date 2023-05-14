let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  oslo: {
    temp: -5,
    humidity: 20
  }
};

function popUp() {
  let celsius = Math.round(weather[city].temp);
  let fahrenheit = 1.8 * celsius + 32;
  fahrenheit = Math.round(fahrenheit);
  let humidity = weather[city].humidity;
}

// feature 1
let now = new Date();
let date = now.getDate();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let year = now.getFullYear();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];

let h3 = document.querySelector("h3");
h3.innerHTML = `${day} ${hours}:${minutes}`;

// feature 2
function search(event) {
  event.preventDefault();
  let fill = document.querySelector("#fill-city");
  let h2 = document.querySelector("h2");
if (fill.value){
  h2.innerHTML = `${fill.value}`;
} else {
  h2.innerHTML = null;
  alert("Please type a city");
}

 let unit = "metric";
 let apiKey = "fc44672672ffd723dceda6872b5ef37a";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${fill.value}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemp);
}
let form = document.querySelector("#fill-form");
  form.addEventListener("submit", search);


  function showTemp(response) {
    console.log(response.data);
    celTemp = response.data.main.temp;
    let temp = Math.round(response.data.main.temp);
    let number = document.querySelector("#no");
    number.innerHTML = `${temp}`;
    let wind = document.querySelector("#wind");
        wind.innerHTML = Math.round(response.data.wind.speed);
    let Humidity = document.querySelector("#humidity");
        Humidity.innerHTML = Math.round(response.data.main.humidity);
    let city = document.querySelector("#tap");
    let cityName = response.data.name;
    city.innerHTML = cityName;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let iconElement = document.querySelector("#icon");
        iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`);
        iconElement.setAttribute("alt", response.data.weather[0].description);
  }

  function handlePosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  
  let button = document.querySelector("#btn");
  button.addEventListener("click", handlePosition);

  function showPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    console.log(position);
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let unit = "metric";
    let apiKey = "fc44672672ffd723dceda6872b5ef37a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;

    axios.get(apiUrl).then(showTemp);
  }
  navigator.geolocation.getCurrentPosition(showPosition);

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

 let celTemp = null;
 
 
let linkef =  document.querySelector("#faren-link");
  linkef.addEventListener("click", toF);

let linked =  document.querySelector("#deg-link");
  linked.addEventListener("click", toC);

  source(response);
