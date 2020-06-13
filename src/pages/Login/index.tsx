import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const Login = () => {
	return (
		<div className="Login">
			<header>
				<h1>Sammynhoca</h1>
			</header>
			<p>Sorry, can't connect to the server.</p>
			<p>In fact, it does not yet exist.</p>
			<Link to="/">
				<button className="Back">Go back to home</button>
			</Link>
		</div>
	)
}

export default Login
