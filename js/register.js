const form = document.getElementById('register-form')

form.addEventListener('submit', (event) => {
	event.preventDefault()
	window.location.replace('login.html')
	return false
})
