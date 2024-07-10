import chalk from 'chalk'
import CryptoController from './CryptoController.js'
async function main() {
	// Retrieve command line arguments
	const moves = process.argv.length > 2 ? process.argv.slice(2) : []

	try {
		// Validate the command line arguments
		if (
			moves.length < 3 ||
			moves.length % 2 !== 0 ||
			new Set(moves).size !== moves.length
		) {
			throw new Error(chalk.redBright('Invalid arguments'))
		}
		const CryptoController = new CryptoController()
	} catch (err) {
		// Handle any errors that occur during argument validation
		console.log(chalk.redBright(err.message))
		process.exit(1)
	}
}

main()
