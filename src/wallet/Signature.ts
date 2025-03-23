import crypto from 'crypto'

export class SignatureVerifier {

    static verify(data: string, signature: string, publicKey: string): boolean {
        try {
            const verify = crypto.createVerify('SHA256')
            verify.update(data)
            verify.end()
            return verify.verify(publicKey, signature, 'hex')
        } catch (error) {
            return false
        }
    }
}