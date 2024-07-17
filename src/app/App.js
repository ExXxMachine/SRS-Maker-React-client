import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Header, Footer } from '../widgets/authWidgets'
import { HomePage } from '../pages/authPages'
import './styles/css/rest.css'
function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Header />}>
					<Route path='/' element={<Footer />}>
						<Route path='/' element={<HomePage />} />
					</Route>
				</Route>
			</Routes>
		</div>
	)
}

export default App
