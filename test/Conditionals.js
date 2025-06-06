const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Conditionals', () => {

	describe('Example 1', () => {

		it('demonstrates conditionals', async () => {
			const Contract = await ethers.getContractFactory('Conditionals1')
			let contract = await Contract.deploy()
			expect(await contract.evenOrOdd1(2)).to.equal('even')
			expect(await contract.evenOrOdd1(10)).to.equal('even')
			expect(await contract.evenOrOdd1(3)).to.equal('odd')
			expect(await contract.evenOrOdd1(11)).to.equal('odd')

			expect(await contract.evenOrOdd2(2)).to.equal('even')
			expect(await contract.evenOrOdd2(3)).to.equal('odd')

			expect(await contract.evenOrOdd3(2)).to.equal('even')
			expect(await contract.evenOrOdd3(3)).to.equal('odd')
		})
	})

	describe('Example 2', () => {

		it('it demonstrates else if & nested conditionals', async () => {
			const Contract = await ethers.getContractFactory('Conditionals2')
			let contract = await Contract.deploy()
			expect(await contract.checkNumber1(1)).to.equal(0)
			expect(await contract.checkNumber1(20)).to.equal(1)
			expect(await contract.checkNumber1(3000)).to.equal(2)

			expect(await contract.checkNumber2(1)).to.equal(0)
			expect(await contract.checkNumber2(6)).to.equal(1)
			expect(await contract.checkNumber2(20)).to.equal(2)
			expect(await contract.checkNumber2(3000)).to.equal(3)
		})
	})
})
