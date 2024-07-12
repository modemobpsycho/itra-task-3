export default class RpsMain {
	constructor(moves, hmacGenerator, gameRules) {
		if (!Array.isArray(moves) || moves.length === 0) {
			throw new Error('Invalid moves. Expecting a non-empty array.')
		}

		this.moves = moves
		this.hmacGenerator = hmacGenerator
		this.gameRules = gameRules
		this.hmacKey = hmacGenerator.generateKey()
	}

	generateHMAC(move) {
		return this.hmacGenerator.generateHMAC(move, this.hmacKey)
	}

	getWinner(userMove, PCMove) {
		try {
			return this.gameRules.getWinner(userMove, PCMove)
		} catch (error) {
			throw new Error('Error getting winner: ' + error.message)
		}
	}
}
