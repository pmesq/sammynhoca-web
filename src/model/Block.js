import wormBodyImg from '../assets/worm-body.png';

const Block = {
	EMPTY: '',
	WORM: `url(${wormBodyImg})`,
	GOAL: 'red'
};

export default Object.freeze(Block);
