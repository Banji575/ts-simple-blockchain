import { ITransaction } from "../types/ITransaction";
import { Wallet } from "../wallet/Wallet";

export class TransactionFactory {
    static createSignedTransaction(
        senderWallet: Wallet,
        receiver: string,
        amount: number,
        fee:number = 1
    ): ITransaction {
        const dataToSign = `${senderWallet.publicKey}|${receiver}|${amount}|${fee}`
        const signature = senderWallet.sign(dataToSign)
      return{
        sender:senderWallet.publicKey,
        receiver,
        amount,
        signature,
        fee
      }
    }
}
