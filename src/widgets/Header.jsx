import React from 'react'
import classesHeader from '../app/styles/css/Header.module.css'
import { Link, Outlet } from 'react-router-dom'
import Logo from '../app/styles/images/logo-desk.png'

const Header = () => {
	return (
		<>
			<header className={classesHeader.header__container}>
				<Link to='/'>
					<img src={Logo} alt='logo' className={classesHeader.header__logo} />
				</Link>
				<nav>
					<Link to='/login' className={classesHeader.nav__a}>
						<button className={classesHeader.header__loginBtn}>Войти</button>
					</Link>
				</nav>
			</header>
			<Outlet />
		</>
	)
}

export { Header }
