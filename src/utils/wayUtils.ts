import Way from '../models/Way'

export function horizontal(way: Way) {
	return way === Way.LEFT || way === Way.RIGHT
}

export function vertical(way: Way) {
	return way === Way.UP || way === Way.DOWN
}

export function ableToTurn(currentDirection: Way, nextDirection: Way): boolean {
	return horizontal(currentDirection) !== horizontal(nextDirection)
}

export function wayPositionChange(way: Way): [number, number] {
	switch (way) {
		case Way.UP:
			return [-1, 0]
		case Way.DOWN:
			return [1, 0]
		case Way.LEFT:
			return [0, -1]
		case Way.RIGHT:
			return [0, 1]
	}
}
