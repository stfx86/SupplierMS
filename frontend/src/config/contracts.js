import { abi as SupplierRegistryABI } from '../../../artifacts/contracts/SupplierRegistry.sol/SupplierRegistry.json';
import { abi as SecureDeliveryABI } from '../../../artifacts/contracts/SecureDelivery.sol/SecureDelivery.json';
import { abi as BuyerRegistryABI } from '../../../artifacts/contracts/BuyerRegistry.sol/BuyerRegistry.json';

// Contract addresses
export const CONTRACT_ADDRESSES = {
    supplierRegistry: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    secureDelivery: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    buyerRegistry: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
};

// Contract ABIs
export const CONTRACT_ABIS = {
    supplierRegistry: SupplierRegistryABI,
    secureDelivery: SecureDeliveryABI,
    buyerRegistry: BuyerRegistryABI
}; 