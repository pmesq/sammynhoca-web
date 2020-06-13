import Playfield from '../models/Playfield'
import Block from '../models/Block'

export function validPosition(
	playfield: Playfield,
	rowIndex: number,
	colIndex: number,
): boolean {
	return (
		rowIndex >= 0 &&
		rowIndex < playfield.rowCount &&
		colIndex >= 0 &&
		colIndex < playfield.colCount
	)
}

export function createPlayfield(
	rowCount: number,
	colCount: number = rowCount,
): Playfield {
	const blocks = new Array(rowCount)
	for (let i = 0; i < rowCount; i++) {
		blocks[i] = new Array(colCount)
		for (let j = 0; j < colCount; j++) {
			blocks[i][j] = Block.GROUND
		}
	}
	return { blocks, rowCount, colCount }
}

export function randomGroundPosition(
	playfield: Playfield,
): [number, number] | undefined {
	const groundPositions: [number, number][] = []
	for (let i = 0; i < playfield.rowCount; i++) {
		for (let j = 0; j < playfield.colCount; j++) {
			if (playfield.blocks[i][j] === Block.GROUND) {
				groundPositions.push([i, j])
			}
		}
	}
	if (groundPositions.length === 0) return undefined
	return groundPositions[Math.floor(Math.random() * groundPositions.length)]
}
