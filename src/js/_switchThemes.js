export const switchPageThemes = () => {
	const root = document.documentElement
	const switchThemeBtn = document.querySelector('.header__container--theme')
	const switchThemeSlider = document.querySelector('.header__container--theme-slider')
	let theme = localStorage.getItem('theme')

	const switchColorToDark = () => {
		root.style.setProperty('--primary-color', 'rgb(9, 5, 5)')
		root.style.setProperty('--element-color', 'rgb(65, 58, 58)')
		root.style.setProperty('--text-color', 'rgb(241, 236, 236)')
		root.style.setProperty('--highlight-color', 'rgb(51, 202, 14)')
		root.style.setProperty('--alert-color', 'rgb(255, 1, 1)')
		root.style.setProperty('--check-color', 'rgb(59, 253, 11)')
		root.style.setProperty('--edit-color', 'rgb(4, 216, 254)')
		root.style.setProperty('--circle-gradient-color', 'rgb(8, 4, 8)')
		root.style.setProperty('--background-gradient-color', 'rgb(29, 26, 26)')
	}
	
	const switchColorToLight = () => {
		root.style.setProperty('--primary-color', 'rgb(251, 251, 251)')
		root.style.setProperty('--element-color', 'rgb(223, 226, 229)')
		root.style.setProperty('--text-color', 'rgb(19, 10, 10)')
		root.style.setProperty('--highlight-color', 'rgb(77, 43, 218)')
		root.style.setProperty('--alert-color', 'rgb(216, 7, 7)')
		root.style.setProperty('--check-color', 'rgb(13, 141, 17)')
		root.style.setProperty('--edit-color', 'rgb(8, 50, 250)')
		root.style.setProperty('--circle-gradient-color', 'rgb(255, 255, 255)')
		root.style.setProperty('--background-gradient-color', 'rgb(166, 166, 166)')
	}

	// Cookies
	const switchColorFromCookies = () => {
		if (theme === 'dark') {
			switchColorToDark()
			switchThemeSlider.classList.remove('active')
		} else {
			switchColorToLight()
			switchThemeSlider.classList.add('active')
		}
	}

	const switchThemes = () => {
		switchThemeSlider.classList.toggle('active')
		if (switchThemeSlider.classList.contains('active')) {
			switchColorToLight()
			localStorage.setItem('theme', 'light')
		} else {
			switchColorToDark()
			localStorage.setItem('theme', 'dark')
		}
	}

	switchThemeBtn.addEventListener('click', switchThemes)
	switchColorFromCookies()
}
