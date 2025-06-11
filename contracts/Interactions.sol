// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SecretVault {
	string private secret;

	constructor(string memory _secret) {
		secret = _secret;
	}

	function setSecret(string memory _secret) external {
		secret = _secret;
	}

	function getSecret() external view returns(string memory) {
		return secret;
	}
}

contract Interactions1 {
	SecretVault public secretVault;

	constructor(SecretVault _secretVault) {
		secretVault = _secretVault;
	}

	function setSecret(string memory _secret) public {
		secretVault.setSecret(_secret);
	}

	function getSecret() public view returns(string memory) {
		return secretVault.getSecret();
	}
}

import "./Token.sol";

interface IERC20 {
	function transferFrom(
		address _from,
		address _to,
		uint256 _value
	)
		external
		returns(bool success);
}

contract Interactions2 {

	function deposit(address _tokenAddress, uint _amount) public {
		IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _amount);
	}
}
