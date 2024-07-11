export default class HMACGenerator {
	constructor(cryptoController) {
		this.cryptoController = cryptoController
	}

	generateHMAC(algorithm, hmacKey) {
		const hmacHash = this.cryptoController.generateHMAC('sha256', hmacKey)
		hmacHash.update(algorithm)
		return hmacHash.digest('hex')
	}

	generateKey() {
		return this.cryptoController.generateBytes(32).toString('hex')
	}
}
