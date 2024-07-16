import { KEY_LENGTH } from './constants.js'
export default class HMACGenerator {
	constructor(cryptoController) {
		this.cryptoController = cryptoController
	}

	generateHMAC(algorithm, hmacKey) {
		if (typeof algorithm !== 'string' || algorithm.length === 0) {
			throw new Error('Invalid algorithm. Expecting a non-empty string.')
		}

		if (typeof hmacKey !== 'string' || hmacKey.length === 0) {
			throw new Error('Invalid hmacKey. Expecting a non-empty string.')
		}

		try {
			const hmacHash = this.cryptoController.generateHMAC('sha256', hmacKey)
			hmacHash.update(algorithm)
			return hmacHash.digest('hex')
		} catch (error) {
			throw new Error('Error generating HMAC: ' + error.message)
		}
	}

	generateKey() {
		try {
			const key = this.cryptoController
				.generateBytes(KEY_LENGTH)
				.toString('hex')
			return key
		} catch (error) {
			throw new Error('Error generating key: ' + error.message)
		}
	}
}
