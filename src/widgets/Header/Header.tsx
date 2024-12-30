import React, { useEffect, useState } from 'react'
import classesHeader from './Header.module.css'
import { Link, Outlet } from 'react-router-dom'
import Logo from '../../app/assets/logo-desk.png'
import { getCookie, deleteCookie } from '../../features/cookieUtils' 

const Header = () => {
	const [username, setUsername] = useState<string | null>(null)

	useEffect(() => {
		const storedUsername = getCookie('username')
		setUsername(storedUsername || null) 
	}, [])

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
