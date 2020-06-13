import Block from '../models/Block'

interface Playfield {
	blocks: Block[][]
	rowCount: number
	colCount: number
}

export default Playfield
