export const calculatorFunction = () => {
	const calculatorApp = document.querySelector('.calculator')
	const calculatorDisplayPrevValue = document.querySelector('.calculator__display-prev')
	const calculatorDisplayCurrentValue = document.querySelector('.calculator__display-active')
	const calculatorBox = document.querySelector('.calculator__box')
	let currentValue = '',
		prevValue = '',
		chosenOperation = '',
		endResult = ''

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

	// MANAGE CLICK, MANAGE OPTIONS LIKE DEL, DELLALL, ENTER
	const manageCalculatorClick = e => {
		if (!calculatorApp.classList.contains('active-app')) return
		const clickedItemVDatasetValue = e.target.dataset.value
		const clickedItemDatasetType = e.target.dataset.type

		// BLOCK ONLY ZEROS IN CALC
		if (currentValue == '0' && clickedItemVDatasetValue == '0') {
			return
		} else if (currentValue == '0' && clickedItemDatasetType == 'Number') {
			currentValue = ''
		}

		currentValue = currentValue.toString()

		if (clickedItemDatasetType == 'Number' && currentValue.length < 15 && currentValue !== "Can't divide by 0!") {
			currentValue == endResult ? (currentValue = '') : false
			currentValue = currentValue + clickedItemVDatasetValue.toString()
		} else if (currentValue != '' && clickedItemDatasetType == 'Solo') {
			makeAnOperation(clickedItemVDatasetValue)
		} else if (
			clickedItemVDatasetValue == '.' &&
			!currentValue.includes('.') &&
			currentValue !== '' &&
			currentValue !== "Can't divide by 0!"
		) {
			currentValue = currentValue + clickedItemVDatasetValue.toString()
		} else if (
			(clickedItemVDatasetValue == 'Backspace' || e.target.parentElement.dataset.value == 'Backspace') &&
			currentValue !== "Can't divide by 0!"
		) {
			currentValue = currentValue.slice(0, -1)
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
		let result = ''
		endResult = ''

		const prevNumberValue = parseFloat(prevValue)
		const currentNumberValue = parseFloat(currentValue)

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

		if (result == "Can't divide by 0!") {
			endResult = result
		} else {
			endResult = Math.round((result + Number.EPSILON) * 100) / 100
		}

		currentValue = endResult
		prevValue = ''
		chosenOperation = ''
	}

	// MANAGE KEYS
	const manageKeys = e => {
		if (!calculatorApp.classList.contains('active-app')) return
		let keysItemVDatasetValue = e.key
		let keysClickedItem

		// DOWNLOAD KEY PUSHED ITEM
		if (keysItemVDatasetValue == 'Enter') {
			keysClickedItem = document.querySelector(`[data-value='=']`)
		} else {
			keysClickedItem = document.querySelector(`[data-value='${keysItemVDatasetValue}']`)
		}
		if (keysClickedItem == null) return

		// BLOCK ONLY ZEROS IN CALC
		if (currentValue == '0' && keysItemVDatasetValue == '0') {
			return
		} else if (currentValue == '0' && keysClickedItem.dataset.type == 'Number') {
			currentValue = ''
		}

		currentValue = currentValue.toString()

		if (keysClickedItem.dataset.type == 'Number' && currentValue.length < 15 && currentValue !== "Can't divide by 0!") {
			currentValue == endResult ? (currentValue = '') : false
			currentValue = currentValue + keysItemVDatasetValue.toString()
		} else if (currentValue != '' && keysClickedItem.dataset.type == 'Solo') {
			makeAnOperation(keysItemVDatasetValue)
		} else if (
			keysItemVDatasetValue == '.' &&
			!currentValue.includes('.') &&
			currentValue !== '' &&
			currentValue !== "Can't divide by 0!"
		) {
			currentValue = currentValue + keysItemVDatasetValue.toString()
		} else if (keysItemVDatasetValue == 'Backspace' && currentValue !== "Can't divide by 0!") {
			currentValue = currentValue.slice(0, -1)
		} else if (keysItemVDatasetValue == 'Del') {
			currentValue = ''
		} else if (keysItemVDatasetValue == 'DelAll') {
			currentValue = ''
			prevValue = ''
			chosenOperation = ''
		} else if (keysItemVDatasetValue == 'Enter' && chosenOperation != '') {
			makeAnOperation(keysItemVDatasetValue)
		}

		chosenOperationFunction(keysItemVDatasetValue, keysClickedItem.dataset.type)
		writeOnDisplay()
	}

	calculatorBox.addEventListener('click', manageCalculatorClick)
	document.addEventListener('keyup', manageKeys)
}
