import React from 'react'
import classesHeader from '../app/styles/css/Header.module.css'
import { Link, Outlet } from 'react-router-dom'
import Logo from '../app/styles/images/logo-desk.png'
import { logOut } from '../features/authFeatures'

const Header = () => {
	return (
		<>
			<header className={classesHeader.header__container}>
				<Link to='/'>
					<img src={Logo} alt='logo' className={classesHeader.header__logo} />
				</Link>
				<nav>
					{localStorage.getItem('username') ? (
						<button onClick={logOut} className={classesHeader.header__loginBtn}>
							{localStorage.getItem('username')} | Выйти
						</button>
					) : (
						<Link to='/login' className={classesHeader.nav__a}>
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
