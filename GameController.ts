import chalk from 'chalk'
import readline from 'readline'
import HelpTable from './HelpTable'
import RpsInterface from './types/rps.interface'

export default class GameController {
	moves: string[]
	game: RpsInterface

	constructor(moves: string[], game: RpsInterface) {
		this.moves = moves
		this.game = game
	}

	async start() {
		const PCMove = this.moves[Math.floor(Math.random() * this.moves.length)]
		const hmac = this.game.generateHMAC(PCMove)

		while (true) {
			this.showIntro(hmac)
			this.showAvailableMoves()

			const userInput = await this.getUserInput()

			if (userInput === '0') {
				console.log(chalk.greenBright('Goodbye!'))
				break
			} else if (userInput === '?') {
				this.showHelpTable()
			} else {
				const userMoveInd = Number(userInput) - 1
				const userMove = this.moves[userMoveInd]

				console.log(chalk.greenBright('Your move: ' + userMove))
				console.log(chalk.blueBright('PC move: ' + PCMove))
				console.log(
					chalk.yellowBright('Winner: ' + this.game.getWinner(userMove, PCMove))
				)
				console.log(
					chalk.greenBright('HMAC key: ') +
						chalk.yellowBright(this.game.hmacKey)
				)
				break
			}
		}
	}

	showAvailableMoves() {
		console.log(chalk.bold.magentaBright('Available moves: '))
		const movesLength = this.moves.length
		this.moves.forEach((move, ind) => {
			console.log(
				chalk.whiteBright(`${ind + 1}.`) + chalk.whiteBright(` ${move}`)
			)
		})
		console.log(chalk.whiteBright('?.') + chalk.greenBright(' Help'))
		console.log(chalk.whiteBright('0.') + chalk.redBright(' Exit'))
	}

	showIntro(hmac: string) {
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

		return new Promise<string>(resolve => {
			input.question('Enter your move: ', userInput => {
				input.close()
				resolve(userInput)
			})
		})
	}
}
