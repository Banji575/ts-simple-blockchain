import { ITransaction } from "../types/ITransaction";
import { SignatureVerifier } from "../wallet/Signature";

export class TransactionValidator{
    static isValidTransaction(tx:ITransaction):boolean{
        const fee = tx.fee ?? 1
        const transactionData = `${tx.sender}|${tx.receiver}|${tx.amount}|${fee}`
        return SignatureVerifier.verify(transactionData, tx.signature, tx.sender)
    }
}