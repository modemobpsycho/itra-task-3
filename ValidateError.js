export default class ValidateError extends Error {
	constructor(message) {
		super(message)
		this.name = 'ValidateError'
	}

	static errorHandler(error) {
		console.error(error.message);
		process.exitCode = 1;
	}

	validateArguments(moves) {
		if (
			moves.length < 3 ||
			moves.length % 2 !== 0 ||
			new Set(moves).size !== moves.length
		) {
			throw new Error(chalk.redBright('Invalid arguments: check README.md'))
		}
	}

	validateHMAC(hmac) {
		if (hmac.length !== 32) {
			throw new Error(chalk.redBright('Invalid HMAC: length should be 32'))
		}
	}

	validateUserInputMove(userInput) {
		if (
			userInput < 0 ||
			Number.isNaN(userInput) ||
			userInput > this.moves.length
		) {
			throw new Error(
				chalk.redBright(
					'Invalid input: please enter a number from 1 to ' + this.moves.length
				)
			)
		}
	}

	validateUserInputMenu(userInput) {
		if (userInput <= 0) {
			throw new Error(chalk.redBright('Invalid input'))
		}
	}
}
