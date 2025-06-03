// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Types1 {
    // Value types
    bool public boolean1 = true;
    bool public boolean2; // default false
    uint public myUint1 = 1; // cannot be negative!
    uint public myUint2; // defaults to 0
    uint256 public myUint3 = 1; // same as uint
    uint8 public myUint4 = 1;
    uint16 public myUint5 = 1;
    int public myInt1 = 1;
    int public myInt2; // defaults to 0
    int public myInt3 = -1; // can be negative
    int256 public myInt4 = 1; // same as int
    uint8 public myInt5 = 1;
    uint16 public myInt6 = 1;

    // Other common types
    string public myString = "My string";
    bytes32 public myBytes32  = "My Bytes 32";
    address public myAddress = 0x52bc44d5378309EE2abF1539BF71dE1b7d7bE3b5;
}
