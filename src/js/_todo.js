export const todoListFunction = () => {
	const errorEmptyTodo = document.querySelector('.todo__info--error')
	const errorEmptyAddInput = document.querySelector('.todo__task--error')
	const errorEmptyModalInput = document.querySelector('.todo__modal--error')
	const todoContainer = document.querySelector('.todo__container')
	const addTaskBtn = document.querySelector('.todo__task--btn')
	const addTaskInput = document.querySelector('.todo__task--input')
	let id = 0

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

	const addTask = () => {
		if (addTaskInput.value.trim().length != 0) {
			createNewTask()
			errorEmptyAddInput.style.display = 'none'
			addTaskInput.value = ''
		} else {
			errorEmptyAddInput.style.display = 'block'
		}
	}

	addTaskBtn.addEventListener('click', addTask)
}
