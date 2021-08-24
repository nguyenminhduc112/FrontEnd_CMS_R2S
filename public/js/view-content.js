$(document).ready(function () {
	// Thực hiện fetch data và đợi 5s để hiển thị giao diện
	fetchData()
	setTimeout(() => {
		displayContent()
	}, 5000)
})

// Gọi API để lấy dữ liệu và load lên bảng
function fetchData() {
	const tableBody = document.getElementById('body')
	tableBody.innerHTML = ''

	$.ajax({
		url: 'http://localhost:3000/contents',
		method: 'get',
		success: function (data) {
			data.forEach((item) => {
				// Tạo 4 cột cho bảng dữ liệu
				const td1 = document.createElement('td')
				const td2 = document.createElement('td')
				const td3 = document.createElement('td')
				const td4 = document.createElement('td')
				td1.innerHTML = item.id
				td2.innerHTML = item.title
				td3.innerHTML = item.brief
				td4.innerHTML = item.created_date

				// Tạo dòng mới cho bảng và thêm vào bảng dữ liệu
				const tr = document.createElement('tr')
				tr.appendChild(td1)
				tr.appendChild(td2)
				tr.appendChild(td3)
				tr.appendChild(td4)
				tableBody.appendChild(tr)
			})
		},
		error: function () {
			// Nếu có lỗi thì thông báo
			alert('Error')
		}
	})
}

// Ban đầu bảng sẽ được ẩn đi, chỉ hiển thị loading
// Khi gọi hàm này thì ẩn loading và hiển thị bảng trở lại
function displayContent() {
	document.getElementById('loading').style.display = 'none';
	document.getElementById('main').style.display = 'block';
}
