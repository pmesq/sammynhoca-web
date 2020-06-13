import Block from '../models/Block'
import Way from '../models/Way'
import {
	createPlayfield,
	randomGroundPosition,
	validPosition,
} from '../utils/playfieldUtils'
import Playfield from '../models/Playfield'
import { ableToTurn, wayPositionChange } from '../utils/wayUtils'
import { isBlockWorm } from '../utils/blockUtils'

let playfield: Playfield
let worm: [number, number][]
let turnQueue: Way[]
let score: number
let currentWay: Way
let running: boolean = false
let ticks: number

function nextTurn() {
	const way = turnQueue.shift()
	if (way !== undefined) currentWay = way
}

function willCrash([wormHeadRow, wormHeadCol]: [number, number]): boolean {
	return (
		!validPosition(playfield, wormHeadRow, wormHeadCol) ||
		isBlockWorm(playfield.blocks[wormHeadRow][wormHeadCol])
	)
}

function eat(): void {
	score++

	const position = randomGroundPosition(playfield)
	if (position) {
		const [row, col] = position
		playfield.blocks[row][col] = Block.FOOD
	}
}

function crawl(): boolean {
	const [rowChange, colChange] = wayPositionChange(currentWay)
	const [previousWormHeadRow, previousWormHeadCol] = worm[worm.length - 1]
	const [newWormHeadRow, newWormHeadCol] = [
		previousWormHeadRow + rowChange,
		previousWormHeadCol + colChange,
	]

	if (willCrash([newWormHeadRow, newWormHeadCol])) return (running = false)

	if (playfield.blocks[newWormHeadRow][newWormHeadCol] === Block.FOOD) {
		eat()
	} else {
		const previousWormTail = worm.shift()
		if (previousWormTail) {
			const [previousWormTailRow, previousWormTailCol] = previousWormTail
			playfield.blocks[previousWormTailRow][previousWormTailCol] =
				Block.GROUND
		}
		const newWormTail = worm[0]
		if (newWormTail) {
			const [newWormTailRow, newWormTailCol] = newWormTail
			playfield.blocks[newWormTailRow][newWormTailCol] = Block.WORM_TAIL
		}
	}
	worm.push([newWormHeadRow, newWormHeadCol])
	playfield.blocks[newWormHeadRow][newWormHeadCol] = Block.WORM_HEAD
	if (
		playfield.blocks[previousWormHeadRow][previousWormHeadCol] ===
		Block.WORM_HEAD
	) {
		playfield.blocks[previousWormHeadRow][previousWormHeadCol] =
			Block.WORM_BODY
	}
	return true
}

export function start(
	playfieldRowCount: number,
	playfieldColCount: number = playfieldRowCount,
): void {
	playfield = createPlayfield(playfieldRowCount, playfieldColCount)

	worm = [[0, 0]]
	playfield.blocks[0][0] = Block.WORM_HEAD

	const position = randomGroundPosition(playfield)
	if (position) {
		const [row, col] = position
		playfield.blocks[row][col] = Block.FOOD
	} else {
		running = false
		return
	}
	turnQueue = []
	score = 0
	currentWay = Way.RIGHT

	running = true
	ticks = 0
}

export function turn(way: Way): void {
	if (!running) return
	if (
		(turnQueue.length === 0 && ableToTurn(currentWay, way)) ||
		(turnQueue.length > 0 &&
			ableToTurn(turnQueue[turnQueue.length - 1], way))
	)
		turnQueue.push(way)
}

export function tick(): void {
	if (!running) return
	nextTurn()
	crawl()
	ticks++
}

export function getScore(): number {
	return score
}

export function getPlayfield(): Playfield {
	return playfield
}

export function isRunning(): boolean {
	return running
}

export function getTicks(): number {
	return ticks
}
