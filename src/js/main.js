import { switchPageThemes } from './_switchThemes.js'
import { todoListFunction } from './_todo.js'
const navContainer = document.querySelector('.nav__container')

// Switch selected in nav
const switchNavSelected = e => {
    for (const btn of navContainer.children) {
        btn.classList.remove('nav__container--item-selected')
    }
	e.target.closest('button').classList.add('nav__container--item-selected')
}

navContainer.addEventListener('click', switchNavSelected)
switchPageThemes()
todoListFunction()
