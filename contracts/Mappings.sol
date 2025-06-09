// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// Mappings examples (key value pairs)
contract Mappings1 {
	mapping(uint => string) public names; // Mapping of string like a database
	mapping(uint => address) public addresses; // Mapping of string like a database
	mapping(address => uint) public balances; // Mapping of balances for each address
	mapping(address => bool) public hasVoted; // Tracks whether a user has voted

	// Add values to the mapping in the constructor
	constructor() {
		names[1] = "Adam";
		names[2] = "Ben";

		addresses[1] = 0x3EcEf08D0e2DaD803847E052249bb4F8bFf2D5bB;
		addresses[2] = 0xe5c430b2Dd2150a20f25C7fEde9981f767A48A3c;

		balances[0x3EcEf08D0e2DaD803847E052249bb4F8bFf2D5bB] = 1 ether;
		balances[0xe5c430b2Dd2150a20f25C7fEde9981f767A48A3c] = 2 ether;

		hasVoted[0x3EcEf08D0e2DaD803847E052249bb4F8bFf2D5bB] = true;
		hasVoted[0xe5c430b2Dd2150a20f25C7fEde9981f767A48A3c] = true;
	}
}

contract Mappings2 {

	// Mappings of structs
	struct Book {
		string author;
		string title;
	}

	mapping(uint => Book) public books;

	// Nested mapping
	// Track token balances for a given account
	// E.G. Dai: 0x6B175474E89094C44Da98b954EedeAC495271d0F
	// E.G. WETH: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
	mapping(address => mapping(address => uint)) public balances;

	constructor() {
		books[1] = Book("A Tale of Two Cities", "Charles Dickens");
		books[2] = Book("Les Miserables", "Victor Hugo");

		address user1 = 0x3EcEf08D0e2DaD803847E052249bb4F8bFf2D5bB;
		address user2 = 0xe5c430b2Dd2150a20f25C7fEde9981f767A48A3c;
		address dai = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
		address weth = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

		// User 1 Dai balance
		balances[user1][dai] = 1 ether;
		// User 2 Weth balance
		balances[user2][weth] = 2 ether;
	}
}

// Getting and setting values
contract Mappings3 {
	mapping(uint => string) public myMapping;

	function get(uint _id) public view returns (string memory) {
		return myMapping[_id];
	}

	function set(uint _id, string memory _value) public {
		myMapping[_id] =_value;
	}

	function remove(uint _id) public {
		// Resets the value to the default value.
		delete myMapping[_id];
	}
}

// Getting and setting nested values
contract Mappings4 {
	mapping(address => mapping(uint => bool)) public myMapping;

	function get(address _user, uint _id) public view returns (bool) {
		return myMapping[_user][_id];
	}

	function set(address _user, uint _id, bool _value) public {
		myMapping[_user][_id] = _value;
	}

	function remove(address _user, uint _id) public {
		// Resets the value to the default value.
		delete myMapping[_user][_id];
	}
}
