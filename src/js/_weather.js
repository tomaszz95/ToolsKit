export const weatherAppFunction = () => {
	const weatherLabel = document.querySelector('.weather__box-label')
	const weatherImg = document.querySelector('.weather__box-img')
	const weatherInput = document.querySelector('.weather__box-input')
	const weatherInputErr = document.querySelector('.weather__box-input-error')
	const weatherTimer = document.querySelector('.weather__box-timer')
	const weatherSpan = document.querySelector('.weather__data-info--weather')
	const tempSpan = document.querySelector('.weather__data-info--temp')
	const pressSpan = document.querySelector('.weather__data-info--press')
	const humSpan = document.querySelector('.weather__data-info--hum')
	const sunriseSpan = document.querySelector('.weather__data-info--sunrise')
	const sunsetSpan = document.querySelector('.weather__data-info--sunset')
	const windSpan = document.querySelector('.weather__data-info--wind')
	const windArrow = document.querySelector('.weather__data-info-arrow')
	const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
	const API_KEY = '&appid=1503629039d232e2a67ca14492858f91'
	const API_UNITS = '&units=metric'
	let weatherData
	let cookiesCity = localStorage.getItem('city')

	// GET DATA FROM API
	const getAPIWeather = cityName => {
		const API_URL = API_LINK + cityName + API_KEY + API_UNITS

		axios
			.get(API_URL)
			.then(response => {
				weatherData = {
					cityName,
					cityTemp: response.data.main.temp.toFixed(),
					cityPress: response.data.main.pressure,
					cityHum: response.data.main.humidity,
					citySunrise: response.data.sys.sunrise * 1000,
					citySunset: response.data.sys.sunset * 1000,
					cityWeatherID: response.data.weather[0].id,
					cityWeatherDesc: response.data.weather[0].main,
					cityWindSpeed: response.data.wind.speed.toFixed(1),
					cityWindDeg: response.data.wind.deg,
					cityTimezoneSeconds: response.data.timezone * 1000,
				}
				
				manageDataFromAPI(weatherData)
				localStorage.setItem('city', cityName)
				weatherInputErr.style.display = 'none'
				weatherInput.value = ''
			})
			.catch(() => (weatherInputErr.style.display = 'block'))
	}

	// FUNCTION CHANGING LABELS, SPAN AND CLOCK
	const manageDataFromAPI = weather => {
		weatherSpan.textContent = weather.cityWeatherDesc
		tempSpan.textContent = `${weather.cityTemp} °C`
		pressSpan.textContent = `${weather.cityPress} hPa`
		humSpan.textContent = `${weather.cityHum} %`
		windSpan.textContent = `${weather.cityWindSpeed} m/s`
		windArrow.style.transform = `rotate(${weather.cityWindDeg}deg)`

		cityNameInLabel(weather.cityName)
		setProperIcon(weather.cityWeatherID)
		getCurrentTime(weather.cityTimezoneSeconds)
		sunriseAndSunsetClock(weather.citySunrise, weather.citySunset, weather.cityTimezoneSeconds)
	}

	// BIG LETTERS IN CITY NAME
	let cityNameInLabel = cityName => {
		const bigLetters = cityName
			.split(' ')
			.map(cityName => (cityName = cityName.charAt(0).toUpperCase() + cityName.substring(1).toLowerCase()))
			.join(' ')

		weatherLabel.textContent = bigLetters
	}

	// SET ICON FOR WEATHER
	const setProperIcon = id => {
		if (id >= 200 && id < 300) {
			weatherImg.setAttribute('src', './src/img/thunderstorm.png')
		} else if (id >= 300 && id < 400) {
			weatherImg.setAttribute('src', './src/img/drizzle.png')
		} else if (id >= 500 && id < 600) {
			weatherImg.setAttribute('src', './src/img/rain.png')
		} else if (id >= 600 && id < 700) {
			weatherImg.setAttribute('src', './src/img/ice.png')
		} else if (id >= 700 && id < 800) {
			weatherImg.setAttribute('src', './src/img/fog.png')
		} else if (id === 800) {
			weatherImg.setAttribute('src', './src/img/sun.png')
		} else if (id > 800 && id < 900) {
			weatherImg.setAttribute('src', './src/img/cloud.png')
		} else {
			weatherImg.setAttribute('src', './src/img/unknown.png')
		}
	}

	// GET TIME IN CURRENT CITY
	const getCurrentTime = cityTime => {
		const nowTime = new Date()
		const nowTimeMs = nowTime.getTime()
		const currentTimeInCity = new Date(nowTimeMs + cityTime - 3600000)

		const nowHours =
			currentTimeInCity.getHours() < 10 ? `0${currentTimeInCity.getHours()}` : currentTimeInCity.getHours()
		const nowMinutes =
			currentTimeInCity.getMinutes() < 10 ? `0${currentTimeInCity.getMinutes()}` : currentTimeInCity.getMinutes()
		const nowSeconds =
			currentTimeInCity.getSeconds() < 10 ? `0${currentTimeInCity.getSeconds()}` : currentTimeInCity.getSeconds()

		weatherTimer.textContent = `${nowHours}:${nowMinutes}:${nowSeconds}`
	}

	// SUNSET AND SUNRISE TIME
	const sunriseAndSunsetClock = (sunrise, sunset, timezone) => {
		const sunriseDate = new Date(sunrise + timezone - 3600000)
		const sunriseHours = sunriseDate.getHours() < 10 ? `0${sunriseDate.getHours()}` : sunriseDate.getHours()
		const sunriseMinutes = sunriseDate.getMinutes() < 10 ? `0${sunriseDate.getMinutes()}` : sunriseDate.getMinutes()
		const sunriseSeconds = sunriseDate.getSeconds() < 10 ? `0${sunriseDate.getSeconds()}` : sunriseDate.getSeconds()

		const sunsetDate = new Date(sunset + timezone - 3600000)
		const sunsetHours = sunsetDate.getHours() < 10 ? `0${sunsetDate.getHours()}` : sunsetDate.getHours()
		const sunsetMinutes = sunsetDate.getMinutes() < 10 ? `0${sunsetDate.getMinutes()}` : sunsetDate.getMinutes()
		const sunsetSeconds = sunsetDate.getSeconds() < 10 ? `0${sunsetDate.getSeconds()}` : sunsetDate.getSeconds()

		sunriseSpan.textContent = `${sunriseHours}:${sunriseMinutes}:${sunriseSeconds}`
		sunsetSpan.textContent = `${sunsetHours}:${sunsetMinutes}:${sunsetSeconds}`
	}

	// CHANGE TIME IN CLOCK
	const changeClock = () => {
		const currentTime = weatherTimer.textContent
		let currentTimeHours = currentTime.slice(0, 2)
		let currentTimeMin = currentTime.slice(3, 5)
		let currentTimeSec = currentTime.slice(-2)

		if (currentTimeHours == 23 && currentTimeMin == 59 && currentTimeSec == 59) {
			weatherTimer.textContent = `00:00:00`
		} else if (currentTimeMin == 59 && currentTimeSec == 59) {
			currentTimeHours++
			if (currentTimeHours <= 9) {
				weatherTimer.textContent = `0${currentTimeHours}:00:00`
			} else {
				weatherTimer.textContent = `${currentTimeHours}:00:00`
			}
		} else if (currentTimeSec == 59) {
			currentTimeMin++
			if (currentTimeMin <= 9) {
				weatherTimer.textContent = `${currentTimeHours}:0${currentTimeMin}:00`
			} else {
				weatherTimer.textContent = `${currentTimeHours}:${currentTimeMin}:00`
			}
		} else if (currentTimeSec >= 9 && currentTimeSec < 59) {
			currentTimeSec++
			weatherTimer.textContent = `${currentTimeHours}:${currentTimeMin}:${currentTimeSec}`
		} else if (currentTimeSec < 9) {
			currentTimeSec++
			weatherTimer.textContent = `${currentTimeHours}:${currentTimeMin}:0${currentTimeSec}`
		}
	}

	// MANAGE ENTER
	const weatherEnterManage = e => {
		if (e.keyCode == 13 && weatherInput.value != '') {
			const cityName = weatherInput.value
			getAPIWeather(cityName)
		} else if (e.keyCode == 13 && weatherInput.value == '') {
			weatherInputErr.style.display = 'block'
		}
	}

	document.addEventListener('keyup', weatherEnterManage)
	getAPIWeather(cookiesCity || 'London')
	setInterval(changeClock, 1000)
}
