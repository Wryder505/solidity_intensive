const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Enums', () => {

	describe('Example 1', () => {

		it('demonstrates read / write / update behavior of enums', async () => {
			const Contract = await ethers.getContractFactory('Enums1')
			let contract = await Contract.deploy()

			// Defaults to 0
			expect(await contract.get()).to.equal(0)

			// Manually set to "In Progress"
			await contract.set(1)
			expect(await contract.get()).to.equal(1)

			// Complete
			await contract.complete()
			expect(await contract.get()).to.equal(2)

			// Reset status to "Todo"
			await contract.reset()
			expect(await contract.get()).to.equal(0)
		})
	})

})
