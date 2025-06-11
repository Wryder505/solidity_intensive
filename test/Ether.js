const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens

describe('Ether', () => {

  describe('Example 1', () => {

    it('demonstrates Ether units', async () => {
      // Deploy contract with time settings
      const Contract = await ethers.getContractFactory('Ether1')
      contract = await Contract.deploy()

      expect(await contract.value1()).to.equal(await contract.value2())
      expect(await contract.value3()).to.equal(await contract.value4())
      expect(await contract.value5()).to.equal(await contract.value6())
    })
    
  })

  describe('Example 2', () => {

    it('demonstrates "#receive()" function', async () => {
      // Deploy contract with time settings
      const Contract = await ethers.getContractFactory('Ether2')
      contract = await Contract.deploy()

      accounts = await ethers.getSigners()
      owner = accounts[0]

      await owner.sendTransaction({ to: contract.address, value: ether(1) })
      expect(await ethers.provider.getBalance(contract.address)).to.equal(ether(1))
    })

  })

  describe('Example 3', () => {

    it('demonstrates "#fallback()" function', async () => {
      // Deploy contract with time settings
      const Contract = await ethers.getContractFactory('Ether3')
      contract = await Contract.deploy()

      accounts = await ethers.getSigners()
      owner = accounts[0]

      await owner.sendTransaction({ to: contract.address, value: ether(1) })
      expect(await contract.checkBalance()).to.equal(ether(1))
      expect(await contract.count()).to.equal(1)
    })

  })

  describe('Example 4', () => {

    it('demonstrates transferring Ether', async () => {
      // Deploy contract with time settings
      const Contract = await ethers.getContractFactory('Ether4')
      contract = await Contract.deploy()

      // Random address with no balance
      let receiver = '0x3EcEf08D0e2DaD803847E052249bb4F8bFf2D5bB'

      await contract.transfer1(receiver, { value: ether(1) })
      expect(await ethers.provider.getBalance(receiver)).to.equal(ether(1))

      await contract.transfer2(receiver, { value: ether(1) })
      expect(await ethers.provider.getBalance(receiver)).to.equal(ether(2))   
    })

  })

  describe('Example 5', () => {

    it('demonstrates payable functions', async ()=> {
      // Deploy contract with time settings
      const Contract = await ethers.getContractFactory('Ether5')
      contract = await Contract.deploy()

      // Uncomment the line below to observe the failure!
      // await contract.deposit1({ value: ether(1) })

      await contract.deposit2({ value: ether(1) })
      expect(await ethers.provider.getBalance(contract.address)).to.equal(ether(1))
    })
    
  })

})
