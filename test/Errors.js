const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens

  describe('Errors', () => {

	describe('Example 1', () => {
		it('deomonstrates error handling', async () => {
			// Deploy contract with time settings
			const Contract = await ethers.getContractFactory('Errors1')
			contract = await Contract.deploy()

			// expect(contract.example1(11)).to.be.fulfilled

			await expect(contract.example1(5)).to.be.reverted
			await expect(contract.example1(20)).to.be.fulfilled

			await expect(contract.example2(5)).to.be.reverted
			await expect(contract.example2(20)).to.be.fulfilled

			await expect(contract.example3(5)).to.be.reverted
			await expect(contract.example3(10)).to.be.fulfilled

			await expect(contract.example4(5)).to.be.reverted
			await expect(contract.example4(20)).to.be.fulfilled
    	})

	})

})
