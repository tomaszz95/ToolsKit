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
	const arrayOfOptionButtons = [...noteOptionButtons.children]
	let clickedNoteTitle, clickedNoteContent

	// CHECK LENGTH OF THE UL LIST
	const checkIfNoteListEmpty = () => {
		if (noteList.children.length == 0) {
			noteListError.style.display = 'block'
		} else {
			noteListError.style.display = 'none'
		}
	}

	// CLEAR INPUTS
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

	// ADD NEW NOTE TO THE LIST AND CHECK FOR ERRORS IN INPUTS
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

	// DELETE NOTE / NOTES
	const deleteClickedNote = e => {
		const deleteNoteItem = e.target.closest('li')
		const deleteNoteTitle = deleteNoteItem.firstChild.textContent
		noteList.removeChild(deleteNoteItem)

		for (const key in notesObject) {
			if (key == deleteNoteTitle) {
				delete notesObject[key]
				localStorage.setItem('notes', JSON.stringify(notesObject))
			}
		}

		checkIfNoteListEmpty()

		if (noteBoxHeading.textContent == 'Edit note') {
			switchToDefault()
		}
	}

	const deleteAllNotes = () => {
		noteList.textContent = ''
		noteListError.style.display = 'block'
		localStorage.removeItem('notes')
	}

	// EDIT NOTE
	const editNoteInNote = e => {
		clearInputsAndErrors()
		clickedNoteTitle = e.target.closest('li').firstChild
		clickedNoteContent = e.target.closest('div').previousElementSibling

		if (noteBoxHeading.textContent == 'Add note') {
			noteBoxHeading.textContent = 'Edit note'
			noteInputTitle.value = clickedNoteTitle.textContent
			noteTextAreaContent.value = clickedNoteContent.textContent
			arrayOfOptionButtons.forEach(btn => {
				btn.classList.toggle('active')
			})
		} else if (noteBoxHeading.textContent == 'Edit note' && noteInputTitle.value !== '') {
			noteInputTitle.value = clickedNoteTitle.textContent
			noteTextAreaContent.value = clickedNoteContent.textContent
		}
	}

	const editNoteBtn = () => {
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
			for (const key in notesObject) {
				if (notesObject[key].noteName == clickedNoteTitle.textContent) {
					notesObject[key].noteName = noteInputTitle.value
					notesObject[key].noteContent = noteTextAreaContent.value

					localStorage.setItem('notes', JSON.stringify(notesObject))
				}
			}

			clickedNoteTitle.textContent = noteInputTitle.value
			clickedNoteContent.textContent = noteTextAreaContent.value

			switchToDefault()
		}
	}

	// SWITCH TO DEFAULT BUTTONS, CLEAR INPUTS, ERRORS AND HEADING
	const switchToDefault = () => {
		noteBoxHeading.textContent = 'Add note'
		arrayOfOptionButtons.forEach(btn => {
			btn.classList.toggle('active')
		})

		clearInputsAndErrors()
	}

	// MANAGE BUTTONS
	const manageNotesButtons = e => {
		if (e.target.classList.contains('note__box--buttons-add')) {
			addNewNote()
		} else if (e.target.classList.contains('note__box--buttons-clear')) {
			clearInputsAndErrors()
		} else if (e.target.classList.contains('note__box--buttons-deleteall')) {
			deleteAllNotes()
			clearInputsAndErrors()
		} else if (e.target.classList.contains('note__body--delete')) {
			deleteClickedNote(e)
		} else if (e.target.classList.contains('note__body--edit')) {
			editNoteInNote(e)
		} else if (e.target.classList.contains('note__box--buttons-edit')) {
			editNoteBtn()
		} else if (e.target.classList.contains('note__box--buttons-cancel')) {
			switchToDefault()
		}
	}

	document.addEventListener('click', manageNotesButtons)
	document.addEventListener('DOMContentLoaded', addNotesFromCookies)
	checkIfNoteListEmpty()
}
