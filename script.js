const apiKey = "79779f35874b74a1eee4c948612a4343";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city){

    if(!city){
        alert('Please enter your city');
        
        return;
    }
    
    fetch(apiUrl + city + `&appid=${apiKey}`)
        .then(Response => Response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.log('Error fetching current weather data:', error);
            
            document.querySelector('.not-found').style.display = "block"
            // alert('Error fetching current weather data ( It may be possible that your spelling is incorrect ). Please try again!')
            document.querySelector('.weather').style.display = "none"
        }
    );
    
}

const displayWeather = (data) => {
    document.querySelector('.not-found').style.display = "none";

    document.querySelector(".city").innerHTML = data.name + `, ${data.sys.country}`;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + `<span>°C</span>`
    document.querySelector(".description").innerHTML = data.weather[0].description;
    document.querySelector(".feels-temp").innerHTML = Math.round(data.main.feels_like) + "°C"
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + "km/h"
    

    if(data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/cloud.png"
    } else if(data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png"
    }else if(data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png"
    } else if(data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png"
    } else if(data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png"
    } else if(data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png"
    }

    document.querySelector('.weather').style.display = "block"
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

const getDayDate = () => {
    days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]
    const now = new Date();
    document.querySelector(".day").innerHTML = days[now.getDay()] + ', ';
    document.querySelector('.date').innerHTML = now.getDate();
    document.querySelector('.month').innerHTML = months[now.getMonth()];
    document.querySelector('.year').innerHTML = now.getFullYear()
}
getDayDate();