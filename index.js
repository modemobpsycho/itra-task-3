import chalk from 'chalk'

import CryptoController from './CryptoController.js'
import GameController from './GameController.js'
import RpsMain from './RpsMain.js'
import GameRules from './GameRules.js'
import HMACGenerator from './HmacGenerator.js'

async function main() {
	const moves = process.argv.length > 2 ? process.argv.slice(2) : []

	try {
		if (
			moves.length < 3 ||
			moves.length % 2 !== 1 ||
			new Set(moves).size !== moves.length
		) {
			throw new Error(
				chalk.redBright(`
        		Invalid arguments: The number of moves can be arbitrary.
        		And an odd number (at least greater than or equal to 3) of non-repeating strings as moves.

        		Example Valid Moves:
        		- node index.js MOVE1 MOVE2 MOVE3
        		- node index.js STONE PAPER SCISSORS
        		- node index.js STONE SPOCK PAPER LIZARD SCISSORS
        		- node index.js Rock Paper STONE LIZARD SPOCK
        		- node index.js A B C D E F G
        		- node index.js 1 2 3 4 5 6 7 8 9


        		Examples of Invalid moves:
        		- node index.js
        		- node index.js Rock
        		- node index.js A A A
        		- node index.js Rock Paper Paper
        		- node index.js Rock Paper Scissors Lizard Scissors
        		- node index.js 1 2 3 4 5 67 8
        		`)
			)
		}

		const cryptoController = new CryptoController()
		const hmacGenerator = new HMACGenerator(cryptoController)
		const gameRules = new GameRules(moves)
		const rpsGame = new RpsMain(moves, hmacGenerator, gameRules)
		const gameController = new GameController(moves, rpsGame)

		await gameController.start()
	} catch (err) {
		console.error(chalk.redBright('Error: ' + err.message))
		process.exit(1)
	}
}

main()
