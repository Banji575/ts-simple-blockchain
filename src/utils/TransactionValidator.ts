import { ITransaction } from "../types/ITransaction";
import { SignatureVerifier } from "../wallet/Signature";

export class TransactionValidator{
    static isValidTransaction(tx:ITransaction):boolean{
        const transactionData = `${tx.sender}|${tx.recevier}|${tx.amount}`
        return SignatureVerifier.verify(transactionData, tx.signature, tx.sender)
    }
}