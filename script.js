const apiKey = "c888b09dfb802cdb68a0d50256b34666";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDisplay = document.querySelector(".weather");
const errorDisplay = document.querySelector(".error");

async function getWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    errorDisplay.style.display = "block";
    weatherDisplay.style.display = "none";
    searchBox.value = "";
  } else {
    errorDisplay.style.display = "none";
  }

  let data = await response.json();

  let c = data.main.temp;
  let f = 0;
  f = c * (9 / 5) + 32;
  f = f.toFixed(0);

  let mph = data.wind.speed * 0.621371;
  mph = mph.toFixed(2);

  document.querySelector(".city").innerText = data.name;
  document.querySelector(".temp").innerText = f + "°F";
  document.querySelector(".humidity").innerText = data.main.humidity + "%";
  document.querySelector(".wind").innerText = mph + " mph";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "clouds.png";
  } else if (data.weather[0] == "Clear") {
    weatherIcon.src = "clear.png";
  } else if (data.weather[0] == "Rain") {
    weatherIcon.src = "rain.png";
  } else if (data.weather[0] == "Drizzle") {
    weatherIcon.src = "drizzle.png";
  } else if (data.weather[0] == "Mist") {
    weatherIcon.src = "mist.png";
  }
  weatherDisplay.style.display = "block";
}

searchBtn.addEventListener("click", (e) => {
  getWeather(searchBox.value);
});
