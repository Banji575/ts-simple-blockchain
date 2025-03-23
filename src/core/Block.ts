import crypto from 'crypto-js';
import { ITransaction } from '../types/ITransaction';

export class Block {
    public nonce: number = 0
    public hash: string

    constructor(
        public timestamp: number,
        public transactions: ITransaction[],
        public previosHash: string = ''
    ) {
        this.hash = this.calculateHash()
    }

    calculateHash(): string {
        return crypto
            .SHA256(this.previosHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce)
            .toString(crypto.enc.Hex)
            
    }

    mineBlock(difficulty: number) {
        const target = Array(difficulty + 1).join('0')
        let countOfIterations = 0
        while(this.hash.substring(0, difficulty) !== target){
            // console.log(`Mining... ${this.hash}`)
            this.nonce++
            this.hash = this.calculateHash()
            countOfIterations++
        }
        console.log(`Block mined: ${this.hash}`)
        console.log(`Count of iterations: ${countOfIterations}`)
    }
}