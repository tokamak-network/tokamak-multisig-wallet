// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MultiSigWallet {

    event SubmitTransaction(
        address indexed owner,
        uint indexed txIndex,
        address indexed to,
        uint value,
        bytes data
    );
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
    event ExecuteTransaction(
        address indexed owner, 
        uint indexed txIndex,
        bool success
    );

    event ChangeOwner(
        address indexed oldOwner,
        uint indexed ownerIndex, 
        address indexed newOwner
    );

    address[] public owners;
    mapping(address => bool) public isOwner;

    uint public constant numConfirmationsRequired = 2;

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint numConfirmations;
    }

    // mapping from tx index => owner => bool
    mapping(uint => mapping(address => bool)) public isConfirmed;
    Transaction[] public transactions;

    modifier onlyMultiSig() {
        require(msg.sender == address(this), "Only MultiSigContract can execute");
        _;
    }

    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    modifier txExists(uint _txIndex) {
        require(_txIndex < transactions.length, "tx does not exist");
        _;
    }

    modifier notExecuted(uint _txIndex) {
        require(!transactions[_txIndex].executed, "tx already executed");
        _;
    }

    modifier notConfirmed(uint _txIndex) {
        require(!isConfirmed[_txIndex][msg.sender], "tx already confirmed");
        _;
    }

    modifier isValidOwnerIndex(uint index) {
     require(index < owners.length, "It is not valid owner index");
     _;
    }

    modifier nonZeroAddress(address addr) {
        require(addr != address(0), "zero address");
        _;
    }

    constructor(address[] memory _owners) {
        require(_owners.length == 3 && _owners.length >= numConfirmationsRequired, "invalid number of owners");

        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }
    }

    receive() external payable {}

    function changeOwner(
        uint _index,
        address _newOwner
    ) public onlyMultiSig isValidOwnerIndex(_index) nonZeroAddress(_newOwner){
        require(!isOwner[_newOwner], "It is already owner");

        isOwner[owners[_index]] = false;
        isOwner[_newOwner] = true;
        owners[_index] = _newOwner;
        
        emit ChangeOwner(owners[_index], _index, _newOwner);
    }

    function submitTransaction(
        address _to,
        uint _value,
        bytes memory _data
    ) public onlyOwner nonZeroAddress(_to) {
        require(_data.length != 0 || _value != 0, "invalid data");
        if(_value > 0) {
            require(address(this).balance > 0, "dont have ETH");
        }
        uint txIndex = transactions.length;

        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false,
                numConfirmations: 0
            })
        );

        //confirm transaction by submitter
        confirmTransaction(txIndex);

        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
    }

    function confirmTransaction(
        uint _txIndex
    ) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) notConfirmed(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;

        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    function executeTransaction(
        uint _txIndex
    ) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];
        require(
            transaction.numConfirmations >= numConfirmationsRequired,
            "cannot execute tx"
        );

        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );

        emit ExecuteTransaction(msg.sender, _txIndex, success);
    }

 
    function revokeConfirmation(
        uint _txIndex
    ) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];

        require(isConfirmed[_txIndex][msg.sender], "tx not confirmed");

        transaction.numConfirmations -= 1;
        isConfirmed[_txIndex][msg.sender] = false;

        emit RevokeConfirmation(msg.sender, _txIndex);
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function getTransactionCount() public view returns (uint) {
        return transactions.length;
    }

    function getTransaction(
        uint _txIndex
    )
        public
        view
        returns (
            address to,
            uint value,
            bytes memory data,
            bool executed,
            uint numConfirmations
        )
    {
        Transaction storage transaction = transactions[_txIndex];

        return (
            transaction.to,
            transaction.value,
            transaction.data,
            transaction.executed,
            transaction.numConfirmations
        );
    }
}