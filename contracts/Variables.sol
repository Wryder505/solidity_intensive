//SPDX-Licesnse-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// State variable with default value
// Solidity will expose a "name()"
// function with public visibility
contract Variables1 {
	string public name = "Example 1";
}

// Constructor assigns state variable
// Local variable in function
// Local variable uses underscore prefix naming convention
contract Variables2 {
	string public name;

	constructor(string memory _name) {
		name = _name;
	}
}

// Functions can assign state variables
// Functions can read state variables
// Name is a blank string ("") by default
// Solidity will not expose a "name()" function without public visibility
contract Variables3 {
	string name;

	function setName(string memory _name) public {
		name = _name;
	}

	function getName() public view returns(string memory) {
		return name;
	}
}

// Constants are set in the contract
// Immutable can be set in constructor, but should not change
contract Variables4 {
	string constant NAME = "Example 4";
	address immutable OWNER;

	constructor() {
		OWNER = msg.sender;
	}

	function name() public pure returns(string memory) {
		return NAME;
	}

	function owner() public view returns(address) {
		return OWNER;
	}
}

// Global variables: this, msg, tx, block
// https://docs.soliditylang.org/en/v0.8.16/cheatsheet.html?highlight=global%20variables#global-variables
contract Variables5 {
	address public contractAddress;
	address public payer;
	address public origin;
	uint public amount;

	constructor() {
		contractAddress = address(this);
	}

	function pay() public payable {
		payer = msg.sender;
		origin = tx.origin;
		amount = msg.value;
	}

	function getBlockInfo() public view returns(uint, uint, uint) {
		return(
			block.number,
			block.timestamp,
			block.chainid
		);
	}
}

// Visibility

contract Variables6 {
	// No visibility
	// Defaults to internal
	string name1 = "Name 1";
	// Private variables can only be accessed inside the current contract
	// They *cannot* be accessed outside the contract
	// They *cannot* be accessed from another contract or inherited
	// Note: private variables are not truly private; anyone can decode the value
	string private name2 = "Name 2";
	// Internal variables can only be accessed internally
	// They *cannot* be accessed outside the contract
	// They *cannot* be accessed from another contract
	// They *can* be inherited by another contract
	string internal name3 = "Name 3";
	// Public variables can be accessed internally and externally
	// They *can* be accessed outside the contract
	// They *can* be accessed from another contract
	// They *can* be inherited by another contract
	string public name4 = "Name 4";
}
