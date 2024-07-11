export default class RpsMain {
	constructor(moves, hmacGenerator, gameRules) {
		this.moves = moves
		this.hmacGenerator = hmacGenerator
		this.gameRules = gameRules
		this.hmacKey = hmacGenerator.generateKey()
	}

	generateHMAC(move) {
		return this.hmacGenerator.generateHMAC(move, this.hmacKey)
	}

	getWinner(userMove, PCMove) {
		return this.gameRules.getWinner(userMove, PCMove)
	}
}
