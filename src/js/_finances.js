export const financesManagerFunction = () => {
	const navContainer = document.querySelector('.nav__container')
	const financesToolsBtns = document.querySelector('.finances__tools-btns')
	const financesModal = document.querySelector('.finances__modal')
	const financesModalBtns = document.querySelector('.finances__modal--btns')
	const financesModalNameInput = document.querySelector('.finances__modal--name-input')
	const financesModalNameErr = document.querySelector('.finances__modal--name-error')
	const financesModalNumberInput = document.querySelector('.finances__modal--number-input')
	const financesModalNumberErr = document.querySelector('.finances__modal--number-error')
	const financesModalSelect = document.querySelector('.finances__modal--icon-select')
	const financesModalSelectErr = document.querySelector('.finances__modal--icon-error')
	const incomeList = document.querySelector('.finances__income--list')
	const expensesList = document.querySelector('.finances__expenses--list')
	const totalIncomeNumber = document.querySelector('.finances__total--income-number')
	const totalExpensesNumber = document.querySelector('.finances__total--expenses-number')
	const totalBalanceNumber = document.querySelector('.finances__total--balance-number')
	const financesContainer = document.querySelector('.finances__container')
	let financesCookiesObject = {}
	let incomeArr = []
	let expensesArr = []

	// COOKIES
	const addTransactionFromCookies = () => {
		const financesItemsFromCookies = JSON.parse(localStorage.getItem('finances'))
		for (const item in financesItemsFromCookies) {
			const itemName = financesItemsFromCookies[item].transactionName
			const itemNumber = financesItemsFromCookies[item].transactionNumber
			const itemType = financesItemsFromCookies[item].transactionType
			const itemPattern = financesItemsFromCookies[item].transactionPattern

			if (itemName == '') return

			createNewItem(itemName, itemNumber, itemType, itemPattern)
		}

		totalValuesAmount()
	}

	// MANAGE TOTAL VIEW VALUES
	const totalValuesAmount = () => {
		const reducedIncomeArr = incomeArr.reduce((prev, curr) => prev + curr, 0)
		const reducedExpensesArr = expensesArr.reduce((prev, curr) => prev + curr, 0)
		const bilansValue = (reducedIncomeArr + reducedExpensesArr).toFixed(2)

		const reducedIncomeValue = reducedIncomeArr.toFixed(2)
		const reducedExpensesValue = reducedExpensesArr.toFixed(2)

		if (incomeArr.length == 0) {
			totalIncomeNumber.textContent = '0.00$'
		} else {
			totalIncomeNumber.textContent = `${reducedIncomeValue}$`
		}

		if (expensesArr.length == 0) {
			totalExpensesNumber.textContent = '0.00$'
		} else {
			totalExpensesNumber.textContent = `${reducedExpensesValue}$`
		}

		totalBalanceNumber.textContent = `${bilansValue}$`
	}

	// CLEAR MODAL
	const clearFinancesModal = () => {
		financesModalNameInput.value = ''
		financesModalNameErr.style.visibility = 'hidden'
		financesModalNumberInput.value = ''
		financesModalNumberErr.style.visibility = 'hidden'
		financesModalSelect.value = '0'
		financesModalSelectErr.style.visibility = 'hidden'
	}

	const openAddTransactionModal = () => {
		financesModal.classList.add('active')
		window.scrollTo({ top: 213, left: 0, behavior: 'instant' })
	}

	const deleteAllIncome = () => {
		incomeList.textContent = ''
		incomeArr = []
		totalValuesAmount()

		for (const item in financesCookiesObject) {
			if (financesCookiesObject[item].transactionPattern == 'income') {
				delete financesCookiesObject[item]
				localStorage.setItem('finances', JSON.stringify(financesCookiesObject))
			}
		}
	}

	const deleteAllExpenses = () => {
		expensesList.textContent = ''
		expensesArr = []
		totalValuesAmount()

		for (const item in financesCookiesObject) {
			if (financesCookiesObject[item].transactionPattern == 'expenses') {
				delete financesCookiesObject[item]
				localStorage.setItem('finances', JSON.stringify(financesCookiesObject))
			}
		}
	}

	// DELETE ITEM AND UPDATE ARR'S
	const deleteItem = e => {
		const clickedItem = e.target.closest('li')
		const valueInItem = parseFloat(e.target.closest('div').firstElementChild.textContent)
		let clickedItemName

		if (
			e.target.classList.contains('finances__income--item-number-btn') ||
			e.target.classList.contains('finances__income--x-icon')
		) {
			incomeList.removeChild(clickedItem)
			const indexOfClickedValue = incomeArr.indexOf(valueInItem)
			incomeArr.splice(indexOfClickedValue, 1)
			clickedItemName = clickedItem.firstElementChild.lastChild.textContent
		} else if (
			e.target.classList.contains('finances__expenses--item-number-btn') ||
			e.target.classList.contains('finances__expenses--x-icon')
		) {
			expensesList.removeChild(clickedItem)
			const indexOfClickedValue = expensesArr.indexOf(valueInItem)
			expensesArr.splice(indexOfClickedValue, 1)
			clickedItemName = clickedItem.firstElementChild.lastChild.textContent
		}

		totalValuesAmount()

		for (const item in financesCookiesObject) {
			if (item == clickedItemName) {
				delete financesCookiesObject[item]
				localStorage.setItem('finances', JSON.stringify(financesCookiesObject))
			}
		}
	}

	// CHECK WHAT ICON SHOULD BE VIEWD
	const chooseProperIcon = (transactionType, transactionIcon) => {
		let iconClass

		switch (transactionType) {
			case 'Work':
				iconClass = 'fa-briefcase'
				break
			case 'Bills':
				iconClass = 'fa-hand-holding-dollar'
				break
			case 'Transport':
				iconClass = 'fa-car'
				break
			case 'Shopping':
				iconClass = 'fa-cart-shopping'
				break
			case 'Healthcare':
				iconClass = 'fa-stethoscope'
				break
			case 'Food':
				iconClass = 'fa-burger'
				break
			case 'Fun':
				iconClass = 'fa-film'
				break
			case 'Gifts':
				iconClass = 'fa-gift'
				break
			case 'Other':
				iconClass = 'fa-dice'
				break
			default:
				iconClass = 'fa-question'
				break
		}

		transactionIcon.classList.add('fa-solid')
		transactionIcon.classList.add(`${iconClass}`)
	}

	// CREATE NEW TASK
	const createNewItem = (transactionName, transactionNumber, transactionType, transactionPattern) => {
		const liItem = document.createElement('li')
		liItem.classList.add(`finances__${transactionPattern}--item`)

		const textContainer = document.createElement('div')
		textContainer.classList.add(`finances__${transactionPattern}--item-text`)

		const transactionIcon = document.createElement('i')
		transactionIcon.classList.add(`finances__${transactionPattern}--item-icon`)
		chooseProperIcon(transactionType, transactionIcon)

		const textName = document.createElement('p')
		textName.classList.add(`finances__${transactionPattern}--item-name`)
		textName.textContent = transactionName

		const numberContainer = document.createElement('div')
		numberContainer.classList.add(`finances__${transactionPattern}--item-number`)

		const numberAmount = document.createElement('span')
		numberAmount.textContent = `${transactionNumber}$`

		const numberDeleteBtn = document.createElement('button')
		numberDeleteBtn.classList.add(`finances__${transactionPattern}--item-number-btn`)
		numberDeleteBtn.setAttribute('aria-label', 'Delete transaction')

		const numberDeleteIcon = document.createElement('i')
		numberDeleteIcon.classList.add('fa-solid', 'fa-x', `finances__${transactionPattern}--x-icon`)

		numberDeleteBtn.append(numberDeleteIcon)
		textContainer.append(transactionIcon, textName)
		numberContainer.append(numberAmount, numberDeleteBtn)
		liItem.append(textContainer, numberContainer)

		if (transactionPattern == 'income') {
			incomeList.append(liItem)
			incomeArr.push(transactionNumber)
		} else {
			expensesList.append(liItem)
			expensesArr.push(transactionNumber)
		}

		totalValuesAmount()
		
		financesCookiesObject[transactionName] = { transactionName, transactionNumber, transactionType, transactionPattern }
		localStorage.setItem('finances', JSON.stringify(financesCookiesObject))
	}

	// CREATE VARIABLES FOR NEW TASK AND CHECK IF IT'S INCOME OR EXPENSES
	const createNewTransactionItem = () => {
		const transactionName = financesModalNameInput.value
		const transactionNumber = Number(Number(financesModalNumberInput.value).toFixed(2))
		const transactionType = financesModalSelect.value
		let transactionPattern

		transactionNumber > 0 ? (transactionPattern = 'income') : (transactionPattern = 'expenses')

		createNewItem(transactionName, transactionNumber, transactionType, transactionPattern)
	}

	// CHECK IF INPUTS ARE EMPTY | ADD TASK AND CLEAR INPUTS LATER
	const createNewTransaction = () => {
		financesModalNameInput.value == ''
			? (financesModalNameErr.style.visibility = 'visible')
			: (financesModalNameErr.style.visibility = 'hidden')
		financesModalSelect.value == '0'
			? (financesModalSelectErr.style.visibility = 'visible')
			: (financesModalSelectErr.style.visibility = 'hidden')

		if (financesModalNumberInput.value == '') {
			financesModalNumberErr.textContent = 'This field cannot be empty!'
			financesModalNumberErr.style.visibility = 'visible'
		} else if (financesModalNumberInput.value == '0') {
			financesModalNumberErr.textContent = 'Number must be greater or lower than 0!'
			financesModalNumberErr.style.visibility = 'visible'
		} else {
			financesModalNumberErr.style.visibility = 'hidden'
		}

		if (
			financesModalNameInput.value !== '' &&
			financesModalNumberInput.value !== '' &&
			financesModalNumberInput.value !== '0' &&
			financesModalSelect.value !== '0'
		) {
			createNewTransactionItem()
			clearFinancesModal()
			financesModal.classList.remove('active')
		}
	}

	// MANAGE OPTION BTN'S
	const manageFinancesBtns = e => {
		if (e.target.classList.contains('finances__tools--add')) {
			openAddTransactionModal()
		} else if (e.target.classList.contains('finances__tools--delincome')) {
			deleteAllIncome()
		} else if (e.target.classList.contains('finances__tools--delexpenses')) {
			deleteAllExpenses()
		} else if (e.target.classList.contains('finances__tools--delall')) {
			deleteAllIncome()
			deleteAllExpenses()
		}
	}

	// MANAGE BUTTONS IN MODAL BY CLICK
	const manageFinancesModalBtns = e => {
		if (e.target.classList.contains('finances__modal--btns-add')) {
			createNewTransaction()
		} else if (e.target.classList.contains('finances__modal--btns-cancel')) {
			financesModal.classList.remove('active')
			clearFinancesModal()
		}
	}

	// CONTROL BUTTONS IN MODAL BY KEYES
	const financesModalKeyes = e => {
		if (financesModal.classList.contains('active')) {
			if (e.keyCode === 13) {
				createNewTransaction()
			} else if (e.keyCode === 27) {
				financesModal.classList.remove('active')
				clearFinancesModal()
			}
		}
	}

	// CLOSING MODAL WHEN CLICK OTHER APP
	const closeFinancesModalWhenClickedOnNavItem = e => {
		if (
			e.target.classList.contains('nav__container--item') ||
			e.target.parentElement.classList.contains('nav__container--item')
		) {
			financesModal.classList.remove('active')
			clearFinancesModal()
		}
	}

	financesToolsBtns.addEventListener('click', manageFinancesBtns)
	financesModalBtns.addEventListener('click', manageFinancesModalBtns)
	financesContainer.addEventListener('click', deleteItem)
	document.addEventListener('keyup', financesModalKeyes)
	document.addEventListener('DOMContentLoaded', addTransactionFromCookies)
	navContainer.addEventListener('click', closeFinancesModalWhenClickedOnNavItem)
	totalValuesAmount()
}
