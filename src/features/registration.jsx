import { Data } from '../entities/authEntities'

export const registration = async (username, password, setError) => {
	Data.username = username
	Data.password = password

	try {
		const response = await fetch('http://localhost:5000/auth/registration', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(Data),
		})
		const res = await response.json()
		if (res.token) {
			window.location.href = '/login'
		} else {
			setError(res.message)
		}
	} catch (error) {
		console.error('Error:', error)
	}
}
