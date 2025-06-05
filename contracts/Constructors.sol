// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

//https://docs.soliditylang.org/en/v0.8.16/contracts.html

// Contracts do not require a constructor
contract Constructors1 {
	string public name = "Example 1";
}

// Contract can contain a constructor with no arguments
contract Constructors2 {
	string public name;

	constructor() {
		name = "Example 2";
	} 
}

// Contract can contain a constructor with arguments
contract Constructors3 {
	string public name;

	constructor(string memory _name) {
		name = _name;
	}
}

// Constructors can be payable
contract Constructors4 {
	string public name;

	constructor() payable {
		name = "Example 4";
	}
}

// Constructors can inherit from base contract
contract Parent1 {
	string public name;

	constructor() {
		name = "Example 5";
	}
}

contract Constructors5 is Parent1 {
	string public description = "This contract inherits from Parent 1";
	// Do not declare a constructor here
}

// Constructors can extend behavior from parent constructor
contract Parent2 {
	string public name;

	constructor(string memory _name) {
		name = _name;
	}
}

contract Constructors6 is Parent2 {
	string public description;

	constructor(string memory _name, string memory _description) Parent2(_name) {
		description = _description;
	}
}
