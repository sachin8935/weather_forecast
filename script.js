const API_KEY = `1a0fb8f531cd25c50600db7f30c0145d`;
let signal = 0;
async function weatherReport(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  const report = await response.json();
  let wrong_data = `${report?.cod}`;
  if (wrong_data === "404") {
    alert("City Not found");
    signal = 1;
  } else {
    let temp = `${report?.main?.temp.toFixed(2)} °C`;
    let wind = `${report?.wind?.speed.toFixed(2)}`;
    let humid = `${report?.main?.humidity}`;
    let clouds = `${report?.clouds?.all}`;
    let weather_type = `${report?.weather[0]?.main}`;
    let weatherIcon = document.querySelector(".image");
    weatherIcon.src = `http://openweathermap.org/img/wn/${report.weather[0].icon}.png`;
    forTemp(temp);
    forCity(city);
    forWind(wind);
    forHumidity(humid);
    forClouds(clouds);
    tyopeOfWeather(weather_type);
    signal = 0;
  }
}
function tyopeOfWeather(weather_type) {
  weather_type = weather_type.toUpperCase();
  let type_weather = document.querySelector(".weatherType");
  type_weather.textContent = `${weather_type}`;
}
function forClouds(clouds) {
  let cloudData = document.querySelector(".cloud");
  cloudData.textContent = `${clouds}%`;
}
function forHumidity(humid) {
  let humidData = document.querySelector(".humid");
  humidData.textContent = `${humid}%`;
}
function forWind(wind) {
  let windSpeed = document.querySelector(".wind_data");
  windSpeed.textContent = `${wind}`;
}
function forCity(city) {
  let city1 = document.querySelector(".city");
  city1.textContent = `${city}`;
}
function forTemp(temp) {
  let dummy_Temp = document.querySelector(".temp");
  dummy_Temp.textContent = `${temp}`;
}
let submit1 = document.querySelector(".submit_btn");
submit1.addEventListener("click", async function () {
  let data = document.querySelector(".text_area").value;
  if (data.length === 0) {
    alert("Please enter a input");
  } else {
    data = data.toUpperCase();
    await weatherReport(data);
    if (signal === 0) {
      showPanel();
    }
  }
});
function hidePanel() {
  let val1 = document.querySelector(".blury_effect");
  let val2 = document.querySelector(".display_weather");
  val1.classList.add("back");
  val2.classList.add("front");
}
function showPanel() {
  let val1 = document.querySelector(".blury_effect");
  let val2 = document.querySelector(".display_weather");
  val1.classList.remove("back");
  val2.classList.remove("front");
}
let hide = document.querySelector(".blury_effect");
hide.addEventListener("click", function () {
  hidePanel();
});
document.addEventListener("keydown", async (event) => {
  var name = event.key;
  var code = event.code;
  if (name === "Enter") {
    let data = document.querySelector(".text_area").value;
    data = data.toUpperCase();
    if (data.length === 0) {
      alert("Please enter a input");
    } else {
      await weatherReport(data);
      if (signal === 0) {
        showPanel();
      }
    }
  }
});
document.addEventListener("keydown", (event) => {
  var name = event.key;
  var code = event.code;
  if (name === "Escape") {
    hidePanel();
  }
});
