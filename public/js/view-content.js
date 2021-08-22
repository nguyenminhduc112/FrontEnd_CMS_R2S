$(document).ready(function () {
	fetchData()
	setTimeout(() => {
		displayContent()
	}, 5000)
})

function fetchData() {
	const tableBody = document.getElementById('body')
	tableBody.innerHTML = ''

	$.ajax({
		url: 'http://localhost:3000/contents',
		method: 'get',
		success: function (data) {
			data.forEach((item) => {
				const tr = document.createElement('tr')
				const td1 = document.createElement('td')
				const td2 = document.createElement('td')
				const td3 = document.createElement('td')
				const td4 = document.createElement('td')
				td1.innerHTML = item.id
				td2.innerHTML = item.title
				td3.innerHTML = item.brief
				td4.innerHTML = item.created_date
				tr.appendChild(td1)
				tr.appendChild(td2)
				tr.appendChild(td3)
				tr.appendChild(td4)
				tableBody.appendChild(tr)
			})
		},
		error: function () {
			alert('Error')
		}
	})
}

function displayContent() {
	document.getElementById('loading').style.display = 'none'
	document.getElementById('main').style.display = 'unset'
}
