import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classesLogin from '../app/styles/css/Login.module.css'
import LoginIco from '../app/styles/images/login_ico.png'
import PasswordIco from '../app/styles/images/password_ico.png'
import { authorization } from '../features/authFeatures'

const LoginPage = () => {
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
		authorization(username, password, setError)
	}

	return (
		<div className={classesLogin.login__container}>
			<div className={classesLogin.login__block}>
				<h1 className={classesLogin.login__h1}>Вход</h1>
				<form action='login.html' id='form'>
					<div className={classesLogin.form__group}>
						<input
							className={classesLogin.form__field}
							placeholder='login'
							onChange={usernameChange}
							name='login'
							id='login'
							required
						/>
						<label htmlFor='login' className={classesLogin.form__label}>
							Логин
						</label>
						<img
							src={LoginIco}
							alt='login_ico'
							className={classesLogin.login__ico}
						/>
					</div>
					<p className={classesLogin.login__errorMess}>{error}</p>

					<div className={classesLogin.form__group}>
						<input
							type='password'
							className={classesLogin.form__field}
							placeholder='password'
							onChange={passwordChange}
							name='password'
							id='password'
							required
						/>
						<label htmlFor='password' className={classesLogin.form__label}>
							Пароль
						</label>
						<img
							src={PasswordIco}
							alt='password_ico'
							className={classesLogin.login__ico}
						/>
					</div>
					<button
						className={classesLogin.login__btn}
						type='submit'
						id='submit'
						onClick={submit}
					>
						Войти
					</button>
					<Link
						to='/singin'
						title='singin'
						className={classesLogin.login__reglink}
					>
						У меня нет аккаунта
					</Link>
				</form>
			</div>
		</div>
	)
}

export { LoginPage }
