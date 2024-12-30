import React from 'react'
import GitHubIco from '../../app/assets/GitHub.png'
import classesFooter from './Footer.module.css'
import { Outlet } from 'react-router'

const Footer = () => {
	return (
		<>
			<Outlet />
			<footer className={classesFooter.footer__container}>
				Учебный проект
				<a
					href='https://github.com/ExXxMachine'
					className={classesFooter.footer__githubLink}
				>
					<img
						src={GitHubIco}
						alt='GitHubIco'
						className={classesFooter.footer__githubIco}
					/>
				</a>
			</footer>
		</>
	)
}

export { Footer }
