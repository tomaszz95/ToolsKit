export const calculatorFunction = () => {
	const calculatorApp = document.querySelector('.calculator')
	const calculatorDisplayPrevValue = document.querySelector('.calculator__display-prev')
	const calculatorDisplayCurrentValue = document.querySelector('.calculator__display-active')
	const calculatorBox = document.querySelector('.calculator__box')
	let currentValue = ''
	let prevValue = ''
	let chosenOperation = ''
	let result = ''

	// WRITE ON DISPLAY
	const writeOnDisplay = () => {
		calculatorDisplayCurrentValue.textContent = currentValue

		if (chosenOperation == '') {
			calculatorDisplayPrevValue.textContent = ''
		} else if (prevValue == "Can't divide by 0!") {
			calculatorDisplayPrevValue.textContent = ''
			prevValue = ''
			currentValue = ''
			chosenOperation = ''
		} else {
			calculatorDisplayPrevValue.textContent = prevValue + chosenOperation
		}
	}

	// CHOSEN OPERATION
	const chosenOperationFunction = (value, type) => {
		if (currentValue == '') return

		if (type == 'Operation' && prevValue != '') {
			makeAnOperation(value)
		} else if (type == 'Operation' && prevValue == '') {
			chosenOperation = value
			prevValue = currentValue
			currentValue = ''
		}
	}

	// MANAGE CLICK, OPTIONS LIKE DEL, DELLALL, ENTER
	const manageCalculatorClick = e => {
		if (!calculatorApp.classList.contains('active-app')) return

		const clickedItemVDatasetValue = e.target.dataset.value
		const clickedItemDatasetType = e.target.dataset.type

		currentValue = currentValue.toString()

		if (clickedItemDatasetType == 'Number' && currentValue.length < 16 && currentValue !== "Can't divide by 0!") {
			currentValue == result ? (currentValue = '') : false
			currentValue = currentValue.toString() + clickedItemVDatasetValue.toString()
		} else if (currentValue != '' && clickedItemDatasetType == 'Solo') {
			makeAnOperation(clickedItemVDatasetValue)
		} else if (
			clickedItemVDatasetValue == '.' &&
			!currentValue.includes('.') &&
			currentValue !== '' &&
			currentValue !== "Can't divide by 0!"
		) {
			currentValue = currentValue.toString() + clickedItemVDatasetValue.toString()
		} else if (clickedItemVDatasetValue == 'Backspace' || e.target.parentElement.dataset.value == 'Backspace') {
			currentValue = currentValue.toString().slice(0, -1)
		} else if (clickedItemVDatasetValue == 'Del') {
			currentValue = ''
		} else if (clickedItemVDatasetValue == 'DelAll') {
			currentValue = ''
			prevValue = ''
			chosenOperation = ''
		} else if (clickedItemVDatasetValue == '=' && chosenOperation != '') {
			makeAnOperation(clickedItemVDatasetValue)
		}

		chosenOperationFunction(clickedItemVDatasetValue, clickedItemDatasetType)
		writeOnDisplay()
	}

	// OPERATIONS
	const makeAnOperation = value => {
		result = ''
		const prevNumberValue = parseFloat(prevValue)
		const currentNumberValue = parseFloat(currentValue)
		console.log(currentValue, prevValue)
		if ((prevNumberValue == '' && isNaN(prevNumberValue)) || isNaN(currentNumberValue)) return
		console.log(prevNumberValue, currentNumberValue)

		switch (chosenOperation) {
			case '+':
				result = prevNumberValue + currentNumberValue
				break
			case '-':
				result = prevNumberValue - currentNumberValue
				break
			case '*':
				result = prevNumberValue * currentNumberValue
				break
			case '/':
				if (currentNumberValue == 0) {
					currentValue = ''
					prevValue = ''
					chosenOperation = ''
					result = "Can't divide by 0!"
				} else {
					result = prevNumberValue / currentNumberValue
				}
				break
		}

		switch (value) {
			case 'log':
				result = Math.log(currentNumberValue)
				break
			case '^':
				result = Math.pow(currentNumberValue, 2)
				break
			case '√':
				result = Math.sqrt(currentNumberValue, 2)
				break
			case 'Inverse':
				result = currentNumberValue * -1
				break
			case 'e':
				result = currentNumberValue * 2.718281828459
				break
		}

		result = result.toString().slice(0, 18)
		currentValue = result
		prevValue = ''
		chosenOperation = ''
	}

	calculatorBox.addEventListener('click', manageCalculatorClick)
	// document.addEventListener('keyup', manageKeys)
}
