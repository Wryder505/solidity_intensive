const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens

describe('Variables', () => {

	describe('Example 1', () => {
		it('it has a state variable with a default value', async () => {
			const Contract = await ethers.getContractFactory('Variables1')
			let contract = await Contract.deploy()
			expect(await contract.name()).to.equal('Example 1')
		})
	})

	describe('Example 2', () => {
		it('demonstrates the constructor sets the state variable', async () => {
			const Contract = await ethers.getContractFactory('Variables2')
			let contract = await Contract.deploy('Example 2')
			expect(await contract.name()).to.equal('Example 2')
		})
	})

	describe('Example 3', () => {
		let contract

		beforeEach(async () => {
			const Contract = await ethers.getContractFactory('Variables3')
			contract = await Contract.deploy()
		})

		it('has blank name by default', async () => {
			expect(await contract.getName()).to.equal('')
		})

		it('has a function to set name & sets state variable a function', async () => {
			await contract.setName('Example 3')
			expect(await contract.getName()).to.equal('Example 3')
		})

		it('does not expose a "#name()" function', async () => {
			// TODO: uncomment line below to see failure
			//expect(await contract.name()).to.be.reverted
		})
	})

	describe('Example 4', () => {
		let contract

		beforeEach(async () => {
			const Contract = await ethers.getContractFactory('Variables4')
			contract = await Contract.deploy()
		})

		it('has a NAME constant', async () => {
			expect(await contract.name()).to.equal('Example 4')
		})

		it('tracks the owner as immutable', async () => {
			let accounts = await ethers.getSigners()
			expect(await contract.owner()).to.equal(accounts[0].address)
		})
	})

	describe('Example 5', () => {
		let contract

		beforeEach(async () => {
			const Contract = await ethers.getContractFactory('Variables5')
			contract = await Contract.deploy()
		})

		it('demonstrates "this" global variable', async () => {
			expect(await contract.contractAddress()).to.equal(contract.address)
		})

		it('demonstrates "msg" & "tx" global variables', async () => {
			await contract.pay({ value: ether(1) })
			expect(await contract.amount()).to.equal(ether(1))
			let accounts = await ethers.getSigners()
			expect(await contract.payer()).to.equal(accounts[0].address)
			expect(await contract.origin()).to.equal(accounts[0].address)
		})

		it('demonstrates "block" global variable', async () => {
			let result = await contract.getBlockInfo()
			// Uncomment line below to view return values in console
			// console.log(result)
		})
	})

	describe('Example 6', () => {
    	let contract

		beforeEach(async () => {
			const Contract = await ethers.getContractFactory('Variables6')
			contract = await Contract.deploy()
		})

  		it("should NOT allow direct read access to 'name1' from outside the contract", async () => {
    		// Try to call name1 directly, which should fail
    		// Since 'name1' is not a public variable, there is no getter
    		expect(await contract.name1).to.be.undefined;
    		expect(() => contract.name1()).to.throw;
  		})

  		  it("should NOT expose private or internal variables in ABI", () => {
    		const abi = contract.interface.fragments.map(frag => frag.name);
    		expect(abi).to.not.include("name1");
    		expect(abi).to.not.include("name2");
    		expect(abi).to.not.include("name3");
    		expect(abi).to.include("name4"); // Public getter exists
  		})

   		it('should return the correct value for name4 (public getter)', async () => {
        	expect(await contract.name4()).to.equal("Name 4");
    	})

	})

})
