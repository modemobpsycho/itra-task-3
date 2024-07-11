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

		if (userMoveInd === -1 || PCMoveInd === -1) {
			throw new Error(chalk.redBright('Invalid arguments: check README.md'))
		}

		const winner = Math.sign(
			((userMoveInd - PCMoveInd + half + total) % total) - half
		)
		return winner === 1
			? chalk.blue('PC WON')
			: winner === -1
			? chalk.green('USER WON')
			: chalk.blue('DRAW')
	}
	static showGameResult() {
		console.log(chalk.blueBright('-------------------------------------------'))
		console.log(chalk.greenBold('Game result: '))
		console.log(chalk.blueBright('-------------------------------------------'))
	}
}
