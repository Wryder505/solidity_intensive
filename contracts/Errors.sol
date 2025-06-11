// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Errors1 {

	event Log(string message);

	function example1(uint _value) public {
		require(_value > 10, "must be greater than 10");
		emit Log("success");
	}

	function example2(uint _value) public {
		if (_value <= 10) {
			revert("must be greater than 10");
		}
		emit Log("success");
	}

	// Usually checks internal values...
	function example3(uint _value) public {
		assert(_value == 10);
		emit Log("success");
	}

	// Custom error
	error InvalidValue(uint value);

	function example4(uint _value) public {
		if (_value <= 10) {
			// You can add more arguments to this...
			revert InvalidValue({value: _value });
		}
		emit Log("success");
	}
}
