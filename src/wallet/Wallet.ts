import crypto from 'crypto'

export class Wallet {
    public publicKey: string
    private privateKey: crypto.KeyObject

    constructor() {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
            namedCurve: 'secp256k1',
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        })
        this.publicKey = publicKey
        this.privateKey = crypto.createPrivateKey({ key: privateKey, format: 'pem' })
    }

    getAddress(): string {
        return crypto.createHash('sha256').update(this.publicKey).digest('hex')
    }

    sign(data: string): string {
        const sign = crypto.createSign('SHA256')
        sign.update(data).end()
        const signature = sign.sign(this.privateKey, 'hex')
        return signature
    }
}
