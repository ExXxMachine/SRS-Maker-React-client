import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classesSingin from '../app/styles/css/Singin.module.css'
import LoginIco from '../app/styles/images/login_ico.png'
import PasswordIco from '../app/styles/images/password_ico.png'
import { registration } from '../features/authFeatures'

const SinginPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const usernameChange = event => {
		setUsername(event.target.value)
	}
	const passwordChange = event => {
		setPassword(event.target.value)
	}

	const submit = e => {
		e.preventDefault()
		registration(username, password, setError)
	}
	return (
		<div className={classesSingin.singin__container}>
			<div className={classesSingin.singin__block}>
				<h1 className={classesSingin.singin__h1}>Регистрация</h1>
				<form action='login.html' id='form'>
					<div className={classesSingin.form__group}>
						<input
							className={classesSingin.form__field}
							placeholder='login'
							name='login'
							onChange={usernameChange}
							id='login'
							required
						/>
						<label for='login' className={classesSingin.form__label}>
							Логин
						</label>
						<img
							src={LoginIco}
							alt='login_ico'
							className={classesSingin.singin__ico}
						/>
					</div>
					<p className={classesSingin.singin__errorMess}>{error}</p>
					<div className={classesSingin.form__group}>
						<input
							type='password'
							className={classesSingin.form__field}
							placeholder='password'
							onChange={passwordChange}
							name='password'
							id='password'
							required
						/>
						<label for='password' className={classesSingin.form__label}>
							Пароль
						</label>
						<img
							src={PasswordIco}
							alt='password_ico'
							className={classesSingin.singin__ico}
						/>
					</div>
					<button
						className={classesSingin.singin__btn}
						type='submit'
						id='submit'
						onClick={submit}
					>
						Создать аккаунта
					</button>
					<Link
						to='/login'
						title='login'
						className={classesSingin.singin__reglink}
					>
						У меня уже есть аккаунта
					</Link>
				</form>
			</div>
		</div>
	)
}

export { SinginPage }
