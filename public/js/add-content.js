$(document).ready(function () {
	$('#submit').click(function () {
		// Lấy dữ liệu user nhập và kiểm tra, nếu có lỗi thì thông báo
		const data = getFormData()
		const errorMessage = getErrorMessage(data.title, data.brief, data.content)
		if (errorMessage)
			return handleError(errorMessage)

		// Gọi post request để thêm content
		$.post('http://localhost:3000/contents', data, () => {
			window.location.replace('?page=view-content')
		})
		return false
	})
})

// Lấy các dữ liệu từ form
function getFormData() {
	const title = $('#title').val()
	const brief = $('#brief').val()
	const content = $('#main-content').val()
	const created_date = formatDate(new Date())
	return { title, brief, content, created_date }
}

// Validate các dữ liệu form content
// Trả về thông báo lỗi, hoặc null nếu không có lỗi
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

// Hành động xử lý khi có lỗi xảy ra
function handleError(message) {
	alert(message)
	return false
}

// Hàm định dạng ngày tháng theo chuẩn dd/MM/yyyy hh:mm
function formatDate(date) {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hours = date.getHours()
	const minutes = date.getMinutes()
	return `${day}/${month}/${year} ${hours}:${minutes}`
}
