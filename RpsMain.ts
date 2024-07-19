import GameRules from './GameRules'
import HMACGenerator from './HMACGenerator'
import RpsInterface from './types/rps.interface'

export default class RpsMain implements RpsInterface {
	moves: string[]
	hmacGenerator: HMACGenerator
	gameRules: GameRules
	hmacKey: string

	constructor(
		moves: string[],
		hmacGenerator: HMACGenerator,
		gameRules: GameRules
	) {
		if (!Array.isArray(moves) || moves.length === 0) {
			throw new Error('Invalid moves. Expecting a non-empty array.')
		}

		this.moves = moves
		this.hmacGenerator = hmacGenerator
		this.gameRules = gameRules
		this.hmacKey = hmacGenerator.generateKey()
	}
	userMove!: string
	PCMove!: string
	game!: RpsInterface
	getWinner!: (userMove: string, PCMove: string) => 'DRAW' | 'USER' | 'PC'

	generateHMAC(move: string): string {
		return this.hmacGenerator.generateHMAC(move, this.hmacKey)
	}
}
