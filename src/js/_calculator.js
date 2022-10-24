export const calculatorFunction = () => {
	const calculatorApp = document.querySelector('.calculator')
	const calculatorDisplayPrevValue = document.querySelector('.calculator__display-prev')
	const calculatorDisplayCurrentValue = document.querySelector('.calculator__display-active')
	const calculatorBox = document.querySelector('.calculator__box')
	let currentValue = ''
	let prevValue = ''
	let chosenOperation = ''

	// WRITE ON DISPLAY
	const writeOnDisplay = () => {
		calculatorDisplayCurrentValue.textContent = currentValue
		console.log(currentValue);
		if (chosenOperation == '') {
			calculatorDisplayPrevValue.textContent = ''
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

	// MANAGE CLICK
	const manageCalculatorClick = e => {
		if (!calculatorApp.classList.contains('active-app')) return
		parseInt(currentValue, 10)

		const clickedItemVDatasetValue = e.target.dataset.value
		const clickedItemDatasetType = e.target.dataset.type

		if (clickedItemDatasetType == 'Number') {
			currentValue = currentValue.toString() + clickedItemVDatasetValue.toString()
		} else if (clickedItemDatasetType == 'Solo') {
			makeAnOperation(clickedItemVDatasetValue)
		} else if (clickedItemVDatasetValue == ',' && !currentValue.includes(',') && currentValue !== '') {
			currentValue = currentValue.toString() + clickedItemVDatasetValue.toString()
		} else if (clickedItemVDatasetValue == 'Backspace' || e.target.parentElement.dataset.value == 'Backspace') {
			currentValue = currentValue.toString().slice(0, -1)
		} else if (clickedItemVDatasetValue == 'Del') {
			currentValue = ''
		} else if (clickedItemVDatasetValue == 'DelAll') {
			currentValue = ''
			prevValue = ''
			chosenOperation = ''
		} else if (clickedItemVDatasetValue == '=') {
			makeAnOperation(clickedItemVDatasetValue)
		}

		chosenOperationFunction(clickedItemVDatasetValue, clickedItemDatasetType)
		writeOnDisplay()
	}

	// OPERATIONS
	const makeAnOperation = value => {}

	calculatorBox.addEventListener('click', manageCalculatorClick)
	// document.addEventListener('keyup', manageKeys)
}
