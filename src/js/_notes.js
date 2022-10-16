export const notesAppFunction = () => {
	const noteList = document.querySelector('.note__list')
    const noteListError = document.querySelector('.note__list--error')
    const noteBoxHeading = document.querySelector('.note__box--heading')
	const noteInputTitle = document.querySelector('.note__box--input-title')
	const noteInputError = document.querySelector('.note__box--title--error')
	const noteTextAreaContent = document.querySelector('.note__box--textarea-content')
	const noteTextAreaError = document.querySelector('.note__box--content--error')
    const noteOptionButtons = document.querySelector('.note__box--buttons')

    const checkIfNoteListEmpty = () => {
		if (noteList.children.length == 0) {
			noteListError.style.display = 'block'
		} else {
			noteListError.style.display = 'none'
		}
	}


checkIfNoteListEmpty()
}
