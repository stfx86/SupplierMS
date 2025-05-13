# Supplier Management System

A decentralized supplier management system built with blockchain technology, featuring secure delivery escrow and supplier verification.

## Overview

This project implements a comprehensive supplier management system that leverages blockchain technology for secure and transparent supplier verification, transaction management, and secure delivery escrow services. The system is built using Solidity smart contracts and features a modern React frontend.

## Key Features

- **Supplier Registry**: Comprehensive supplier profile management with:
  - Basic information (name, service type, contact details)
  - IPFS-based profile storage (logo and extended profile)
  - Social media links
  - Reputation scoring system
  - Transaction history tracking

- **Secure Delivery Escrow**: Secure transaction handling with:
  - Encrypted asset delivery
  - Time-locked payments
  - Buyer confirmation system

- **Buyer Registry**: Management of buyer profiles and transaction history

## Technology Stack

### Smart Contracts
- Solidity ^0.8.28
- Hardhat development environment
- Ethers.js for blockchain interaction

### Frontend
- React
- TailwindCSS
- Bootstrap
- React Router
- Ethers.js

### Backend
- Express.js
- IPFS integration (via Pinata)
- ECC encryption for secure communications

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MetaMask or compatible Web3 wallet

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd SupplierMS
```

2. Install dependencies:
```bash
npm install
cd frontend
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```
PRIVATE_KEY=your_private_key
INFURA_API_KEY=your_infura_key
PINATA_API_KEY=your_pinata_key
PINATA_SECRET_KEY=your_pinata_secret
```

### Development

1. Start the local Hardhat network:
```bash
npx hardhat node
```

2. Deploy contracts:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

3. Start the frontend development server:
```bash
cd frontend
npm run dev
```

### Testing

Run the test suite:
```bash
npx hardhat test
```

For gas usage reporting:
```bash
REPORT_GAS=true npx hardhat test
```

## Smart Contracts

### SupplierRegistry.sol
Manages supplier profiles, verification, and reputation tracking.

### SecureDelivery.sol
Handles secure escrow transactions with encrypted delivery and automatic dispute resolution.

### BuyerRegistry.sol
Manages buyer profiles and transaction history.

## Security Features

- Role-based access control
- Encrypted asset delivery
- Time-locked payments
- Reputation system
- IPFS-based content storage
- ECC encryption for secure communications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or support, please open an issue in the repository.





```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
0xc526ee95bf44d8fc405a158bb884d9d1238d99f0612e9f33d006bb0789008bbb


<q>
wallet only for authentication ?

</>


<q>
is verified??
</>



<q>
legality?

</>





<q>
supplier attributs?


</>











<mynotes>
// Use .target instead of .address for newer ethers versions




<mynotes/>



