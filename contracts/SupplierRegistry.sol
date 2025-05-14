// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SupplierRegistry {
    address public owner;

    struct Supplier {
        string name;
        string companyName;        // Added field
        string country;            // Added field
        string categories;         // Added field
        string serviceType;        // e.g. "Logistics", "IT Consulting"
        string email;
        string website;
        string logoCID;            // IPFS image
        string profileCID;         // IPFS JSON with extended bio
        mapping(string => string) socialLinks; // Mapping: platform => URL
        uint256 registrationDate;  // block.timestamp of registration
        bool isActive;             // toggled by admin/DAO
        uint256 txCount;           // completed transactions
        uint256 reputationScore;
        uint256 reviewCount;
    }

    mapping(address => Supplier) private suppliers;
    mapping(address => bool) public authorizedContracts;

    event SupplierRegistered(address indexed supplier, string name, string email);
    event SupplierUpdated(address indexed supplier);
    event SupplierActivated(address indexed supplier, bool isActive);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner || authorizedContracts[msg.sender], "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setAuthorizedContract(address _contract, bool _authorized) public onlyOwner {
        authorizedContracts[_contract] = _authorized;
    }

    function registerSupplier(
        address supplierAddr,
        string memory _name,
        string memory _companyName, // Added parameter
        string memory _country,     // Added parameter
        string memory _categories,  // Added parameter
        string memory _serviceType,
        string memory _email,
        string memory _website,
        string memory _logoCID,
        string memory _profileCID,
        string[] memory platforms,
        string[] memory links
    ) public onlyAuthorized {
        require(platforms.length == links.length, "Mismatched social inputs");

        Supplier storage supplier = suppliers[supplierAddr];

        supplier.name = _name;
        supplier.companyName = _companyName; // Added assignment
        supplier.country = _country;         // Added assignment
        supplier.categories = _categories;   // Added assignment
        supplier.serviceType = _serviceType;
        supplier.email = _email;
        supplier.website = _website;
        supplier.logoCID = _logoCID;
        supplier.profileCID = _profileCID;
        supplier.registrationDate = block.timestamp;
        supplier.isActive = true;

        for (uint256 i = 0; i < platforms.length; i++) {
            supplier.socialLinks[platforms[i]] = links[i];
        }

        emit SupplierRegistered(supplierAddr, _name, _email);
    }

    function updateSupplierStatus(address _supplier, bool _isActive) public onlyAuthorized {
        suppliers[_supplier].isActive = _isActive;
        emit SupplierActivated(_supplier, _isActive);
    }

    function incrementTxCount(address _supplier) public onlyAuthorized {
        suppliers[_supplier].txCount += 1;
    }

    function updateReputation(
        address _supplier,
        uint256 newScore,
        uint256 reviewIncrement
    ) public onlyAuthorized {
        suppliers[_supplier].reputationScore = newScore;
        suppliers[_supplier].reviewCount += reviewIncrement;
    }

    function getSupplier(
        address _supplier
    )
        public
        view
        returns (
            bool exists,
            string memory name,
            string memory companyName, // Added return value
            string memory country,     // Added return value
            string memory categories,  // Added return value
            string memory serviceType,
            string memory email,
            string memory website,
            string memory logoCID,
            string memory profileCID,
            uint256 registrationDate,
            bool isActive,
            uint256 txCount,
            uint256 reputationScore,
            uint256 reviewCount
        )
    {
        // Check if the supplier exists (name is not empty)
        Supplier storage s = suppliers[_supplier];
        if (bytes(s.name).length == 0) {
            return (false, "", "", "", "", "", "", "", "", "", 0, false, 0, 0, 0);
        }

        // Return the supplier data if exists
        return (
            true,
            s.name,
            s.companyName,    // Added return value
            s.country,        // Added return value
            s.categories,     // Added return value
            s.serviceType,
            s.email,
            s.website,
            s.logoCID,
            s.profileCID,
            s.registrationDate,
            s.isActive,
            s.txCount,
            s.reputationScore,
            s.reviewCount
        );
    }

    function getSocialLink(address supplierAddr, string memory platform) public view returns (string memory) {
        return suppliers[supplierAddr].socialLinks[platform];
    }
}