import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Home extends React.Component {

	render() {
		return (
			<div className="Home">
				<header>
					<h1>Sammynhoca</h1>
				</header>
				<Link to="/game">
					<button className="Play">Play</button>
				</Link>
			</div>
		);
	}

}

export default Home;
