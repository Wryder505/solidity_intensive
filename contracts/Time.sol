// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Time1 {
	address public owner;
	uint public depositStartTime;
	uint public withdrawStartTime;

	modifier onlyOwner {
		require(msg.sender == owner, 'caller must be owner');
		_;
	}

	constructor(uint _depositStartTime, uint _withdrawStartTime) {
		owner = msg.sender;
		depositStartTime = _depositStartTime;
		withdrawStartTime = _withdrawStartTime;
	}

    function deposit() public payable onlyOwner {
        require(block.timestamp >= depositStartTime, 'cannot deposit yet');
        // Contract receives ether...
    }

    modifier afterWithdrawEnabled {
        require(
            block.timestamp >= withdrawStartTime,
            'cannot withdraw yet'
        );
        _;
    }

    function withdraw() public onlyOwner afterWithdrawEnabled {
        uint256 value = address(this).balance;
        (bool sent, ) = owner.call{value: value}("");
        require(sent);
	}
}
