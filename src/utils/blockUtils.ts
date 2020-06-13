import Block from '../models/Block'
import wormBodyImg from '../assets/wormBody.svg'
import foodImg from '../assets/food.svg'

export function retrieveBlockImage(block: Block): string {
	switch (block) {
		case Block.GROUND:
			return 'none'
		case Block.WORM_HEAD:
			return wormBodyImg
		case Block.WORM_BODY:
			return wormBodyImg
		case Block.WORM_TAIL:
			return wormBodyImg
		case Block.FOOD:
			return foodImg
		default:
			return 'none'
	}
}

export function isBlockWorm(block: Block) {
	return (
		block === Block.WORM_HEAD ||
		block === Block.WORM_BODY ||
		block === Block.WORM_TAIL
	)
}
