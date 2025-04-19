// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract SecureDelivery {
    
    address public buyer;
    address payable public supplier;
    uint public amount;
    bool public deliveryConfirmed;
    uint public deadline;

    string public itemDescription;
    bytes public encryptedCID;  // encrypted with buyer's pubkey
    bytes public encryptedKey;  // AES key encrypted with buyer's pubkey

    event AssetReady(bytes encryptedCID);
    event KeyReleased(bytes encryptedKey);
    event PaymentReleased();

    constructor(address payable _supplier, string memory _itemDescription) payable {
        buyer = msg.sender;
        supplier = _supplier;
        amount = msg.value;
        itemDescription = _itemDescription;
        deadline = block.timestamp + 3 days;
    }

    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only buyer can call this");
        _;
    }

    modifier onlySupplier() {
        require(msg.sender == supplier, "Only supplier can call this");
        _;
    }

    function setEncryptedCID(bytes memory _encryptedCID) public onlySupplier {
        encryptedCID = _encryptedCID;
        emit AssetReady(_encryptedCID);
    }

    function confirmDelivery() public onlyBuyer {
        require(!deliveryConfirmed, "Already confirmed");
        deliveryConfirmed = true;
    }

    function releaseKeyAndPayment(bytes memory _encryptedKey) public onlySupplier {
        require(deliveryConfirmed, "Delivery not confirmed");
        encryptedKey = _encryptedKey;

        emit KeyReleased(_encryptedKey);

        (bool sent, ) = supplier.call{value: amount}("");
        require(sent, "Payment failed");

        emit PaymentReleased();
    }

    function forceReleaseAfterTimeout(bytes memory _encryptedKey) public onlySupplier {
        require(block.timestamp >= deadline, "Deadline not reached");
        require(!deliveryConfirmed, "Already confirmed");

        encryptedKey = _encryptedKey;

        emit KeyReleased(_encryptedKey);

        (bool sent, ) = supplier.call{value: amount}("");
        require(sent, "Payment failed");

        emit PaymentReleased();
    }
}
