import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const About = () => {
	return (
		<div className="About">
			<header>
				<h1>Sammynhoca</h1>
			</header>
			<p>
				Sammynhoca is a game developed by{' '}
				<a href="https://github.com/pcesarmf">Alface</a>, as a birthday
				present to <a href="https://github.com/SammuelGR">Sammy</a>, his
				good friend. Feel free to lead a worm and <span>clear</span> the
				dirt, growing up and earning sammoedas to buy <span>angel</span>
				ic items in the shop, to make your worm prettier and better.
				It's an easy task at all, you won't need any <span>manu</span>
				al.
			</p>
			<Link to="/">
				<button className="Home">Home</button>
			</Link>
		</div>
	)
}

export default About
