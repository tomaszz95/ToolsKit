export const calculatorFunction = () => {
	const calculatorApp = document.querySelector('.calculator')
	const calculatorDisplayPrevValue = document.querySelector('.calculator__display-prev')
	const calculatorDisplayActuallValue = document.querySelector('.calculator__display-active')
	const calculatorBox = document.querySelector('.calculator__box')
	let clickedValue
	let prevValue
	// WRITE ON DISPLAY
	const writeNumbersOnDisplay = e => {
		if (clickedValue == undefined) {
			clickedValue = e.target.dataset.value || e.key
			calculatorDisplayActuallValue.textContent = clickedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
		} else if (clickedValue.length < 16 && e.target.dataset.value != undefined) {
			clickedValue = `${prevValue}${e.target.dataset.value}`
			calculatorDisplayActuallValue.textContent = clickedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
		} else if (clickedValue.length < 16 && e.key == '.') {
			clickedValue = `${prevValue},`
			calculatorDisplayActuallValue.textContent = clickedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
		} else if (clickedValue.length < 16 && e.key != undefined) {
			clickedValue = `${prevValue}${e.key}`
			calculatorDisplayActuallValue.textContent = clickedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
		}
		
		prevValue = clickedValue
	}

	// MANAGE CALCULATOR BUTTONS
	const manageCalculatorItems = e => {
		if (e.target.dataset.value >= 0 && e.target.dataset.value < 10) {
			writeNumbersOnDisplay(e)
		} else if (e.target.dataset.value == 'Backspace') {
			console.log('Backspace')
		} else if (e.target.dataset.value == 'Del') {
			console.log('Del')
		} else if (e.target.dataset.value == 'DelAll') {
			console.log('DelAll')
		} else if (e.target.dataset.value == 'Enter') {
			console.log('Enter')
		} else if (e.target.dataset.value == '+') {
			console.log('+')
		} else if (e.target.dataset.value == '-') {
			console.log('-')
		} else if (e.target.dataset.value == '*') {
			console.log('*')
		} else if (e.target.dataset.value == '/') {
			console.log('/')
		} else if (e.target.dataset.value == 'Fraction') {
			console.log('Fraction')
		} else if (e.target.dataset.value == 'Squared') {
			console.log('Squared')
		} else if (e.target.dataset.value == 'Root') {
			console.log('Root')
		} else if (e.target.dataset.value == 'Inverse') {
			console.log('Inverse')
		} else if (prevValue != undefined && e.target.dataset.value == ',' && prevValue.indexOf(',') < 0) {
			writeNumbersOnDisplay(e)
		} else if (e.target.dataset.value == 'e') {
			console.log('e')
		}
	}

	// MANAGE KEYS
	const manageKeys = e => {
		if (!calculatorApp.classList.contains('active-app')) return

		if (e.key >= 0 && e.key < 10) {
			writeNumbersOnDisplay(e)
		} else if (e.key == 'Enter' || e.key == '=') {
			console.log('=')
			const clickedBtn = document.querySelector(`[data-value='Enter']`)
			clickedBtn.classList.add('active')
			setTimeout(() => {
				clickedBtn.classList.remove('active')
			}, 200)
			return
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
		} else if (prevValue != undefined && (e.key == '.' || e.key == ',') && prevValue.indexOf(',') < 0) {
			writeNumbersOnDisplay(e)

			const clickedBtn = document.querySelector(`[data-value=',']`)
			clickedBtn.classList.add('active')
			setTimeout(() => {
				clickedBtn.classList.remove('active')
			}, 200)
			return
		} else {
			return
		}

		const clickedBtn = document.querySelector(`[data-value='${e.key}']`)
		clickedBtn.classList.add('active')
		setTimeout(() => {
			clickedBtn.classList.remove('active')
		}, 200)
	}

	calculatorBox.addEventListener('click', manageCalculatorItems)
	document.addEventListener('keyup', manageKeys)
}
