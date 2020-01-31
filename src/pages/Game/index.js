import React from 'react';
import GameController from '../../controller/GameController';
import Direction from '../../model/Direction';
import './index.css';

class Game extends React.Component {

	constructor() {

		super();

		this.PLAYFIELD_SIZE = 25;

		GameController.start(this.PLAYFIELD_SIZE);
		const { blocks, score } = GameController.get();
		this.state = { blocks, score };

		document.addEventListener('keypress', this.handleKeyPress.bind(this));

		const that = this;
		setInterval(() => that.processTick(), 100);

	}

	handleKeyPress(event) {
		switch (event.key) {
			case 'w': GameController.move(Direction.UP); break;
			case 'a': GameController.move(Direction.LEFT); break;
			case 's': GameController.move(Direction.DOWN); break;
			case 'd': GameController.move(Direction.RIGHT); break;
			default:
		}
	}

	processTick() {
		GameController.run();
		const { blocks, score } = GameController.get();
		this.setState({ blocks, score });
	}

	render() {

		const blockElements = [];
		let blockKey = 0;
		for (let row of this.state.blocks) {
			for (let block of row) {
				blockElements.push(
					<div
						className="Block"
						key={ blockKey }
						style={{ background: `${ block }` }}
					/>
				);

				blockKey++;
			}
		}

		const playfieldSize = this.PLAYFIELD_SIZE;

		return (
			<div className="Game">
				<header>
					<h1>Sammynhoca • { this.state.score } </h1>
				</header>
				<div className="Playfield" style={{ gridTemplateColumns: `repeat(${ playfieldSize }, auto)`}}>
					{ blockElements }
				</div>
				<button className="Restart" onClick={ () => { GameController.start(playfieldSize) } } >Restart</button>
			</div>
		);
	}

}

export default Game;
