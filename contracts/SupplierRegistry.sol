// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SupplierRegistry {


    address public owner;

    struct Supplier {
        string name;
        string email;
        string serviceType;
       
        bool verified;
    }

    mapping(address => Supplier) public suppliers;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerSupplier(
        string memory _name,
        string memory _email,
        string memory _serviceType
    ) public {
        suppliers[msg.sender] = Supplier(
            _name,
            _email,
            _serviceType,
            false
        );
    }

    function verifySupplier(address _supplier) public onlyOwner {
        suppliers[_supplier].verified = true;
    }

    function getSupplier(address _supplier) public view returns (Supplier memory) {
        return suppliers[_supplier];
    }
}