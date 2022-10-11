export const switchThemes = () => {
    const root = document.documentElement
	const switchThemeBtn = document.querySelector('.header__container-theme')
	const switchThemeIcon = document.querySelector('.header__container-logo-icon')
	const switchThemeMoon = document.querySelector('.header__container-theme-icon')
	const todoIcon = document.querySelector('.item-todo img')
	const notesIcon = document.querySelector('.item-notes img')
	const walletIcon = document.querySelector('.item-wallet img')
	const calcIcon = document.querySelector('.item-calc img')
	const weatherIcon = document.querySelector('.item-weather img')
	let theme = localStorage.getItem('theme')

	const switchColorToDark = () => {
		root.style.setProperty('--header-color', 'rgb(19, 10, 10)')
		root.style.setProperty('--element-color', 'rgb(29, 25, 25)')
		root.style.setProperty('--text-color', 'rgb(241, 236, 236)')
		root.style.setProperty('--active-color', 'rgb(51, 202, 14)')
		switchThemeIcon.setAttribute('src','./src/img/tools-light.png')
		todoIcon.setAttribute('src','./src/img/todo-light.png')
		notesIcon.setAttribute('src','./src/img/note-light.png')
		walletIcon.setAttribute('src','./src/img/money-light.png')
		calcIcon.setAttribute('src','./src/img/calc-light.png')
		weatherIcon.setAttribute('src','./src/img/weather-light.png')
	}

	const switchColorToLight = () => {
		root.style.setProperty('--header-color', 'rgb(248, 248, 248)')
		root.style.setProperty('--element-color', 'rgb(233, 233, 234)')
		root.style.setProperty('--text-color', 'rgb(19, 10, 10)')
		root.style.setProperty('--active-color', 'rgb(232, 13, 13)')
		switchThemeIcon.setAttribute('src','./src/img/tools-dark.png')
		todoIcon.setAttribute('src','./src/img/todo-dark.png')
		notesIcon.setAttribute('src','./src/img/note-dark.png')
		walletIcon.setAttribute('src','./src/img/money-dark.png')
		calcIcon.setAttribute('src','./src/img/calc-dark.png')
		weatherIcon.setAttribute('src','./src/img/weather-dark.png')
	}

	if (theme === 'dark') {
		switchColorToDark()
		switchThemeMoon.classList.remove('active')
	} else {
		switchColorToLight()
		switchThemeMoon.classList.add('active')
	}

	const switchThemes = () => {
		switchThemeMoon.classList.toggle('active')
		if (switchThemeMoon.classList.contains('active')) {
			switchColorToLight()
			localStorage.setItem('theme', 'light')
		} else {
			switchColorToDark()
			localStorage.setItem('theme', 'dark')
		}
	}

	switchThemeBtn.addEventListener('click', switchThemes)
}