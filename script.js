const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');

searchBtn.addEventListener('click', getWeather);

async function getWeather() {
    const city = cityInput.value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            weatherInfo.innerHTML = '<p>City not found. Please try again.</p>';
        } else {
            displayWeather(data);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = '<p>An error occurred. Please try again later.</p>';
    }
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    const temperature = Math.round(main.temp);
    const description = weather[0].description;
    const icon = weather[0].icon;

    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" class="weather-icon">
        <p class="temperature">${temperature}°C</p>
        <p class="description">${description}</p>
        <div class="details">
            <div class="detail">
                <p class="detail-label">Feels like</p>
                <p>${Math.round(main.feels_like)}°C</p>
            </div>
            <div class="detail">
                <p class="detail-label">Humidity</p>
                <p>${main.humidity}%</p>
            </div>
            <div class="detail">
                <p class="detail-label">Wind speed</p>
                <p>${wind.speed} m/s</p>
            </div>
        </div>
    `;
}