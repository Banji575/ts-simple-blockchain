# Simple Blockchain in TypeScript

This project is a simple implementation of a blockchain using TypeScript. It demonstrates the basic concepts of blockchain technology, including block creation, hashing, and chain validation.

## Features

- **Block Creation**: Create blocks with timestamp, transactions, and previous hash.
- **Hashing**: Use SHA256 hashing for block integrity.
- **Chain Validation**: Ensure the integrity of the blockchain by validating the chain.

## Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd simpleblockchain
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Project

To start the development server and view the project in your browser, run:

```bash
npm run dev
```

This will open the project in your default web browser.

## Project Structure

- `src/`: Contains the source code for the blockchain implementation.
  - `core/`: Core logic for the blockchain, including `Block.ts` and `Blockchain.ts`.
  - `crypto/`: Cryptographic utilities.
  - `wallet/`: Key and signature management.
  - `utils/`: Helper functions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
