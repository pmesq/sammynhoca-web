import Block from '../model/Block';
import Direction from '../model/Direction';

class GameController {

	constructor() {
		this.running = false;
	}

	start(playfieldSize) {
		this.blocks = [];
		this.playfieldSize = playfieldSize;
		for (let i = 0; i < this.playfieldSize; i++) {
			const row = [];
			for (let j = 0; j < this.playfieldSize; j++) {
				row.push(Block.EMPTY);
			}
			this.blocks.push(row);
		}
		this.wormQueue = [[0, 0]];
		for (let block of this.wormQueue) {
			this.blocks[block[0]][block[1]] = Block.WORM;
		}
		this.currentDirection = Direction.RIGHT;
		this.directionQueue = [];
		this.score = 0;
		this.running = true;
		let nextGoal;
		do {
			nextGoal = [
				Math.floor(Math.random() * this.playfieldSize),
				Math.floor(Math.random() * this.playfieldSize)
			];
		} while (this.blocks[nextGoal[0]][nextGoal[1]] === Block.WORM);
		this.blocks[nextGoal[0]][nextGoal[1]] = Block.GOAL;
	}

	get() {
		const { blocks, score } = this;
		return { blocks, score };
	}

	run() {
		if(!this.running)
			return;
		if(this.directionQueue.length) {
			this.currentDirection = this.directionQueue.shift();
		}
		const wormHead = this.wormQueue[this.wormQueue.length - 1];
		const nextWormHead = [wormHead[0] + this.currentDirection[0], wormHead[1] + this.currentDirection[1]];
		for (let index of nextWormHead) {
			if (index < 0 || index >= this.playfieldSize) {
				this.running = false;
				return;
			}
		}
		switch (this.blocks[nextWormHead[0]][nextWormHead[1]]) {
			case Block.WORM:
				this.running = false;
			break;
			case Block.EMPTY:
				this.wormQueue.push(nextWormHead);
				this.blocks[nextWormHead[0]][nextWormHead[1]] = Block.WORM;
				const wormTail = this.wormQueue.shift();
				this.blocks[wormTail[0]][wormTail[1]] = Block.EMPTY;
			break;
			case Block.GOAL:
				this.wormQueue.push(nextWormHead);
				this.blocks[nextWormHead[0]][nextWormHead[1]] = Block.WORM;
				this.score++;
				let nextGoal;
				do {
					nextGoal = [
						Math.floor(Math.random() * this.playfieldSize),
						Math.floor(Math.random() * this.playfieldSize)
					];
				} while (this.blocks[nextGoal[0]][nextGoal[1]] === Block.WORM);
				this.blocks[nextGoal[0]][nextGoal[1]] = Block.GOAL;
			break;
			default:
		}
	}

	move(direction) {
		const lastDirection = this.directionQueue[this.directionQueue.length - 1] || this.currentDirection;
		switch (direction) {
			case Direction.UP:
				if (lastDirection[1])
					this.directionQueue.push(Direction.UP);
			break;
			case Direction.LEFT:
				if (lastDirection[0])
					this.directionQueue.push(Direction.LEFT);
			break;
			case Direction.DOWN:
				if (lastDirection[1])
					this.directionQueue.push(Direction.DOWN);
			break;
			case Direction.RIGHT:
				if (lastDirection[0])
					this.directionQueue.push(Direction.RIGHT);
			break;
			default:
		}
	}

}

export default new GameController();
