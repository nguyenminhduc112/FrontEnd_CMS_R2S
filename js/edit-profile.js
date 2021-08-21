const form = document.getElementById('profile-form')

form.addEventListener('submit', (event) => {
	event.preventDefault()
	window.location.replace('edit-profile.html')
	return false
})
