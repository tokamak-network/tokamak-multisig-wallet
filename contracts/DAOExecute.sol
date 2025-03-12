// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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

    constructor(address[] memory _owners) {
        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }
    }

    receive() external payable {}
    
    function setCandidateAddOnFactory(address _candidateAddOnFactory)
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

        emit DAOExecuteTransaction(_to,_data,success);
    }  

}