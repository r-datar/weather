import "./styles.css";

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current%2Calerts&key=2WLLVVDPTHBBH8WJSHS4KJJD8&contentType=json`
    );

    if (!response.ok) {
      if (response.status == 400) {
        throw new Error(`${response.status}`);
      }
    }
    if (response.ok) {
      const recvd = await response.json();

      return impTempData(recvd);
    }
  } catch (error) {
    displayMessage(error);
  }
}

function impTempData(weatherData) {
  let displayData = {};
  displayData["city"] = weatherData["address"];
  displayData["curr_temp"] = weatherData["currentConditions"]["temp"];
  displayData["humidity"] = weatherData["currentConditions"]["humidity"];
  displayData["conditions"] = weatherData["currentConditions"]["conditions"];
  displayData["icon"] = weatherData["currentConditions"]["icon"];
  return displayData;
}

function displayWeather(weatherData) {
  const cityDiv = document.querySelector(".city");

  const tempDiv = document.querySelector(".temp");

  const humidityDiv = document.querySelector(".humidity");

  const conditionsDiv = document.querySelector(".conditions");

  const weatherImage = document.querySelector("img");

  if (weatherData) {
    //Erase error message if any
    displayMessage();

    let { city, curr_temp, humidity, conditions, icon } = weatherData;
    cityDiv.textContent = city;
    tempDiv.textContent = `Now  ${curr_temp}°C`;
    humidityDiv.textContent = `Humidity  ${humidity}%`;
    conditionsDiv.textContent = conditions;
    weatherImage.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/refs/heads/main/PNG/1st%20Set%20-%20Color/${icon}.png`;
  } else {
    cityDiv.textContent = "";
    tempDiv.textContent = "";
    humidityDiv.textContent = "";
    conditionsDiv.textContent = "";
    weatherImage.src = "#";
  }
}

search_btn.addEventListener("click", function () {
  const search_for = document.querySelector("#search_for");
  getCurrWeather(search_for.value);
});

function displayMessage(error) {
  const message = document.querySelector(".message");
  if (error) {
    message.textContent = "No data found for city entered";
  } else {
    message.textContent = "";
  }
}

function getCurrWeather(city) {
  const weatherFor = city ? city : "Toronto";
  const nowWeather = getWeather(weatherFor).then(function (nowWeather) {
    displayWeather(nowWeather);
  });
}

getCurrWeather();
