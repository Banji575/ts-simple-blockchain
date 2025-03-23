import { ITransaction } from "../types/ITransaction";
import { Wallet } from "../wallet/Wallet";

export class TransactionFactory {
    static createSignedTransaction(
        senderWallet: Wallet,
        receiver: string,
        amount: number
    ): ITransaction {
        const dataToSign = `${senderWallet.publicKey}|${receiver}|${amount}`
        const signature = senderWallet.sign(dataToSign)
      return{
        sender:senderWallet.publicKey,
        receiver,
        amount,
        signature
      }
    }
}
