import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Game from './pages/Game'
import About from './pages/About'

const Routes = () => {
	return (
		<BrowserRouter>
			<Route path="/" exact component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/game" component={Game} />
			<Route path="/about" component={About} />
		</BrowserRouter>
	)
}

export default Routes
