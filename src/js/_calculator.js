export const calculatorFunction = () => {
	const calculatorApp = document.querySelector('.calculator')
	const calculatorDisplayPrevValue = document.querySelector('.calculator__display-prev')
	const calculatorDisplayActuallValue = document.querySelector('.calculator__display-active')
	const calculatorBox = document.querySelector('.calculator__box')

	// MANAGE KEYS
	const manageKeys = e => {
		if (!calculatorApp.classList.contains('active-app')) return

		if (e.key == '1') {
			console.log('1')
		} else if (e.key == '2') {
			console.log('2')
		} else if (e.key == '3') {
			console.log('3')
		} else if (e.key == '4') {
			console.log('4')
		} else if (e.key == '5') {
			console.log('5')
		} else if (e.key == '6') {
			console.log('6')
		} else if (e.key == '7') {
			console.log('7')
		} else if (e.key == '8') {
			console.log('8')
		} else if (e.key == '9') {
			console.log('9')
		} else if (e.key == 'Enter') {
			console.log('Enter')
		} else if (e.key == 'Backspace') {
			console.log('Backspace')
		} else if (e.key == '+') {
			console.log('+')
		} else if (e.key == '-') {
			console.log('-')
		} else if (e.key == '*') {
			console.log('*')
		} else if (e.key == '/') {
			console.log('/')
		} else if (e.key == '.') {
			console.log('.')
		}

		const clickedBtn = document.querySelector(`[data-value='${e.key}']`)
		clickedBtn.classList.add('active')
		setTimeout(() => {
			clickedBtn.classList.remove('active')
		}, 200)
	}

	document.addEventListener('keyup', manageKeys)
}
