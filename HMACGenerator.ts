import { KEY_LENGTH } from './constants.js'
import CryptoInterface from './types/crypto.interface.js'
import { createHmac } from 'crypto'

export default class HMACGenerator {
	cryptoController: CryptoInterface

	constructor(cryptoController: CryptoInterface) {
		this.cryptoController = cryptoController
	}

	generateHMAC(algorithm: string, hmacKey: string): string {
		if (typeof algorithm !== 'string' || algorithm.length === 0) {
			throw new Error('Invalid algorithm. Expecting a non-empty string.')
		}

		if (typeof hmacKey !== 'string' || hmacKey.length === 0) {
			throw new Error('Invalid hmacKey. Expecting a non-empty string.')
		}

		try {
			const hmacHash = createHmac('sha256', hmacKey)
			hmacHash.update(algorithm)
			return hmacHash.digest('hex')
		} catch (error: any) {
			throw new Error('Error generating HMAC: ' + error.message)
		}
	}

	generateKey(): string {
		try {
			const key = this.cryptoController
				.generateBytes(KEY_LENGTH)
				.toString('hex')
			return key
		} catch (error: any) {
			throw new Error('Error generating key: ' + error.message)
		}
	}
}
