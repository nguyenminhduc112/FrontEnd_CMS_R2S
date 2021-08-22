$(document).ready(function () {
	$('#submit').click(function () {
		const data = getFormData()
		const errorMessage = getErrorMessage(data.title, data.brief, data.content)
		if (errorMessage)
			return handleError(errorMessage)
		$.post('http://localhost:3000/contents', data, () => {
			window.location.replace('?page=view-content')
		})
		return false
	})
})

function getFormData() {
	const title = $('#title').val()
	const brief = $('#brief').val()
	const content = $('#main-content').val()
	const created_date = formatDate(new Date())
	return { title, brief, content, created_date }
}

function getErrorMessage(title, brief, content) {
	if (!title)
		return 'Title is required'
	if (!brief)
		return 'Brief is required'
	if (!content)
		return 'Content is required'

	if (title.length < 10)
		return 'Title is too short'
	if (title.length > 200)
		return 'Title is too long'
	if (brief.length < 30)
		return 'Brief is too short'
	if (brief.length > 150)
		return 'Brief is too long'
	if (content.length < 50)
		return 'Content is too short'
	if (content.length > 1000)
		return 'Content is too long'

	return null
}

function handleError(message) {
	alert(message)
	return false
}

function formatDate(date) {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hours = date.getHours()
	const minutes = date.getMinutes()
	return `${year}/${month}/${day} ${hours}:${minutes}`
}
