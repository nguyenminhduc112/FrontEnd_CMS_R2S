const form = document.getElementById('content-form')

form.addEventListener('submit', (event) => {
	event.preventDefault()
	window.location.replace('view-content.html')
	return false
})
