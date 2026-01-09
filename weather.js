const apiKey = "213ab788b7d0ed1384ab124025d9fd16";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-container input");
const searchBtn = document.querySelector(".search-container button");
const weather = document.querySelector(".weather");


async function fetchWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if(response.status == 404){
    document.querySelector(".error").style.display = "block";
    weather.style.display = "none";
  }else{
    var data = await response.json();
  
  document.querySelector(".city-name").innerHTML = data.name;
  document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity-value").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind-value").innerHTML = data.wind.speed + " km/h";

  if(data.weather[0].main == "Clouds") {
    document.querySelector(".weather-icon").src = "weather-images/cloudy.png";
  }if(data.weather[0].main == "Clear") {
    document.querySelector(".weather-icon").src = "weather-images/sun.png";
  }if(data.weather[0].main == "Rain") {
    document.querySelector(".weather-icon").src = "weather-images/rain.png";
  }if(data.weather[0].main == "Drizzle") {
    document.querySelector(".weather-icon").src = "weather-images/windy.png";
  }

weather.style.display = "block";
document.querySelector(".error").style.display = "none";
  }
  

}

searchBtn.addEventListener("click", () => {
  fetchWeather(searchBox.value);

  searchBox.value = "";
});

