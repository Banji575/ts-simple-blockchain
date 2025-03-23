    import { Blockchain } from "../core/Blockchain";
    import { Block } from "../core/Block";
    import { ITransaction } from "../types/ITransaction";
import { Wallet } from "../wallet/Wallet";
import { TransactionFactory } from "../utils/TransactionFactory";




    export function testBlockchain() {
        const blockchain = new Blockchain()

        const alice = new Wallet()
        const bob = new Wallet()
        const charlie = new Wallet()

        const tx1:ITransaction = TransactionFactory.createSignedTransaction(alice, bob.publicKey, 100)
        const block1 = new Block(Date.now(), [tx1])
        blockchain.addBlock(block1)
        
        const tx2:ITransaction = TransactionFactory.createSignedTransaction(bob, charlie.publicKey, 50)
        const block2 = new Block(Date.now(), [tx2])
        blockchain.addBlock(block2)

        console.log(`
            Проветка цепочки:${blockchain.isChainValid()}
            `)
    }
