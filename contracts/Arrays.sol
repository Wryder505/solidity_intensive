// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// Array initialization
contract Arrays1 {
	uint [] public array1 = [1, 2, 3];
	uint [] public array2; // this initializes an array of uints
	uint[10] public array3; // this initializes a fixed size array of 10 units, default to 0
	string[] public array4 = ["apple", "banana", "carrot"];
	string[] public array5; // this initializes an array of strings
	string[10] public array6; // this initializes a fixed size array of 10 uints, default to ""
}

// Array functions
contract Arrays2 {
	uint[] public array;

	// Get value at a given index
	function get(uint i) public view returns (uint) {
		return array[i];
	}

	// Return the whole array
	function getArray() public view returns (uint[] memory) {
		return array;
	}

	// Return the length of the array
	function length() public view returns (uint) {
		return array.length;
	}

	// Adds new value at the end of the array
	function push(uint _value) public {
		array.push(_value);
	}

	// Removes last item from array
	function pop() public {
		array.pop();
	}

	// Remove item at given index
	function remove(uint index) public {
		delete array[index];
	}
}
