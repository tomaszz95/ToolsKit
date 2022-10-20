export const financesManagerFunction = () => {
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

	let financesCookiesObject = {}
	let incomeArr = [200, 300, 800]
	let expensesArr = [200, 300, 200]

	const totalValuesAmount = () => {
		const reducesIncomeArr = incomeArr.reduce((prev, curr) => prev + curr, 0)
		const reducesExpensesArr = expensesArr.reduce((prev, curr) => prev + curr, 0)

		if (incomeArr.length == 0) {
			totalIncomeNumber.textContent = '0'
		} else {
			totalIncomeNumber.textContent = reducesIncomeArr
		}

		if (expensesArr.length == 0) {
			totalExpensesNumber.textContent = '0'
		} else {
			totalExpensesNumber.textContent = reducesExpensesArr
		}

		const bilansNumber = reducesIncomeArr - reducesExpensesArr
		totalBalanceNumber.textContent = bilansNumber
	}

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
	}

	const deleteAllIncome = () => {
		incomeList.textContent = ''
		incomeArr = []
		totalValuesAmount()
	}

	const deleteAllExpenses = () => {
		expensesList.textContent = ''
		expensesArr = []
		totalValuesAmount()
	}

	const deleteItem = () => {}

	const createNewIncomeItem = () => {
		console.log('income')
	}

	const createNewExpenseItem = () => {
		console.log('expense')
	}

	const createNewTransactionItem = () => {
		if (financesModalNumberInput.value > '0') {
			createNewIncomeItem()
		} else if (financesModalNumberInput.value < '0') {
			createNewExpenseItem()
		}
	}

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
			financesModalSelect.value !== '0'
		) {
			createNewTransactionItem()
			clearFinancesModal()
		}
	}

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

	const manageFinancesModalBtns = e => {
		if (e.target.classList.contains('finances__modal--btns-add')) {
			createNewTransaction()
		} else if (e.target.classList.contains('finances__modal--btns-cancel')) {
			financesModal.classList.remove('active')
			clearFinancesModal()
		}
	}

	financesToolsBtns.addEventListener('click', manageFinancesBtns)
	financesModalBtns.addEventListener('click', manageFinancesModalBtns)
	totalValuesAmount()
}
