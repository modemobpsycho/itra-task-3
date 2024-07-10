export default class HMACGenerator {
	constructor(cryptoController) {
		this.cryptoController = cryptoController
	}

	generateHMAC(algorithm, key) {
		const hmac = this.cryptoController.generateHMAC('sha256', key)
		hmac.update(algorithm)
		return hmac.digest('hex')
	}

	generateKey() {
		return this.cryptoController.generateBytes(32).toString('hex')
	}
}
