import { Blockchain } from "../core/Blockchain";
import { Block } from "../core/Block";
import { ITransaction } from "../types/ITransaction";




export function testBlockchain() {
    const blockchain = new Blockchain()

    const transaction1: ITransaction[] = [{ sender: "Alice", recevier: "Bob", amount: 100 }]
    const block1 = new Block(Date.now(), transaction1, blockchain.getLatestBlock().hash)
    blockchain.addBlock(block1)
    console.log('///////////////////////////// add block 1' )
    const transaction2: ITransaction[] = [{ sender: "Bob", recevier: "Charlie", amount: 50 }]
    const block2 = new Block(Date.now(), transaction2, blockchain.getLatestBlock().hash)
    blockchain.addBlock(block2)
    console.log('///////////////////////////// add block 2' )
    const transaction3: ITransaction[] = [{ sender: "Charlie", recevier: "Alice", amount: 25 }]
    const block3 = new Block(Date.now(), transaction3, blockchain.getLatestBlock().hash)
    blockchain.addBlock(block3)

    // console.log(JSON.stringify(blockchain, null, 2))
    console.log("\n🔍 Проверка целостности цепочки:", blockchain.isChainValid() ? "✅ Цепочка валидна" : "❌ Цепочка повреждена");


}
