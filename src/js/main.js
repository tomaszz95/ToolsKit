import { switchPageThemes } from './_switchThemes.js'
const navContainer = document.querySelector('.nav__container')

const switchNavSelected = e => {
    for (const btn of navContainer.children) {
        btn.classList.remove('nav__container--item-selected')
    }
	e.target.closest('button').classList.add('nav__container--item-selected')
}

navContainer.addEventListener('click', switchNavSelected)
switchPageThemes()
