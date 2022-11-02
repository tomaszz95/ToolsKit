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

	// GET DATA FROM API
	const getAPIWeather = () => {
		const cityName = weatherInput.value || 'Kielce'

		const API_URL = API_LINK + cityName + API_KEY + API_UNITS

		axios
			.get(API_URL)
			.then(response => {
				weatherData = {
					cityName,
					cityTemp: response.data.main.temp.toFixed(),
					cityPress: response.data.main.pressure,
					cityHum: response.data.main.humidity,
					citySunrise: response.data.sys.sunrise,
					citySunset: response.data.sys.sunset,
					cityWeatherIcon: response.data.weather[0].icon,
					cityWeatherDesc: response.data.weather[0].main,
					cityWindSpeed: response.data.wind.speed.toFixed(1),
					cityWindDeg: response.data.wind.deg,
					cityTimezoneSeconds: response.data.timezone * 1000,
				}

				manageDataFromAPI(weatherData)
			})
			.catch(() => (weatherInputErr.style.display = 'block'))
	}

	const manageDataFromAPI = weather => {
		const iconURL = 'http://openweathermap.org/img/wn/'
		const endOfIconUrl = '@2x.png'
		console.log(weather)
		weatherLabel.textContent = weather.cityName
		weatherSpan.textContent = weather.cityWeatherDesc
		tempSpan.textContent = `${weather.cityTemp} °C`
		pressSpan.textContent = `${weather.cityPress} hPa`
		humSpan.textContent = `${weather.cityHum} %`
		windSpan.textContent = `${weather.cityWindSpeed} m/s`
		windArrow.style.transform = `rotate(${weather.cityWindDeg}deg)`
		weatherImg.setAttribute('src', `${iconURL}${weather.cityWeatherIcon}${endOfIconUrl}`)

		const sunriseDate = new Date(weather.citySunrise - weather.cityTimezoneSeconds)
		const sunriseHours = sunriseDate.getHours() < 10 ? `0${sunriseDate.getHours()}` : sunriseDate.getHours()
		const sunriseMinutes = sunriseDate.getMinutes() < 10 ? `0${sunriseDate.getMinutes()}` : sunriseDate.getMinutes()
		const sunriseSeconds = sunriseDate.getSeconds() < 10 ? `0${sunriseDate.getSeconds()}` : sunriseDate.getSeconds()

		const sunsetDate = new Date(weather.citySunset)
		const sunsetHours = sunsetDate.getHours() < 10 ? `0${sunsetDate.getHours()}` : sunsetDate.getHours()
		const sunsetMinutes = sunsetDate.getMinutes() < 10 ? `0${sunsetDate.getMinutes()}` : sunsetDate.getMinutes()
		const sunsetSeconds = sunsetDate.getSeconds() < 10 ? `0${sunsetDate.getSeconds()}` : sunsetDate.getSeconds()

		sunriseSpan.textContent = `${sunriseHours}:${sunriseMinutes}:${sunriseSeconds}`
		sunsetSpan.textContent = `${sunsetHours}:${sunsetMinutes}:${sunsetSeconds}`
		weatherInputErr.style.display = 'none'
	}

	// GET CURRENT TIME
	const getCurrentTime = () => {
		const nowTime = new Date()
		const nowHours = nowTime.getHours() < 10 ? `0${nowTime.getHours()}` : nowTime.getHours()
		const nowMinutes = nowTime.getMinutes() < 10 ? `0${nowTime.getMinutes()}` : nowTime.getMinutes()
		const nowSeconds = nowTime.getSeconds() < 10 ? `0${nowTime.getSeconds()}` : nowTime.getSeconds()

		weatherTimer.textContent = `${nowHours}:${nowMinutes}:${nowSeconds}`
	}

	// MANAGE ENTER
	const weatherEnterManage = e => {
		if (e.keyCode === 13) {
			getAPIWeather()
			weatherInput.value = ''
		}
	}

	document.addEventListener('keyup', weatherEnterManage)
	getCurrentTime()
	setInterval(getCurrentTime, 1000)
	getAPIWeather()
}
