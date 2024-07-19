interface RpsInterface {
	moves: string[]
	userMove: string
	PCMove: string
	game: RpsInterface
	hmacKey: string
	generateHMAC: (move: string) => string
	getWinner: (userMove: string, PCMove: string) => 'DRAW' | 'USER' | 'PC'
}

export default RpsInterface
