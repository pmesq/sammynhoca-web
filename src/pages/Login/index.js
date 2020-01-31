import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Login extends React.Component {

	render() {
		return (
			<div className="Login">
				<header>
					<h1>Sammynhoca</h1>
				</header>
				<p>Sorry, can't connect to server.</p>
				<Link to="/">
					<button className="Back">Go back to home</button>
				</Link>
			</div>
		);
	}

}

export default Login;
