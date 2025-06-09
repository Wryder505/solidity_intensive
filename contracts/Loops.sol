// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Loops1 {
	uint [] numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	function countEvenNumbers() public view returns(uint) {
		uint count = 0;

		for (uint i = 0; i < numbers.length; i++) {			
			if (i % 2 == 0) {
				count ++;
			} else {
				continue;
			}
		}

		return count;
	}
}

contract Loops2 {

	event LogNumber(uint number);

	function logNumbers() public returns(bool) {
		uint x = 0;

		while(x < 5) {

			emit LogNumber(x);
			x ++;
		}

		return true;
	}
}
