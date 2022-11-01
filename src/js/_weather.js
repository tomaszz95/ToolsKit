export const weatherAppFunction = () => {
	const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
	const API_KEY = '&appid=1503629039d232e2a67ca14492858f91'
	const API_UNITS = '&units=metric'
	let weatherData

	// GET DATA FROM API
	const getAPIWeather = () => {
		const cityName = 'London'
		// input.value || 'London'
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
					cityWeatherIcon:  response.data.weather[0].icon,
					cityWeatherDesc:  response.data.weather[0].main,
					cityWindSpeed:  response.data.wind.speed,
					cityWindDeg:  response.data.wind.deg,
				}

				manageDataFromAPI(weatherData)
			})
			.catch(err => console.log(err))
	}

	const manageDataFromAPI = (weather) => {
		console.log(weather);
	}

	getAPIWeather()
}
