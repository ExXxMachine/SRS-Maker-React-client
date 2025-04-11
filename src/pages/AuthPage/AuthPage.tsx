import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
	useLoginMutation,
	useRegisterMutation,
} from '../../app/store/slice/authApi'
import classesAuth from './AuthPage.module.css'
import { setCookie } from '../../features/cookieUtils'
import { Spinner } from '../../shared/authShared'

const AuthPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [isLoginMode, setIsLoginMode] = useState(true)

	const [login, { isLoading: isLoggingIn, error: loginError }] =
		useLoginMutation()
	const [register, { isLoading: isRegistering, error: registerError }] =
		useRegisterMutation()

	// Функция отправки данных на сервер
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			if (isLoginMode) {
				const res = await login({ username, password }).unwrap()
				setCookie('token', res.token, 7)
				window.location.href = '/projects'
			} else {
				await register({ username, password }).unwrap()
				window.location.href = '/authorization'
			}
		} catch (error) {
			console.error('Error:', error)
		}
	}

	if (isLoggingIn || isRegistering) return <Spinner />

	return (
		<>
			<Helmet>
				<title>
					{isLoginMode ? 'Вход | SRS-Maker' : 'Регистрация | SRS-Maker'}
				</title>
			</Helmet>
			<div className={classesAuth.auth__container}>
				<div className={classesAuth.auth__block}>
					<h1 className={classesAuth.auth__h1}>
						{isLoginMode ? 'Вход' : 'Регистрация'}
					</h1>
					<form onSubmit={handleSubmit}>
						<div className={classesAuth.form__group}>
							<input
								className={classesAuth.form__field}
								placeholder='Логин'
								value={username}
								onChange={e => setUsername(e.target.value)}
								required
							/>
							<label htmlFor='login' className={classesAuth.form__label}>
								Логин
							</label>
						</div>
						<p className={classesAuth.auth__errorMess}>
							{/* Отображение ошибок регистрации или входа */}
							{isLoginMode && loginError?.data?.message && (
								<span>{loginError.data.message}</span>
							)}
							{!isLoginMode && registerError?.data?.message && (
								<span>{registerError.data.message}</span>
							)}
						</p>
						<div className={classesAuth.form__group}>
							<input
								type='password'
								className={classesAuth.form__field}
								placeholder='Пароль'
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
							/>
							<label htmlFor='password' className={classesAuth.form__label}>
								Пароль
							</label>
						</div>
						<button
							className={classesAuth.auth__btn}
							type='submit'
							disabled={isLoggingIn || isRegistering}
						>
							{isLoginMode ? 'Войти' : 'Создать аккаунт'}
						</button>
						<Link
							to='#'
							onClick={() => setIsLoginMode(!isLoginMode)}
							className={classesAuth.auth__toggleLink}
						>
							{isLoginMode ? 'У меня нет аккаунта' : 'У меня уже есть аккаунт'}
						</Link>
					</form>
				</div>
			</div>
		</>
	)
}

export { AuthPage }
