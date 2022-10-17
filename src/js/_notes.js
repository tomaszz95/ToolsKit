export const notesAppFunction = () => {
	const noteList = document.querySelector('.note__list')
	const noteListError = document.querySelector('.note__list--error')
	const noteBoxHeading = document.querySelector('.note__box--heading')
	const noteInputTitle = document.querySelector('.note__box--input-title')
	const noteInputError = document.querySelector('.note__box--title--error')
	const noteTextAreaContent = document.querySelector('.note__box--textarea-content')
	const noteTextAreaError = document.querySelector('.note__box--content--error')
	const noteOptionButtons = document.querySelector('.note__box--buttons')
	const notesObject = {}

	const checkIfNoteListEmpty = () => {
		if (noteList.children.length == 0) {
			noteListError.style.display = 'block'
		} else {
			noteListError.style.display = 'none'
		}
	}

	const clearInputsAndErrors = () => {
		noteInputTitle.value = ''
		noteInputError.style.display = 'none'
		noteTextAreaContent.value = ''
		noteTextAreaError.style.display = 'none'
	}

	// CREATE NEW NOTE
	const createNewNote = () => {
		const note = document.createElement('li')
		note.classList.add('note__body')

		const noteTitle = document.createElement('h3')
		noteTitle.classList.add('note__body--title')
		noteTitle.textContent = noteInputTitle.value.trim()

		const noteContentBox = document.createElement('p')
		noteContentBox.classList.add('note__body--content')
		noteContentBox.textContent = noteTextAreaContent.value.trim()

		const noteTools = document.createElement('div')
		noteTools.classList.add('note__body--tools')

		const noteEditTool = document.createElement('a')
		noteEditTool.classList.add('note__body--edit')
		noteEditTool.setAttribute('aria-label', 'Edit note')
		noteEditTool.setAttribute('href', '#note-content')
		noteEditTool.textContent = 'Edit note'

		const noteDeleteTool = document.createElement('button')
		noteDeleteTool.classList.add('note__body--delete')
		noteDeleteTool.setAttribute('aria-label', 'Delete note')
		noteDeleteTool.textContent = 'Delete note'

		noteTools.append(noteEditTool, noteDeleteTool)
		note.append(noteTitle, noteContentBox, noteTools)
		noteList.append(note)
	}

	const addNewNote = () => {
		if (noteInputTitle.value == '' && noteTextAreaContent.value == '') {
			noteInputError.style.display = 'block'
			noteTextAreaError.style.display = 'block'
		} else if (noteInputTitle.value !== '' && noteTextAreaContent.value == '') {
			noteInputError.style.display = 'none'
			noteTextAreaError.style.display = 'block'
		} else if (noteInputTitle.value == '' && noteTextAreaContent.value !== '') {
			noteInputError.style.display = 'block'
			noteTextAreaError.style.display = 'none'
		} else if (noteInputTitle.value !== '' && noteTextAreaContent.value !== '') {
			createNewNote()
			manageCookies()
			checkIfNoteListEmpty()
			clearInputsAndErrors()
		}
	}

	// COOKIES
	const manageCookies = () => {
		const lastNote = document.querySelector('.note__list li:last-child')
		const noteName = lastNote.firstChild.textContent
		const noteContent = lastNote.firstChild.nextSibling.textContent

		notesObject[noteName] = { noteName, noteContent }
		localStorage.setItem('notes', JSON.stringify(notesObject))
	}

	const addNotesFromCookies = () => {
		const notesFromStorage = JSON.parse(localStorage.getItem('notes'))

		for (const key in notesFromStorage) {
			const noteName = notesFromStorage[key].noteName
			const noteContent = notesFromStorage[key].noteContent

			if (noteName == '') return

			createNewNote()
			const lastNote = document.querySelector('.note__list li:last-child')
			lastNote.firstChild.textContent = noteName
			lastNote.firstChild.nextSibling.textContent = noteContent

			checkIfNoteListEmpty()

			notesObject[noteName] = { noteName, noteContent }
			localStorage.setItem('notes', JSON.stringify(notesObject))
		}
	}

	const deleteAllNotes = () => {
		noteList.textContent = ''
		clearInputsAndErrors()
		noteListError.style.display = 'block'
		localStorage.removeItem('notes')
	}

	// MANAGE BUTTONS
	const manageNotesButtons = e => {
		if (e.target.classList.contains('note__box--buttons-add')) {
			addNewNote()
		} else if (e.target.classList.contains('note__box--buttons-clear')) {
			clearInputsAndErrors()
		} else if (e.target.classList.contains('note__box--buttons-deleteall')) {
			deleteAllNotes()
		}
	}

	noteOptionButtons.addEventListener('click', manageNotesButtons)
	document.addEventListener('DOMContentLoaded', addNotesFromCookies)
	checkIfNoteListEmpty()
}
