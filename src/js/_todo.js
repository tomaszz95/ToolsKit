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
	let editedTask = ''
	let taskName
	let taskNamesForCookies = []

	const checkIfTodoListEmpty = () => {
		if (todoContainer.children.length == 0) {
			errorEmptyTodo.style.display = 'block'
			errorEmptyTodo.textContent = 'No tasks on the list...'
		} else {
			errorEmptyTodo.style.display = 'none'
		}
	}

	const createNewTask = () => {
		const task = document.createElement('li')
		task.classList.add('todo__item')

		taskName = document.createElement('p')
		taskName.classList.add('todo__item-task')
		taskName.textContent = addTaskInput.value.trim()

		const taskTools = document.createElement('div')
		taskTools.classList.add('todo__item-tools')

		const checkTaskBtn = document.createElement('button')
		checkTaskBtn.classList.add('todo__item-tools--check')
		checkTaskBtn.ariaLabel = 'Change to finished task'

		const checkTaskIcon = document.createElement('i')
		checkTaskIcon.classList.add('fa-solid')
		checkTaskIcon.classList.add('fa-check')

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

		checkIfTodoListEmpty()
	}

	const addCookiesTasks = () => {
		if (localStorage.getItem('tasks') == null) {
			return
		} else {
			taskNamesForCookies = localStorage.getItem('tasks').split(',')
			taskNamesForCookies.forEach(task => {
				createNewTask()
				taskName.textContent = task
			})
		}
	}

	const addNewTask = () => {
		if (addTaskInput.value.trim().length != 0) {
			createNewTask()
			taskNamesForCookies.push(taskName.textContent)
			localStorage.setItem('tasks', taskNamesForCookies)
			errorEmptyAddInput.style.display = 'none'
			addTaskInput.value = ''
		} else {
			errorEmptyAddInput.style.display = 'block'
		}
	}

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

	const checkDoneTask = e => {
		const doneTaskName = e.target.closest('div').previousElementSibling
		doneTaskName.classList.contains('todo-checked') ? (errorEmptyTodo.style.display = 'none') : false
		doneTaskName.classList.toggle('todo-checked')
	}

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
	}

	const editAddedTask = () => {
		if (todoModalEditInput.value.length == 0) {
			errorEmptyModalInput.style.display = 'block'
		} else {
			editedTask.textContent = todoModalEditInput.value
			closeModal()
		}
	}

	const closeModal = () => {
		errorEmptyModalInput.style.display = 'none'
		todoModalEditInput.value = ''
		todoModal.classList.remove('modal-active')
	}

	const deleteTask = e => {
		const taskToDelete = e.target.closest('li')
		const taskNameToDelete = taskToDelete.firstChild.textContent
		const indexOfDeletedElement = taskNamesForCookies.indexOf(taskNameToDelete)
		taskNamesForCookies.splice(indexOfDeletedElement, 1)
		localStorage.setItem('tasks', taskNamesForCookies)
		if (taskNamesForCookies.length == 0) {
			localStorage.removeItem('tasks')
		}
		
		todoContainer.removeChild(taskToDelete)
		checkIfTodoListEmpty()
	}

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

	addTaskBtn.addEventListener('click', addNewTask)
	addTaskInput.addEventListener('keyup', addTaskByEnter)
	todoModalEditBtn.addEventListener('click', editAddedTask)
	todoModalCancelBtn.addEventListener('click', closeModal)
	todoContainer.addEventListener('click', manageToolsOptions)
	document.addEventListener('keyup', modalOptionsByKeys)
	document.addEventListener('DOMContentLoaded', addCookiesTasks)
}
