const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Types', () => {
	beforeEach(async () => {
		const Contract = await ethers.getContractFactory('Types')
		contract = await Contract.deploy()
	})

	describe('Example 1', () => {
		it('demonstrates boolean values', async () => {

		})
	})
})