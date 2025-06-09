const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Loops', () => {

	describe('Example 1', () => {

		it('demonstrates a for loop', async () => {
			const Contract = await ethers.getContractFactory('Loops1')
			let contract = await Contract.deploy()
			expect(await contract.countEvenNumbers()).to.equal(5)
		})
	})

	describe('Example 2', () => {

		it('demonstrates a for loop', async () => {
			const Contract = await ethers.getContractFactory('Loops2')
			let contract = await Contract.deploy()
			let transaction = await contract.logNumbers()
			let result = await transaction.wait()
			await expect(transaction).to.emit(contract, 'LogNumber')
				.withArgs('1')
			await expect(transaction).to.emit(contract, 'LogNumber')
				.withArgs('2')
			await expect(transaction).to.emit(contract, 'LogNumber')
				.withArgs('3')
			await expect(transaction).to.emit(contract, 'LogNumber')
				.withArgs('4')
		})
	})

})
