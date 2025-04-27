// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract BuyerRegistry {

    struct Buyer {
        address buyerAddress;
        string publicKey; // public key as a string (could be hex or base64)
    }

    mapping(address => Buyer) public buyers;

    event BuyerRegistered(address indexed buyer, string publicKey);
    event PublicKeyUpdated(address indexed buyer, string newPublicKey);

    // Register a buyer with their public key
    function registerBuyer(string memory _publicKey) public {
        require(bytes(_publicKey).length > 0, "Public key cannot be empty");
        require(buyers[msg.sender].buyerAddress == address(0), "Already registered");

        buyers[msg.sender] = Buyer({
            buyerAddress: msg.sender,
            publicKey: _publicKey
        });

        emit BuyerRegistered(msg.sender, _publicKey);
    }

    // Update the buyer's public key
    function updatePublicKey(string memory _newPublicKey) public {
        require(bytes(_newPublicKey).length > 0, "New public key cannot be empty");
        require(buyers[msg.sender].buyerAddress != address(0), "Buyer not registered");

        buyers[msg.sender].publicKey = _newPublicKey;

        emit PublicKeyUpdated(msg.sender, _newPublicKey);
    }

    // Retrieve buyer's details
    function getBuyer(address _buyer) public view returns (Buyer memory) {
        return buyers[_buyer];
    }
}
