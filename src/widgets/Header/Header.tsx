import { useEffect, useState } from 'react'
import classesHeader from './Header.module.css'
import { Link, Outlet } from 'react-router-dom'
import Logo from '../../app/assets/logo-desk.png'
import { getCookie, deleteCookie } from '../../features/cookieUtils'
import { useCheckAuthQuery } from '../../app/store/slice/authApi'

const Header = () => {
	const [username, setUsername] = useState<string | null>(null)

	const token = getCookie('token')
	const { data, error } = useCheckAuthQuery(undefined, {
		skip: !token, // Запрос выполняется только если токен существует
	})

	useEffect(() => {
		if (data?.success) {
			setUsername(data.user.username) 
		} else if (error) {
			console.error('Ошибка авторизации:', error)
			handleLogout() 
		}
	}, [data, error])

	const handleLogout = () => {
		deleteCookie('username')
		deleteCookie('token')
		deleteCookie('userId')

		setUsername(null)
		window.location.href = '/authorization'
	}

	return (
		<>
			<header className={classesHeader.header__container}>
				<Link to='/'>
					<img src={Logo} alt='logo' className={classesHeader.header__logo} />
				</Link>
				<nav>
					{username ? (
						<>
							<Link to='/projects' className={classesHeader.nav__a}>
								<button className={classesHeader.header__loginBtn}>
									Мои проекты
								</button>
							</Link>
							<button
								onClick={handleLogout}
								className={classesHeader.header__loginBtn}
							>
								{username}
							</button>
						</>
					) : (
						<Link to='/authorization' className={classesHeader.nav__a}>
							<button className={classesHeader.header__loginBtn}>Войти</button>
						</Link>
					)}
				</nav>
			</header>
			<Outlet />
		</>
	)
}

export { Header }
