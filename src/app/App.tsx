import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Header, Footer } from '../widgets/authWidgets'
import { HomePage, AuthPage, ProjectList, Project, Error } from '../pages/authPages'
import './rest.css'
function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Header />}>
					<Route path='/' element={<Footer />}>
						<Route path='/' element={<HomePage />} />
						<Route path='/authorization' element={<AuthPage />} />
						<Route path='/projects' element={<ProjectList />} />
						<Route path='/project/:id' element={<Project />} />
						<Route path='/*' element={<Error/>} />
					</Route>
				</Route>
			</Routes>
		</div>
	)
}

export default App
