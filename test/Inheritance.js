const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens

describe('Inheritance', () => {

  describe('Example 1', () => {

  	it('demonstrates simple inheritance from 1 contract', async () => {
  		const Contract = await ethers.getContractFactory('Inheritance1')
  		let contract = await Contract.deploy()
  		await contract.setName("New name")
  		expect(await contract.name()).to.equal("New name")
  	})

  })

  describe('Example 2', () => {

  	it('demonstrates inheritance from multiple contracts', async () => {
  		const Contract = await ethers.getContractFactory('Inheritance2')
  		let contract = await Contract.deploy()

  		accounts = await ethers.getSigners()
  		owner = accounts[0]

  		await owner.sendTransaction({ to: contract.address, value: ether(1) })
  		expect(await ethers.provider.getBalance(contract.address)).to.equal(ether(1))
  		await contract.withdraw()
  		expect(await ethers.provider.getBalance(contract.address)).to.equal(0)
  	})

  })

  describe('Example 3', () => {

  	it('demonstrates simple constructor inheritance', async () => {
  		const Contract = await ethers.getContractFactory('Inheritance3')
  		let contract = await Contract.deploy()

  		expect(await contract.name()).to.equal('My Token')
  		expect(await contract.symbol()).to.equal('MTK')
  		expect(await contract.decimals()).to.equal(18)
  		expect(await contract.totalSupply()).to.equal(tokens(1000000)) // 1 Million
  	})

  })

  describe('Example 4', () => {

  	it('demonstrates function override with super & constructor', async () => {
  		const Contract = await ethers.getContractFactory('Inheritance4')
  		let contract = await Contract.deploy(1000000) // 1 Million

  		accounts = await ethers.getSigners()
  		owner = accounts[0]

  		expect(await contract.name()).to.equal('My Token')
  		expect(await contract.symbol()).to.equal('MTK')
  		expect(await contract.decimals()).to.equal(18)
  		expect(await contract.totalSupply()).to.equal(tokens(1000000)) // 1 Million
  		expect(await contract.balanceOf(owner.address)).to.equal(tokens(10000000)) // 10 Million
  	})
  	
  })

})
