import { Data } from '../entities/authEntities'

export const authorization = async (username, password, setError) => {
	Data.username = username
	Data.password = password

	try {
		const response = await fetch('http://localhost:5000/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(Data),
		})
		const res = await response.json()
		if (res.token) {
			localStorage.setItem('username', Data.username)
			window.location.href = '/'
		} else {
			setError(res.message)
		}
	} catch (error) {
		console.error('Error:', error)
	}
}
