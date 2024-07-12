import crypto from 'node:crypto'

export default class CryptoController {
	generateHMAC(algorithm = 'sha256', key) {
		if (!algorithm || !key) {
			throw new Error('Missing algorithm or key')
		}
		const hmac = crypto.createHmac(algorithm, key)
		return hmac
	}

	generateBytes(size) {
		if (!size || typeof size !== 'number' || size <= 0) {
			throw new Error('Invalid size')
		}
		return crypto.randomBytes(size)
	}
}
