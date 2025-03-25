import { Block } from "./Block";
import { ITransaction } from "../types/ITransaction";
import { TransactionValidator } from "../utils/TransactionValidator";
import { Wallet } from "../wallet/Wallet";
import { TransactionFactory } from "../utils/TransactionFactory";

export class Blockchain {
    public chain: Block[] = []
    public difficulty: number = 3
    public miningReward: number = 100
    private systemWallet: Wallet

    constructor(systemWallet: Wallet) {
        this.systemWallet = systemWallet
        this.chain.push(this.createGenesisBlock())

    }

    createGenesisBlock(): Block {
        // const genesisTransaction: ITransaction[] = [{
        //     sender: "Genesis",
        //     receiver: "Genesis",
        //     amount: 0,
        //     signature: 'GENESIS_TRANSACTION'
        // }]
        const genesisTransaction: ITransaction = TransactionFactory.createSignedTransaction(
            this.systemWallet,
            this.systemWallet.publicKey,
            0
        )
        return new Block(Date.now(), [genesisTransaction], '0')
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1]
    }

    public addBlock(newBlock: Block, minerAddress: string) {
        let totalFee = 0
        for (const tx of newBlock.transactions) {
            if (!TransactionValidator.isValidTransaction(tx)) {
                console.warn("❌ Обнаружена недействительная транзакция. Блок отклонён.", tx);
                return;
            }
            if (tx.sender !== this.systemWallet.publicKey &&
                this.getBalance(tx.sender) < (tx.amount + (tx.fee ?? 1))) {
                console.warn("❌ Недостаточно средств для транзакции. Блок отклонён.", tx);
                return;
            }
            totalFee += tx.fee ?? 1
        }


        const rewardTx: ITransaction = TransactionFactory.createSignedTransaction(
            this.systemWallet,
            minerAddress,
            this.miningReward + totalFee,
            0
        )

        newBlock.transactions.push(rewardTx)

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
    public getBalance(address: string) {
        let balance = 0
        for (const block of this.chain) {
            for (const tx of block.transactions) {
                if (tx.receiver === address) {
                    balance += tx.amount
                }
                if (tx.sender === address) {
                    balance -= tx.amount
                    balance -= tx.fee ?? 1
                }

            }
        }
        return balance
    }
}
