import { testBlockchain } from "./tests/BlockchainTest"
import { SignatureVerifier } from "./wallet/Signature"
import { Wallet } from "./wallet/Wallet"

testBlockchain()

console.log('Тест подписи')

const wallet = new Wallet()
const address = wallet.getAddress()
console.log('Адрес:', address)

const message = 'Hello, world!'
const signature = wallet.sign(message)
console.log('Подпись:', signature)

const isValid = SignatureVerifier.verify(message, signature, wallet.publicKey)
console.log('Подпись действительна:', isValid)
