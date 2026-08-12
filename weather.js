
const apiKey = "5b3041ab5fd10c0827b3ca8b9da27a2f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


// Elements
const searchForm = document.querySelector(".search-container");
const searchBox = document.querySelector(".search-container input");
const searchBtn = document.querySelector(".search-container button");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");
const weatherCard = document.querySelector(".weather-card");

const cityName = document.querySelector(".city-name");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity-value");
const windSpeed = document.querySelector(".wind-value");

const weatherIcon = document.querySelector(".weather-icon");
const weatherDescription = document.querySelector(".weather-description");

const localTime = document.querySelector(".time-value");

//FETCH WEATHER

async function fetchWeather(city) {
  if(!city.trim()) {
    showError("Please enter a city name.");
    return;
  }

  // Loading state 
  searchForm.classList.add("loading");
  hideError();

  try {
    const response = await fetch(
  apiUrl + encodeURIComponent(city.trim()) + `&appid=${apiKey}`
);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    showError("City not found. Please try again.")
  } finally {
    searchForm.classList.remove("loading");
  }
};

// DISPLAY WEATHER

function displayWeather(data) {
  const condition = data.weather[0].main;
  cityName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;

  humidity.textContent = `${data.main.humidity}%`;

  windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
  weatherDescription.textContent = data.weather[0].description;
  updateLocalTime(data.timezone);

  // Change weather icon
  updateWeatherIcon(condition);

  // Change card theme
  updateWeatherTheme(condition);

  //Show weather section
  weather.classList.remove("show");

  // Force animation restart

  void weather.offsetWidth;
  weather.classList.add("show");
  weather.style.display = "block";

}

// Weather Icon

function updateWeatherIcon(condition) {
  const weatherIcons = {
    Clear: "weather-images/sun.png",
    Clouds: "weather-images/cloudy.png",
    Rain: "weather-images/rain.png",
    Drizzle: "weather-images/windy.png",
    Snow: "weather-images/snow.jpg",
    Thunderstorm: "weather-images/thunderstorm.jpg"
  };
  weatherIcon.src = 
  weatherIcons[condition] || "weather-images/cloudy.png";

  weatherIcon.alt = `${condition} weather`;
}

// WEATHER CARD THEME

function updateWeatherTheme(condition) {
  // Remove previous weather classes

  weatherCard.classList.remove(
    "clear",
    "clouds",
    "rain",
    "drizzle",
    "snow",
    "thunderstorm"
  );

  //Add new class

  const themes = {
    Clear: "clear",
    Clouds: "clouds",
    Rain: "rain",
    Drizzle: "drizzle",
    Snow: "snow",
    Thunderstorm: "thunderstorm"

  };
  weatherCard.classList.add(
    themes[condition] || "clouds"
  );
}
// LOCAL TIME
function updateLocalTime(timezone){
  const now = new Date();

  // Get current UTC time
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);

  // Apply the city's timezone offset
  const localTimeValue = new Date(utcTime + (timezone * 1000));


  localTime.textContent = localTimeValue.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}

// ERROR

function showError(message) {
  error.querySelector("p").textContent = message;
  error.classList.remove("show");

  // Restart animation
  void error.offsetWidth;
  error.classList.add("show");
  weather.classList.remove("show");
  weather.style.display = "none";
}

function hideError() {
  error.classList.remove("show");
}


// Search

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  fetchWeather(searchBox.value);
  searchBox.value = ""
})