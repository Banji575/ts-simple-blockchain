import { Block } from "./Block";
import { ITransaction } from "../types/ITransaction";
import { TransactionValidator } from "../utils/TransactionValidator";

export class Blockchain {
    public chain: Block[] = []
    public difficulty: number = 3
    constructor() {
        this.chain.push(this.createGenesisBlock())
    }

    createGenesisBlock(): Block {
        const genesisTransaction: ITransaction[] = [{ 
            sender: "Genesis", 
            recevier: "Genesis", 
            amount: 0,
            signature: 'GENESIS_TRANSACTION'
        }]
        return new Block(Date.now(), genesisTransaction, '0')
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1]
    }

    public addBlock(newBlock: Block) {

        for(const tx of newBlock.transactions){
            if(!TransactionValidator.isValidTransaction(tx)){
                console.warn("❌ Обнаружена недействительная транзакция. Блок отклонён.", tx);
                return;
            }
        }


        newBlock.previosHash = this.getLatestBlock().hash
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock)
    }
    public isChainValid(): boolean {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }
            if (currentBlock.previosHash !== previousBlock.hash) {
                return false
            }

        }
        return true
    }
}
