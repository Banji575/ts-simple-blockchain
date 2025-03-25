import { Blockchain } from "../core/Blockchain";
import { Block } from "../core/Block";
import { ITransaction } from "../types/ITransaction";
import { Wallet } from "../wallet/Wallet";
import { TransactionFactory } from "../utils/TransactionFactory";




export function testBlockchain() {
    const systemWallet = new Wallet();
    const blockchain = new Blockchain(systemWallet);



    const alice = new Wallet()
    const bob = new Wallet()
    const charlie = new Wallet()
    const miner = new Wallet()

   // Шаг 1: майним пустой блок — Alice получает награду
   const block1 = new Block(Date.now(), [])
   blockchain.addBlock(block1, alice.publicKey)
   console.log("✅ Блок 1 (награда Alice) добавлен")

   // Шаг 2: Alice отправляет 40 Bob с комиссией 2
   const tx2 = TransactionFactory.createSignedTransaction(alice, bob.publicKey, 40, 2)
   const block2 = new Block(Date.now(), [tx2])
   blockchain.addBlock(block2, miner.publicKey)
   console.log("✅ Блок 2 (Alice -> Bob, fee 2) добавлен")

   // Шаг 3: Bob отправляет 20 Charlie с комиссией 3
   const tx3 = TransactionFactory.createSignedTransaction(bob, charlie.publicKey, 20, 3)
   const block3 = new Block(Date.now(), [tx3])
   blockchain.addBlock(block3, miner.publicKey)
   console.log("✅ Блок 3 (Bob -> Charlie, fee 3) добавлен")

   // Выводим балансы
   console.log("\n💰 Балансы:")
   console.log("Alice:", blockchain.getBalance(alice.publicKey))
   console.log("Bob:", blockchain.getBalance(bob.publicKey))
   console.log("Charlie:", blockchain.getBalance(charlie.publicKey))
   console.log("Miner:", blockchain.getBalance(miner.publicKey))
   console.log("System:", blockchain.getBalance(systemWallet.publicKey))
}
