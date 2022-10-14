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
	let id = 0
	let editedTask = ''

	const checkIfTodoListEmpty = () => {
		todoContainer.children.length == 0
			? (errorEmptyTodo.style.display = 'block')
			: (errorEmptyTodo.style.display = 'none')
	}

	const createNewTask = () => {
		const task = document.createElement('li')
		task.classList.add('todo__item')
		task.dataset.id = id

		const taskName = document.createElement('p')
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

		id++

		checkIfTodoListEmpty()
	}

	const addNewTask = () => {
		if (addTaskInput.value.trim().length != 0) {
			createNewTask()
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
			console.log('delete')
		}
	}

	const checkDoneTask = e => {
		const doneTaskName = e.target.closest('div').previousElementSibling
		doneTaskName.classList.toggle('todo-checked')
	}

	const openTodoModal = e => {
		todoModal.classList.add('modal-active')
		editedTask = e.target.closest('div').previousElementSibling
		todoModalEditInput.value = editedTask.textContent
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

	const addTaskByEnter = e => {
		if (e.keyCode === 13) {
			addNewTask()
		}
	}

	todoModalEditBtn.addEventListener('click', editAddedTask)
	todoModalCancelBtn.addEventListener('click', closeModal)
	todoContainer.addEventListener('click', manageToolsOptions)
	addTaskInput.addEventListener('keyup', addTaskByEnter)
	addTaskBtn.addEventListener('click', addNewTask)
}
