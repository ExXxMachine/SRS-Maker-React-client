export const logOut = () => {
	localStorage.setItem('username', '')
	window.location.href = '/'
}
