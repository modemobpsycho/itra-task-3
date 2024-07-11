import chalk from 'chalk'
import readline from 'node:readline'

import ValidateError from './ValidateError.js'
import HelpTable from './HelpTable.js'
export default class GameController {
	constructor(moves, game) {
		this.moves = moves
		this.game = game
	}

	async start() {
		try {
			const PCMove = this.moves[Math.floor(Math.random() * this.moves.length)]
			const hmac = this.game.generateHMAC(PCMove)

			this.showIntro(hmac)
			this.showAvailableMoves()

			const userInput = await this.getUserInput()

			if (userInput === 0) {
				console.log(chalk.greenBright('Goodbye!'))
				process.exit()
			}

			if (userInput === '?') {
				this.showHelpTable()
			}
			const userMoveInd = Number(userInput) - 1
			const userMove = this.moves[userInput - 1]

			console.log(chalk.greenBright('Your move: ' + userMove))
			console.log(chalk.blueBright('PC move: ' + PCMove))
			console.log(
				chalk.yellowBright('Winner: ' + this.game.getWinner(userMove, PCMove))
			)
			console.log(
				chalk.greenBright('HMAC key: ') + chalk.yellowBright(this.game.hmacKey)
			)
		} catch (err) {
			ValidateError.errorHandler(err)
		}
	}

	showAvailableMoves() {
		console.log(chalk.bold.magentaBright('Available moves: '))
		this.moves.forEach((move, ind) => {
			console.log(
				chalk.whiteBright(`${ind + 1}.`) + chalk.whiteBright(` ${move}`)
			)
		})
		console.log(chalk.whiteBright('?.' + chalk.greenBright(' Help')))
		console.log(chalk.whiteBright('0.' + chalk.redBright(' Exit')))
	}

	showGameResult() {
		GameRules.showGameResult()
	}
	showIntro(hmac) {
		console.log(chalk.greenBright('Welcome to the game!'))
		console.log(chalk.greenBright('HMAC: ') + chalk.yellowBright(hmac))
	}

	showHelpTable() {
		HelpTable.showHelpTable(this.moves)
	}

	async getUserInput() {
		const input = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		})

		return new Promise(resolve => {
			input.question('Enter your move: ', userInput => {
				input.close()
				resolve(userInput)
			})
		})
	}
}
