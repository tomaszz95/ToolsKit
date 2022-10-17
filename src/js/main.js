import { switchPageThemes } from './_switchThemes.js'
import { todoListFunction } from './_todo.js'
import { notesAppFunction } from './_notes.js'
// import { expensesAppFunction } from './_expenses.js'
// import { calculatorFunction } from './_calculator.js'
// import { weatherAppFunction } from './_weather.js'
const navContainer = document.querySelector('.nav__container')
const cookiesBtnsContainer = document.querySelector('.cookies__btns')
let cookies = localStorage.getItem('cookies')
let section = localStorage.getItem('section')

// Show cookies banner
const showCookiesBanner = () => {
	if (cookies === 'agree') {
		document.querySelector('.cookies').style.display = 'none'
	} else {
		document.querySelector('.cookies').style.display = 'flex'
	}
}

// Cookies info banner
const cookiesInfo = e => {
	const cookiesBox = document.querySelector('.cookies')

	if (e.target.classList.contains('cookies__btns--agree')) {
		cookiesBox.classList.add('hide')
		localStorage.setItem('cookies', 'agree')
	} else {
		cookiesBox.classList.add('hide')
		localStorage.setItem('cookies', 'disagree')
	}
}

// Switch apps from LocalStorage
const switchWhenEnterSite = () => {
    for (const btn of navContainer.children) {
        btn.classList.remove('nav__container--item-selected')
	}

    let lastActiveSectionIcon = document.querySelector(`#${section}`)
    let lastActiveSectionBody = document.querySelector(`.${section}`)
  
	if (section === null) {
		document.querySelector('#todo').classList.add('nav__container--item-selected')
		document.querySelector('.todo').classList.add('active-app')
		document.querySelector('.todo').classList.remove('hidden-app')
	} else {
		lastActiveSectionIcon.classList.add('nav__container--item-selected')
		lastActiveSectionBody.classList.add('active-app')
		lastActiveSectionBody.classList.remove('hidden-app')
	}
}

// Switch apps when site running
const switchNavSelected = e => {
    const main = document.querySelector('.main')
    
	if(e.target.classList.contains('nav__container')) return

	for (const btn of navContainer.children) {
        btn.classList.remove('nav__container--item-selected')
	}

	if (
		e.target.classList.contains('nav__container--item') ||
		e.target.parentElement.classList.contains('nav__container--item')
	) {
		e.target.closest('button').classList.add('nav__container--item-selected')
	} else {
		return
	}
    
	const targetedNavItemId = e.target.closest('button').getAttribute('id')
    
    localStorage.setItem('section', targetedNavItemId)
    
	for (const section of main.children) {
        if (section.classList.contains(targetedNavItemId)) {
            section.classList.add('active-app')
			section.classList.remove('hidden-app')
		} else {
            section.classList.remove('active-app')
			section.classList.add('hidden-app')
		}
	}
}


cookiesBtnsContainer.addEventListener('click', cookiesInfo)
navContainer.addEventListener('click', switchNavSelected)

showCookiesBanner()
switchWhenEnterSite()
switchPageThemes()

todoListFunction()
notesAppFunction()
// weatherAppFunction()
// expensesAppFunction()
// calculatorFunction()
