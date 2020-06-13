import React, { useState, useEffect, MouseEvent } from 'react'
import './styles.css'
import Playfield from '../../models/Playfield'
import {
	tick,
	getPlayfield,
	getScore,
	start,
	isRunning,
	turn,
	getTicks,
} from '../../logic/gameLogic'
import { retrieveBlockImage } from '../../utils/blockUtils'
import Way from '../../models/Way'

const Game = () => {
	const [playfield, setPlayfield] = useState<Playfield>({
		blocks: [[]],
		rowCount: 0,
		colCount: 0,
	})
	const [score, setScore] = useState<number>(0)
	const [, setTicks] = useState<number>(0)

	const playfieldRowCount = 25
	const playfieldColCount = 25

	const playfieldElementMaxSideSize = 600

	useEffect(() => {
		start(playfieldRowCount, playfieldColCount)
	}, [])

	useEffect(() => {
		const interval = setInterval(() => {
			if (isRunning()) {
				tick()
				setTicks(getTicks())
				setScore(getScore())
				setPlayfield(getPlayfield())
			}
		}, 100)
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		const body = document.querySelector('body')
		if (body) {
			body.onkeypress = (event) => {
				switch (event.key) {
					case 'w':
						turn(Way.UP)
						break
					case 's':
						turn(Way.DOWN)
						break
					case 'a':
						turn(Way.LEFT)
						break
					case 'd':
						turn(Way.RIGHT)
						break
					case 'r':
						start(playfieldRowCount, playfieldColCount)
						break
				}
			}
		}
	}, [])

	function handleRestartClick(event: MouseEvent<HTMLButtonElement>) {
		event.currentTarget.blur()
		start(playfieldRowCount, playfieldColCount)
	}

	function getPlayfieldElementWidth(): number {
		if (playfield.rowCount <= playfield.colCount)
			return playfieldElementMaxSideSize
		return (
			playfieldElementMaxSideSize *
			(playfieldColCount / playfieldRowCount)
		)
	}

	function getPlayfieldElementHeight(): number {
		if (playfield.rowCount >= playfield.colCount)
			return playfieldElementMaxSideSize
		return (
			playfieldElementMaxSideSize *
			(playfieldRowCount / playfieldColCount)
		)
	}

	return (
		<div className="Game">
			<header>
				<h1>Sammynhoca • {score}</h1>
			</header>
			<div
				className="Playfield"
				style={{
					width: `${getPlayfieldElementWidth()}px`,
					height: `${getPlayfieldElementHeight()}px`,
					gridTemplateColumns: `repeat(${playfield.colCount}, auto)`,
				}}
			>
				{playfield.blocks.map((blockRow, i) =>
					blockRow.map((block, j) => (
						<div
							className="Block"
							key={i * playfield.colCount + j}
							style={{
								backgroundImage: `url(${retrieveBlockImage(
									block,
								)})`,
							}}
						/>
					)),
				)}
			</div>
			<button className="Restart" onClick={handleRestartClick}>
				Restart
			</button>
		</div>
	)
}

export default Game
