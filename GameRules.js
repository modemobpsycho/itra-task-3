import chalk from 'chalk'
export default class GameRules {
	constructor(moves) {
		this.moves = moves
	}

	getWinner(userMove, PCMove) {
		const total = this.moves.length
		const half = Math.floor(total / 2)
		const userMoveInd = this.moves.indexOf(userMove)
		const PCMoveInd = this.moves.indexOf(PCMove)

		if (!userMove || !PCMove || userMoveInd === -1 || PCMoveInd === -1) {
			throw new Error(redBright('Invalid arguments: check README.md'))
		}

		const winner =
			userMoveInd === PCMoveInd
				? 'DRAW'
				: userMoveInd < PCMoveInd || userMoveInd - PCMoveInd > half
				? 'USER'
				: 'PC'

		return winner
	}
}
