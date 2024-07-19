import { Hash } from 'crypto'

interface CryptoInterface {
	size: number
	key: string
	hmacHash: Hash
	cryptoController: any
	generateBytes(size: number): Buffer
	generateHMAC(algorithm: string, hmacKey: string): string
	generateKey(): string
}

export default CryptoInterface
