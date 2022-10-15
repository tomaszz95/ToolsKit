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
	let taskIndex = 1

	const checkIfTodoListEmpty = () => {
		if (todoContainer.children.length == 0) {
			errorEmptyTodo.style.display = 'block'
			errorEmptyTodo.textContent = 'No tasks on the list...'
		} else {
			errorEmptyTodo.style.display = 'none'
		}
	}

	// CREATE NEW TASK AND INCREASE DATA INDEX
	const createNewTask = () => {
		const task = document.createElement('li')
		task.classList.add('todo__item')

		taskName = document.createElement('p')
		taskName.classList.add('todo__item-task')
		taskName.textContent = addTaskInput.value.trim()
		taskName.dataset.todo = taskIndex

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

		taskIndex += 2
		checkIfTodoListEmpty()
	}

	// ADD TASKS FROM LOCAL STORAGE AND ADD CLASS 'CHECKED' ON TASK IF USED EARLIER
	const addCookiesTasks = () => {
		if (localStorage.getItem('tasks') == null) {
			return
		} else {
			taskNamesForCookies = localStorage.getItem('tasks').split(',')
			
			for (let i = 0; i < taskNamesForCookies.length; i++) {
				createNewTask()
				taskName.textContent = taskNamesForCookies[i]
				i += 1

				const elementID = taskNamesForCookies.indexOf(taskName.textContent) + 1
				const elementDataSet = taskName.dataset.todo

				if (taskNamesForCookies[elementID] == 'true') {
					document.querySelector(`p[data-todo='${elementDataSet}`).classList.add('todo-checked')
				} 
			}
		}
	}

	// ADD NEW TASK, PUSH TASKS AND STARTED STATE FOR CHECKED TO LOCAL STORAGE ALSO CLEAN INPUTS / ERRORS
	const addNewTask = () => {
		if (addTaskInput.value.trim().length != 0) {
			createNewTask()
			taskNamesForCookies.push(taskName.textContent)
			taskNamesForCookies.push('false')
			localStorage.setItem('tasks', taskNamesForCookies)
			errorEmptyAddInput.style.display = 'none'
			addTaskInput.value = ''
		} else {
			errorEmptyAddInput.style.display = 'block'
		}
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
	
	// ADD CHECKED ON TASK, SPLICE ACTUAL CHECKED STATE IN ARRAY AND PUSH TO LOCAL STORAGE
	const checkDoneTask = e => {
		const doneTaskName = e.target.closest('div').previousElementSibling
		const indexOfClickedTask = taskNamesForCookies.indexOf(doneTaskName.textContent) + 1
		doneTaskName.classList.toggle('todo-checked')

		if (doneTaskName.classList.contains('todo-checked')) {
			errorEmptyTodo.style.display = 'none'
			taskNamesForCookies.splice(indexOfClickedTask, 1, 'true')
		} else {
			taskNamesForCookies.splice(indexOfClickedTask, 1, 'false')
		}

		localStorage.setItem('tasks', taskNamesForCookies)
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
	}

	// EDIT TASK AND SPLICE EDITED NAME IN LOCAL STORAGE
	const editAddedTask = () => {
		if (todoModalEditInput.value.length == 0) {
			errorEmptyModalInput.style.display = 'block'
		} else {
			const elementID = taskNamesForCookies.indexOf(editedTask.textContent)
			taskNamesForCookies.splice(elementID, 1, todoModalEditInput.value)
			editedTask.textContent = todoModalEditInput.value
			localStorage.setItem('tasks', taskNamesForCookies)
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
		const indexOfDeletedElement = taskNamesForCookies.indexOf(taskNameToDelete)
		
		taskNamesForCookies.splice(indexOfDeletedElement, 2)
		localStorage.setItem('tasks', taskNamesForCookies)

		if (taskNamesForCookies.length == 0) {
			localStorage.removeItem('tasks')
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

	addTaskBtn.addEventListener('click', addNewTask)
	addTaskInput.addEventListener('keyup', addTaskByEnter)
	todoModalEditBtn.addEventListener('click', editAddedTask)
	todoModalCancelBtn.addEventListener('click', closeModal)
	todoContainer.addEventListener('click', manageToolsOptions)
	document.addEventListener('keyup', modalOptionsByKeys)
	document.addEventListener('DOMContentLoaded', addCookiesTasks)
}
