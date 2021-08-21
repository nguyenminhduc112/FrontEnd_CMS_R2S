const registerForm = document.getElementById('register-form')

registerForm.addEventListener('submit', (event) => {
	event.preventDefault()
	window.location.replace('login.html')
	return false
})
