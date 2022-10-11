export const switchPageThemes = () => {
	const root = document.documentElement
	const switchThemeBtn = document.querySelector('.header__container--theme')
	const switchThemeSlider = document.querySelector('.header__container--theme-slider')
	let theme = localStorage.getItem('theme')

	const switchColorToDark = () => {
		root.style.setProperty('--header-color', 'rgb(19, 10, 10)')
		root.style.setProperty('--element-color', 'rgb(29, 25, 25)')
		root.style.setProperty('--text-color', 'rgb(241, 236, 236)')
		root.style.setProperty('--active-color', 'rgb(51, 202, 14)')
	}

	const switchColorToLight = () => {
		root.style.setProperty('--header-color', 'rgb(248, 248, 248)')
		root.style.setProperty('--element-color', 'rgb(233, 233, 234)')
		root.style.setProperty('--text-color', 'rgb(19, 10, 10)')
		root.style.setProperty('--active-color', 'rgb(232, 13, 13)')
	}

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
