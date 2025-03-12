// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract DAOExecute {

    event DAOExecuteTransaction(
        address to, 
        bytes data,
        bool success
    );

    address public candidateAddOnFactory;
    address public layer2Manager;

    address[] public owners;
    mapping(address => bool) public isOwner;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    constructor(address _owner) {
        require(_owner != address(0), "invalid owner");
        isOwner[_owner] = true;
        owners.push(_owner);

        isOwner[address(this)] = true;
        owners.push(address(this));
    }

    receive() external payable {}
    
    function setCandidateAddOnFactory(
        address _candidateAddOnFactory
    )
        external
        onlyOwner
    {
        candidateAddOnFactory = _candidateAddOnFactory;
    }

    function setLayer2Manager(address _layer2Manager)
        external
        onlyOwner
    {
        layer2Manager = _layer2Manager;
    }

    function executeTransaction(
        address _to,
        uint _value,
        bytes memory _data
    )
        external
        onlyOwner
    {
        require(_data.length != 0 || _value != 0, "invalid data");

        (bool success, ) = address(_to).call{value: _value}(
            _data
        );
        console.log("DAOExecute");
        console.log(success);

        emit DAOExecuteTransaction(_to,_data,success);
    }  

}