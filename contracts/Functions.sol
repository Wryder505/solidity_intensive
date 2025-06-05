// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// Read functions are free
// Write functions cost gas
// Write functions with arguments
// Write functions without arguments
contract Functions1 {
	string name = "Example 1";

	function setName(string memory _name) public {
		name = _name;
	}

	function getName() public view returns(string memory) {
		return name;
	}

	function resetName() public {
		name = "Example 1";
	}
}

// Functions can call other functions
// Only public functions are visible outside the contract
contract Functions2 {
	uint public count;

	function increment() public {
		count = add(count, 1);
	}

	function add(uint a, uint b) internal pure returns(uint) {
		return a + b;
	}
}

// Functions can be declared outside the contract
function addNumbers(uint a, uint b) pure returns(uint) {
	return a + b;
}

contract Functions3 {
	uint public count;

	function increment() public {
		count = addNumbers(count, 1);
	}
}

// Visibility
// https://docs.soliditylang.org/en/v0.8.16/cheatsheet.html?highlight=global%20variables#function-visibility-specifiers
// public: visible externally and internally
// private: only visible in the current contract
// external: only visible externally (only for functions) - i.e. can only be message-called (via this.func)
// internal: only visible internally
contract Functions4 {
	uint public count;

	function increment1() public {
		count = count + 1;
	}

	function increment2() public {
		increment1();
	}

	// Only visible in the current contract
	// You *can* call this from another function inside this contract
	// You *cannot* call this from another contract
	function increment3() private {
		count = count + 1;
	}

	function increment4() public {
		increment3();
	}

	// You cannot call this function inside another function.
	// It won't even compile.
	function increment5() external {
		count = count + 1;
	}

	// You cannot call this outside the contract
	// You *can* call this from another function
	// You *can* call this from an inherited contract
	function increment6() internal {
		count = count + 1;
	}

	function increment7() public {
		increment6();
	}
}

// Modifiers
// Pure
// View
// Payable
contract Functions5 {
	string public name = "Example 5";
	uint public balance;

	// View
	// You *cannot* modify state (e.g. change name)
	// You *can* access state (e.g. read name)
	function getName() public view returns(string memory) {
		return name;
	}

	// Pure
	// You *cannot* modify state (e.g. change name)
	// You *cannot* access state (e.g. read name)
	function add(uint a, uint b) public pure returns(uint) {
		return a + b;
	}

	// Payable
	function pay() public payable {
		balance = msg.value;
	}
}

// Custom modifiers
contract Functions6 {
	address private owner;
	string public name = "";
	bool private nameSet = false;

	constructor() {
		owner = msg.sender;
	}

	modifier onlyOwner {
		require(msg.sender == owner, 'caller must be owner');
		_;
	}

	modifier onlyOnce {
		require(nameSet == false, 'can only set name once');
		_;
	}

	function setName1(string memory _name) onlyOwner public {
		name = _name;
	}

	function setName2(string memory _name) onlyOwner onlyOnce public {
		name = _name;
		nameSet = true;
	}
}

contract Functions7 {
	string name = "Example 7";

	function getName1() public view returns(string memory) {
		return name;
	}

	function getName2() public view returns(string memory) {
		name;
	}

	function getName3() public view returns(string memory) {
		return getName1();
	}

	function getName4() public view returns(string memory anotherName) {
		anotherName = "Another name";
	}

	function getName5() public view returns(string memory anotherName) {
		anotherName = getName4();
	}

	function getName6() public view returns(string memory name1, string memory name2) {
		return(name, "New name");
	}

	function getName7() public view returns(string memory name1, string memory name2) {
		(name1, name2) = getName6();
		return(name1, name2);
	}

	// Values returned from a transaction are not available outside of EVM.
	// Use events to accomplish this... 
	event NameChanged(string name);

	function setName1() public returns(string memory) {
		name = "New name";
		emit NameChanged(name);
		return name;
	}

	function setName2() public returns(string memory newName) {
		newName = "New name";
		name = newName;
		return name;
	}

	function setName3() public returns(string memory newName) {
		newName = setName2();
		emit NameChanged(newName);
		return newName;
	}
}
