export const todoListFunction = () => {
	const todoContainer = document.querySelector('.todo__container')
	const errorEmptyTodo = document.querySelector('.todo__info--error')
	const addTaskBtn = document.querySelector('.todo__task--btn')
	const errorEmptyAddInput = document.querySelector('.todo__task--error')
	const addTaskInput = document.querySelector('.todo__task--input')
	const todoModal = document.querySelector('.todo__modal')
	const errorEmptyModalInput = document.querySelector('.todo__modal--error')
	const todoModalEditInput = document.querySelector('.todo__modal--input')
	const todoModalEditBtn = document.querySelector('.todo__modal--btn-edit')
	const todoModalCancelBtn = document.querySelector('.todo__modal--btn-cancel')
	const navContainer = document.querySelector('.nav__container')
	let editedTask = ''
	let taskCookiesObject = {}

	// CHECK IF TODOS IS EMPTY
	const checkIfTodoListEmpty = () => {
		if (todoContainer.children.length == 0) {
			errorEmptyTodo.style.display = 'block'
			errorEmptyTodo.textContent = 'No tasks on the list...'
		} else {
			errorEmptyTodo.style.display = 'none'
		}
	}

	// CREATE NEW TASK AND ADD TO COOKIES
	const createNewTask = (taskWritenName, taskStatus) => {
		const task = document.createElement('li')
		task.classList.add('todo__item')

		const taskName = document.createElement('p')
		taskName.classList.add('todo__item-task')
		taskName.textContent = taskWritenName

		const taskTools = document.createElement('div')
		taskTools.classList.add('todo__item-tools')

		const checkTaskBtn = document.createElement('button')
		checkTaskBtn.classList.add('todo__item-tools--check')
		checkTaskBtn.ariaLabel = 'Change to finished task'

		const checkTaskIcon = document.createElement('i')
		checkTaskIcon.classList.add('fa-solid')
		checkTaskIcon.classList.add('fa-check')
		checkTaskIcon.dataset.icon = taskStatus

		const editTaskBtn = document.createElement('button')
		editTaskBtn.classList.add('todo__item-tools--edit')
		editTaskBtn.ariaLabel = 'Edit task'
		editTaskBtn.textContent = 'EDIT'

		const deleteTaskBtn = document.createElement('button')
		deleteTaskBtn.classList.add('todo__item-tools--delete')
		deleteTaskBtn.ariaLabel = 'Delete task'

		const deleteTaskIcon = document.createElement('i')
		deleteTaskIcon.classList.add('fa-solid')
		deleteTaskIcon.classList.add('fa-x')

		checkTaskBtn.append(checkTaskIcon)
		deleteTaskBtn.append(deleteTaskIcon)
		taskTools.append(checkTaskBtn, editTaskBtn, deleteTaskBtn)
		task.append(taskName, taskTools)
		todoContainer.append(task)

		// CHECK CHECKED STATUS WHEN PAGE IS LOADING
		if (taskStatus == 'Checked') {
			taskName.classList.add('todo-checked')
		} else {
			taskName.classList.remove('todo-checked')
		}

		checkIfTodoListEmpty()

		taskCookiesObject[taskWritenName] = { taskWritenName, taskStatus }
		localStorage.setItem('tasks', JSON.stringify(taskCookiesObject))
	}

	// ADD TASKS FROM LOCAL STORAGE
	const addCookiesTasks = () => {
		const taskObjectFromCookies = JSON.parse(localStorage.getItem('tasks'))

		for (const task in taskObjectFromCookies) {
			const taskCookiesName = taskObjectFromCookies[task].taskWritenName
			const taskCookiesStatus = taskObjectFromCookies[task].taskStatus

			if (taskCookiesName == '') return

			createNewTask(taskCookiesName, taskCookiesStatus)
		}

		checkIfTodoListEmpty()
	}

	// ADD NEW TASK
	const addNewTask = () => {
		const taskName = addTaskInput.value.trim()
		let taskStatus = 'Unchecked'

		if (taskName.length != 0) {
			createNewTask(taskName, taskStatus)
			errorEmptyAddInput.style.display = 'none'
			addTaskInput.value = ''
		} else {
			errorEmptyAddInput.style.display = 'block'
		}
		window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: 'smooth' })
	}

	// MANAGE TASKS OPTIONS
	const manageToolsOptions = e => {
		if (todoContainer.children.length == 0) return

		if (e.target.classList.contains('todo__item-tools--check')) {
			checkDoneTask(e)
		} else if (e.target.classList.contains('todo__item-tools--edit')) {
			openTodoModal(e)
		} else if (e.target.classList.contains('todo__item-tools--delete')) {
			deleteTask(e)
		}
	}

	// ADD CHECKED ON TASK, UPDATE CHECK STATUS AND UPDATE LOKAL STORAGE
	const checkDoneTask = e => {
		const doneTaskItem = e.target.closest('div').previousElementSibling
		let doneTaskStatus
		doneTaskItem.classList.toggle('todo-checked')

		if (doneTaskItem.classList.contains('todo-checked')) {
			errorEmptyTodo.style.display = 'none'
			doneTaskStatus = 'Checked'
		} else {
			doneTaskStatus = 'Unchecked'
		}

		for (const task in taskCookiesObject) {
			if (task == doneTaskItem.textContent) {
				taskCookiesObject[task].taskStatus = doneTaskStatus

				localStorage.setItem('tasks', JSON.stringify(taskCookiesObject))
			}
		}
	}

	// OPEN MODAL AND BLOCK USING EDIT WHEN TASK IS CHECKED
	const openTodoModal = e => {
		const doneTaskName = e.target.closest('div').previousElementSibling

		if (doneTaskName.classList.contains('todo-checked')) {
			errorEmptyTodo.textContent = 'The task cannot be finished to be edited!'
			errorEmptyTodo.style.display = 'block'
		} else {
			todoModal.classList.add('modal-active')
			editedTask = e.target.closest('div').previousElementSibling
			todoModalEditInput.value = editedTask.textContent
			errorEmptyTodo.style.display = 'none'
		}

		window.scrollTo({ top: (document.body.scrollHeight - 400) / 2, left: 0, behavior: 'smooth' })
	}

	// EDIT TASK AND UPDATE OBJECT AND LOCAL STORAGE
	const editAddedTask = () => {
		let taskWritenName
		let taskStatus

		if (todoModalEditInput.value.length == 0) {
			errorEmptyModalInput.style.display = 'block'
		} else {
			for (const task in taskCookiesObject) {
				if (task == editedTask.textContent) {
					taskWritenName = todoModalEditInput.value
					taskStatus = taskCookiesObject[task].taskStatus

					delete taskCookiesObject[editedTask.textContent]
					taskCookiesObject[taskWritenName] = { taskWritenName, taskStatus }
					localStorage.setItem('tasks', JSON.stringify(taskCookiesObject))
				}
			}

			editedTask.textContent = todoModalEditInput.value
			closeModal()
		}
	}

	const closeModal = () => {
		errorEmptyModalInput.style.display = 'none'
		todoModalEditInput.value = ''
		todoModal.classList.remove('modal-active')
	}

	// DELETE TASK AND UPDATE LOCAL STORAGE
	const deleteTask = e => {
		const taskToDelete = e.target.closest('li')
		const taskNameToDelete = taskToDelete.firstChild.textContent

		for (const task in taskCookiesObject) {
			if (task == taskNameToDelete) {
				delete taskCookiesObject[task]
				localStorage.setItem('tasks', JSON.stringify(taskCookiesObject))
			}
		}

		todoContainer.removeChild(taskToDelete)
		checkIfTodoListEmpty()
	}

	// USING ENTER AND ESC
	const addTaskByEnter = e => {
		if (e.keyCode === 13) {
			addNewTask()
		}
	}

	const modalOptionsByKeys = e => {
		if (todoModal.classList.contains('modal-active')) {
			if (e.keyCode === 13) {
				editAddedTask()
			} else if (e.keyCode === 27) {
				closeModal()
			}
		}
	}

	// CLOSING MODAL WHEN CLICK OTHER APP
	const closeEditTodoWhenClickedOtherApp = e => {
		if (
			e.target.classList.contains('nav__container--item') ||
			e.target.parentElement.classList.contains('nav__container--item')
		) {
			closeModal()
		}
	}

	addTaskBtn.addEventListener('click', addNewTask)
	addTaskInput.addEventListener('keyup', addTaskByEnter)
	todoModalEditBtn.addEventListener('click', editAddedTask)
	todoModalCancelBtn.addEventListener('click', closeModal)
	todoContainer.addEventListener('click', manageToolsOptions)
	navContainer.addEventListener('click', closeEditTodoWhenClickedOtherApp)
	document.addEventListener('keyup', modalOptionsByKeys)
	document.addEventListener('DOMContentLoaded', addCookiesTasks)
}
