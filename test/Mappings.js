const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens

describe('Mappings', () => {
	 
	 describe('Example 1', () => {

	 	it('demonstrates basic mappings with default values', async () => {
	 		const Contract = await ethers.getContractFactory('Mappings1')
	 		let contract = await Contract.deploy()
	 		expect(await contract.names(1)).to.equal('Adam')
	 		expect(await contract.names(2)).to.equal('Ben')
	 		expect(await contract.names(3)).to.equal('')
	 		expect(await contract.addresses(1)).to.equal('0x3EcEf08D0e2DaD803847E052249bb4F8bFf2D5bB')
	 		expect(await contract.addresses(2)).to.equal('0xe5c430b2Dd2150a20f25C7fEde9981f767A48A3c')
	 		expect(await contract.addresses(3)).to.equal('0x0000000000000000000000000000000000000000')
	 		expect(await contract.hasVoted('0x3EcEf08D0e2DaD803847E052249bb4F8bFf2D5bB')).to.equal(true)
	 		expect(await contract.hasVoted('0xe5c430b2Dd2150a20f25C7fEde9981f767A48A3c')).to.equal(true)
	 		expect(await contract.hasVoted('0x4f7d078Ed1A55a788e1e7eCD02f2c8249e2d11Ab')).to.equal(false)
	 	})
	 })

	 describe('Example 2', () => {
	 	let mappings2

	 	beforeEach(async () => {
	 		const Mappings2 = await ethers.getContractFactory("Mappings2")
	 		mappings2 = await Mappings2.deploy()
	 		await mappings2.deployed()
	 	});

	 	it('demonstrates mappings with other data types & nested mappings', async () => {
	 		const Contract = await ethers.getContractFactory('Mappings2')
	 		let contract = await Contract.deploy()
	 		await mappings2.deployed()

	 		let result = await contract.books(1)
	 		expect(result[0]).to.equal('A Tale of Two Cities')
	 		expect(result[1]).to.equal('Charles Dickens')

	 		const book2 = await mappings2.books(2)
	 		expect(book2.author).to.equal("Les Miserables")
	 		expect(book2.title).to.equal("Victor Hugo")

	 		let user1 = '0x3EcEf08D0e2DaD803847E052249bb4F8bFf2D5bB'
	 		let dai = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
	 		expect(await contract.balances(user1, dai)).to.equal(ether(1))

	 		let user2 = '0xe5c430b2Dd2150a20f25C7fEde9981f767A48A3c'
	 		let weth = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
	 		expect(await contract.balances(user2, weth)).to.equal(ether(2))
	 	})
	 })

	 describe('Example 3', () => {

	 	it('demonstrates getting and setting values', async () => {
	 		const Contract = await ethers.getContractFactory('Mappings3')
	 		let contract = await Contract.deploy()

	 		await contract.set(1, 'one')
	 		await contract.set(2, 'two')

	 		expect(await contract.get(1)).to.equal('one')
	 		expect(await contract.get(2)).to.equal('two')

	 		await contract.remove(1)
	 		expect(await contract.get(1)).to.equal('')
	 	})
	 })

	 describe('Example 4', () => {
	 	it('demonstrates getting and setting nested values', async () => {
	 		const Contract = await ethers.getContractFactory('Mappings4')
	 		let contract = await Contract.deploy()

	 		let user1 = '0x3EcEf08D0e2DaD803847E052249bb4F8bFf2D5bB'
	 		let user2 = '0x6B175474E89094C44Da98b954EedeAC495271d0F'

	 		await contract.set(user1, 1, true)
	 		await contract.set(user1, 2, true)
	 		await contract.set(user2, 3, true)

	 		expect(await contract.get(user1, 1)).to.equal(true)
	 		expect(await contract.get(user1, 2)).to.equal(true)
	 		expect(await contract.get(user2, 3)).to.equal(true)

	 		await contract.remove(user1, 1)
	 		expect(await contract.get(user1, 1)).to.equal(false)
	 	})
	 })

})
