import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const Home = () => {
	return (
		<div className="Home">
			<header>
				<h1>Sammynhoca</h1>
			</header>
			<Link to="/login">
				<button className="Login">Login</button>
			</Link>
			<Link to="/game">
				<button className="Play">Play</button>
			</Link>
			<Link to="/about">
				<button className="About">About</button>
			</Link>
		</div>
	)
}

export default Home
