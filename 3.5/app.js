let weather = {
  apiKey: '44f9df6fbd83824b9919e6f3d37870ec',
  fetchWeather: function(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='
    + city + 
    '&units=metric&appid=' 
    + this.apiKey)
    .then((response) => response.json())
    .then((data) => this.displayWeather(data));
  },
  displayWeather: function(data) {
    const { name } = data;
    const { lon, lat } = data.coord;
    const { main, description, icon } = data.weather[0];
    const { temp, feels_like, pressure, humidity } = data.main;
    const { speed, deg } = data.wind;
    const { dt } = data;
    const { country, sunrise, sunset } = data.sys;
    // console.log(dateFromeTimestamp(1669150800) + ' ' + timeFromTimestamp(1669150800));
    document.querySelector('#city-country').innerHTML = `${name}, ${country}`;
    document.querySelector('#current-weather-icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    document.querySelector('.tempreture-top').innerHTML = `${Math.round(temp)}°C`;
    document.querySelector('.feels-like').innerHTML = `Feels like ${Math.round(feels_like)}°C, ${main}`;
    document.querySelector('#present-data').innerHTML = dateFromeTimestamp(dt) + ' ' + timeFromTimestamp(dt);
    document.querySelector('#current-wind').innerHTML = `${deg}° ${Math.round(speed)}m/s`;
    document.querySelector('#current-cloudiness').innerHTML = description;
    document.querySelector('#current-pressure').innerHTML = `${pressure}hPa`;
    document.querySelector('#current-humidity').innerHTML = `${humidity}%`;
    document.querySelector('#current-sunrise').innerHTML = timeFromTimestamp(sunrise);
    document.querySelector('#current-sunset').innerHTML = timeFromTimestamp(sunset);
    document.querySelector('#current-geo-coords').innerHTML = `Lon:${lon} Lat:${lat}`;
    document.querySelector('.weather-container').classList.remove('loading');
  },
  search: function () {
    this.fetchWeather(document.querySelector('#search-input').value);
  }
}

let weatherForecast = {
  apiKey: '44f9df6fbd83824b9919e6f3d37870ec',
  fetchWeather: function(city) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='
    + city +
    '&units=metric&appid='
    + this.apiKey)
    .then((response) => response.json())
    .then((data) => this.displayWeather(data));
  },
  displayWeather: function(data) {
    const { name, country } = data.city;
    // const { lon, lat } = data.city.coord;
    const { list } = data;
    let dayForecast = new Date(data.list[0].dt*1000).getDate();
    let i = 1;
    document.querySelector('#city-country-forecast').innerHTML = `${name}, ${country}`;
    document.querySelector(`.day${i}-forecast`).innerHTML = `${dayOfWeekFromTimestamp(data.list[0].dt)} ${dateFromeTimestamp(data.list[0].dt)}  Today`;
    for (let a = 1; a < 7; a++) {
      document.querySelector(`#day${a}-forecast-data`).innerHTML = '';
    }


    for (forecastInfo of list) {
      const { dt } = forecastInfo;
      const { temp, pressure, humidity } = forecastInfo.main;
      const { main, icon } = forecastInfo.weather[0];
      const { speed, deg } = forecastInfo.wind;

      if (dayForecast !== new Date(dt*1000).getDate()) {
        dayForecast = new Date(dt*1000).getDate();
        i++;
        document.querySelector(`.day${i}-forecast`).innerHTML = `${dayOfWeekFromTimestamp(dt)} ${dateFromeTimestamp(dt)}`;
      }

      const newDiv = document.createElement("div");
      newDiv.classList = 'forecast-information-container';
      newDiv.innerHTML = `<div class="hours-forecast-data">
      <span class="time-forecast">${timeFromTimestamp(dt)}</span>
      <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="owm-weather-icon" width="50px" height="50px" alt="">
    </div>
    <div class="hours-forecast-information">
      <div class="forecast-temp-clouds">
        <span class="temp-forecast">${temp}°C</span>, ${main}</div>
      <div class="forecast-wind-humidity-pressure">Wind: ${deg} ${speed}m/s, ${humidity}%, ${pressure}hPa</div>
      </div>`;
      document.querySelector(`#day${i}-forecast-data`).appendChild(newDiv);

    }

    console.log(name);
  },
  search: function () {
    this.fetchWeather(document.querySelector('#search-input').value);
  }
}


document.querySelector('.button-round').addEventListener('click', function () {
  weather.search();
  weatherForecast.search();
});
document.querySelector('#search-input').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    weather.search();
    weatherForecast.search();
  }
})

function dateFromeTimestamp(timestamp) {
  const date = new Date(timestamp*1000);
  const month = date.toLocaleString('en-us', { month: 'short' });
  const day = date.getDate();
  return day + ' ' + month;
}

const pad = num => ("0" + num).slice(-2);

const timeFromTimestamp = timestamp => {
  const date = new Date(timestamp * 1000);
  let hours = date.getHours(),
    minutes = date.getMinutes();
  return pad(hours) + ":" + pad(minutes);
}

function dayOfWeekFromTimestamp(timestamp) {
  const date = new Date(timestamp*1000);
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  return days[date.getDay()];
}

weather.fetchWeather('boryspil');
weatherForecast.fetchWeather('boryspil');
