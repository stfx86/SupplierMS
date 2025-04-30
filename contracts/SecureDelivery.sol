// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SecureDelivery {

    // Struct to store transaction details
    struct Transaction {
        address buyer;
        address payable supplier;
        uint amount;
        bool deliveryConfirmed;
        uint deadline;
        uint itemId;  // Item ID for tracking the item
        bytes encryptedCID;  // encrypted with buyer's pubkey
        bytes encryptedKey;  // AES key encrypted with buyer's pubkey
    }

    mapping(uint => Transaction) public transactions;
    uint public nextTransactionId;

    event AssetReady(uint transactionId, bytes encryptedCID);
    event KeyReleased(uint transactionId, bytes encryptedKey);
    event PaymentReleased(uint transactionId);

    modifier onlyBuyer(uint transactionId) {
        require(msg.sender == transactions[transactionId].buyer, "Only buyer can call this");
        _;
    }

    modifier onlySupplier(uint transactionId) {
        require(msg.sender == transactions[transactionId].supplier, "Only supplier can call this");
        _;
    }

    modifier transactionExists(uint transactionId) {
        require(transactions[transactionId].buyer != address(0), "Transaction does not exist");
        _;
    }

    // Function to create a new transaction
    function createTransaction(address payable _supplier, uint _itemId) external payable {
        uint transactionId = nextTransactionId++;
        uint deadline = block.timestamp + 3 days;

        transactions[transactionId] = Transaction({
            buyer: msg.sender,
            supplier: _supplier,
            amount: msg.value,
            deliveryConfirmed: false,
            deadline: deadline,
            itemId: _itemId,
            encryptedCID: "",
            encryptedKey: ""
        });
    }

    // Function to set encrypted CID (called by supplier)
    function setEncryptedCID(uint transactionId, bytes memory _encryptedCID) public onlySupplier(transactionId) transactionExists(transactionId) {
        transactions[transactionId].encryptedCID = _encryptedCID;
        emit AssetReady(transactionId, _encryptedCID);
    }

    // Function for buyer to confirm delivery
    function confirmDelivery(uint transactionId) public onlyBuyer(transactionId) transactionExists(transactionId) {
        require(!transactions[transactionId].deliveryConfirmed, "Already confirmed");
        transactions[transactionId].deliveryConfirmed = true;
    }

    // Function to release the key and payment (called by supplier)
    function releaseKeyAndPayment(uint transactionId, bytes memory _encryptedKey) public onlySupplier(transactionId) transactionExists(transactionId) {
        require(transactions[transactionId].deliveryConfirmed, "Delivery not confirmed");
        transactions[transactionId].encryptedKey = _encryptedKey;

        emit KeyReleased(transactionId, _encryptedKey);

        (bool sent, ) = transactions[transactionId].supplier.call{value: transactions[transactionId].amount}("");
        require(sent, "Payment failed");

        emit PaymentReleased(transactionId);
    }

    // Function to force release payment and key after deadline
    function forceReleaseAfterTimeout(uint transactionId, bytes memory _encryptedKey) public onlySupplier(transactionId) transactionExists(transactionId) {
        require(block.timestamp >= transactions[transactionId].deadline, "Deadline not reached");
        require(!transactions[transactionId].deliveryConfirmed, "Already confirmed");

        transactions[transactionId].encryptedKey = _encryptedKey;

        emit KeyReleased(transactionId, _encryptedKey);

        (bool sent, ) = transactions[transactionId].supplier.call{value: transactions[transactionId].amount}("");
        require(sent, "Payment failed");

        emit PaymentReleased(transactionId);
    }
}
