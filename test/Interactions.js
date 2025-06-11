const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens

describe('Interactions', () => {

  describe('Example 1', () => {

  	it('demonstrates simple contract interaction', async () => {
  		const SecretVault = await ethers.getContractFactory('SecretVault')
  		let secretVault = await SecretVault.deploy('Secret')

  		const Contract = await ethers.getContractFactory('Interactions1')
  		let contract = await Contract.deploy(secretVault.address)

  		expect(await contract.getSecret()).to.equal('Secret')
  		await contract.setSecret('New Secret')
  		expect(await contract.getSecret()).to.equal('New Secret')
  	})

  })

  describe('Example 2', () => {

  	it('demonstrates simple contract interaction', async () => {
  		const Token = await ethers.getContractFactory('Token')
  		let token = await Token.deploy('My Token', 'MTK', tokens(1000000))

  		const Contract = await ethers.getContractFactory('Interactions2')
  		let contract = await Contract.deploy()

  		accounts = await ethers.getSigners()
  		owner = accounts[0]
  		// Approve tokens
  		await token.approve(contract.address, tokens(1000000))
  		// Deposit
  		await contract.deposit(token.address, tokens(1000000))

  		expect(await token.balanceOf(contract.address)).to.equal(tokens(1000000))
  	})

  })

})
