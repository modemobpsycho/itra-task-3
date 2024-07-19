import chalk from 'chalk'
import RpsInterface from './types/rps.interface'

export default class GameRules {
	moves: RpsInterface['moves']

	constructor(moves: string[]) {
		this.moves = moves
	}

	getWinner(userMove: string, PCMove: string): string {
		const total = this.moves.length
		const half = Math.floor(total / 2)
		const userMoveInd = this.moves.indexOf(userMove)
		const PCMoveInd = this.moves.indexOf(PCMove)

		if (!userMove || !PCMove || userMoveInd === -1 || PCMoveInd === -1) {
			throw new Error(chalk.redBright('Invalid arguments: check README.md'))
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
