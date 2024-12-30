export const setCookie = (name: string, value: string, days: number) => {
	const expires = new Date(Date.now() + days * 864e5).toUTCString()
	document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
		value
	)}; expires=${expires}; path=/; secure; SameSite=Strict`
}

export const getCookie = (name: string): string | undefined => {
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${encodeURIComponent(name)}=`)
	if (parts.length === 2) {
		const cookieValue = parts.pop()?.split(';').shift() 
		return cookieValue ? decodeURIComponent(cookieValue) : undefined 
	}
	return undefined 
}

export const deleteCookie = (name: string) => {
	setCookie(name, '', -1) 
}
