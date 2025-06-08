// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract MultiSigWallet {
    address[] public owners;
    uint256 public required;
    mapping(address => bool) public isOwner;
    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint256 confirmations;
    }
    Transaction[] public transactions;
    mapping(uint256 => mapping(address => bool)) public isConfirmed;
    modifier onlyOwner() { require(isOwner[msg.sender], "Not owner"); _; }
    constructor(address[] memory _owners, uint256 _required) {
        require(_owners.length > 0, "owners required");
        require(_required > 0 && _required <= _owners.length, "invalid required");
        for (uint i=0; i<_owners.length; i++) {
            require(!isOwner[_owners[i]], "owner not unique");
            isOwner[_owners[i]] = true;
        }
        owners = _owners;
        required = _required;
    }
    function submit(address to, uint value, bytes memory data) public onlyOwner {
        transactions.push(Transaction(to, value, data, false, 0));
    }
    function confirm(uint txIndex) public onlyOwner {
        require(!isConfirmed[txIndex][msg.sender], "Already confirmed");
        isConfirmed[txIndex][msg.sender] = true;
        transactions[txIndex].confirmations += 1;
    }
    function execute(uint txIndex) public onlyOwner {
        Transaction storage txn = transactions[txIndex];
        require(!txn.executed, "Already executed");
        require(txn.confirmations >= required, "Not enough confirmations");
        txn.executed = true;
        (bool success, ) = txn.to.call{value: txn.value}(txn.data);
        require(success, "Txn failed");
    }
    receive() external payable {}
}
