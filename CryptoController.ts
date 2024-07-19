import crypto, { Hash } from 'node:crypto'
import CryptoInterface from './types/crypto.interface'

export default class CryptoController implements CryptoInterface {
	hmacHash: any
	cryptoController: any

	constructor() {
		this.hmacHash = null
		this.cryptoController = null
	}
	size!: number
	key!: string
	generateKey(): string {
		throw new Error('Method not implemented.')
	}

	generateHMAC(algorithm: string, hmacKey: string): string {
		if (!algorithm || !hmacKey) {
			throw new Error('Missing algorithm or key')
		}
		const hmac = crypto.createHmac(algorithm, hmacKey)
		return hmac.digest('hex')
	}
	generateBytes(size: CryptoInterface['size']) {
		if (!size || typeof size !== 'number' || size <= 0) {
			throw new Error('Invalid size')
		}
		return crypto.randomBytes(size)
	}
}
