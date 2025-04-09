import { Link } from 'react-router-dom'
import classesErrorPage from './Error.module.css'

const Error = () => {
	return (
		<div className={classesErrorPage.ErrorPage__container}>
			<h1>404 :(</h1>
			<p>Упс... Страницы не существует</p>
			<Link to={'/'} className={classesErrorPage.ErrorPage__Link}>
				Главная страница{' '}
			</Link>
		</div>
	)
}

export { Error }
