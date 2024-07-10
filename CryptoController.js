import crypto from 'node:crypto'

export default class CryptoController {
	generateHMAC(algorithm, key) {
		return crypto.createHmac(algorithm, key)
	}

	generateBytes(size) {
		return crypto.randomBytes(size)
	}

	encrypt(text) {
		const cipher = crypto.createCipheriv(
			'aes-256-cbc',
			this.key,
			this.algorithm
		)
		let encrypted = cipher.update(text, 'utf8', 'hex')
		encrypted += cipher.final('hex')
		return encrypted
	}

	decrypt(text) {
		const decipher = crypto.createDecipheriv(
			'aes-256-cbc',
			this.key,
			this.algorithm
		)
		let decrypted = decipher.update(text, 'hex', 'utf8')
		decrypted += decipher.final('utf8')
		return decrypted
	}
}
