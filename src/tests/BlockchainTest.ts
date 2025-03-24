import { Blockchain } from "../core/Blockchain";
import { Block } from "../core/Block";
import { ITransaction } from "../types/ITransaction";
import { Wallet } from "../wallet/Wallet";
import { TransactionFactory } from "../utils/TransactionFactory";




export function testBlockchain() {
    const blockchain = new Blockchain();



    const alice = new Wallet()
    const bob = new Wallet()
    const charlie = new Wallet()
    const miner = new Wallet()

    // ✅ Шаг 1: Alice получает средства через майнинг (блок без транзакций)
    const block1 = new Block(Date.now(), [])
    blockchain.addBlock(block1, alice.publicKey)
    console.log("✅ Блок 1 (награда Alice) добавлен");

    // ✅ Шаг 2: Alice отправляет 40 Bob
    const tx2: ITransaction = TransactionFactory.createSignedTransaction(alice, bob.publicKey, 40)
    const block2 = new Block(Date.now(), [tx2])
    blockchain.addBlock(block2, miner.publicKey)
    console.log("✅ Блок 2 (Alice -> Bob) добавлен");
    
    // ✅ Шаг 3: Bob отправляет 20 Charlie
    const tx3: ITransaction = TransactionFactory.createSignedTransaction(bob, charlie.publicKey, 20)
    const block3 = new Block(Date.now(), [tx3])
    blockchain.addBlock(block3, miner.publicKey)
    console.log("✅ Блок 3 (Bob -> Charlie) добавлен");
    console.log(`
            Проветка цепочки:${blockchain.isChainValid()}
            `)

    console.log(`Баланс Альиса: ${(blockchain as any).getBalance(alice.publicKey)}`)
    console.log(`Баланс Боба: ${(blockchain as any).getBalance(bob.publicKey)}`)
    console.log(`Баланс Чарли: ${(blockchain as any).getBalance(charlie.publicKey)}`)
}
