const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Events', () => {

	describe('Example 1', () => {
		let user1, user2

		beforeEach(async () => {
			let accounts = await ethers.getSigners()
			user1 = accounts[0]
			user2 = accounts[1]
		})

		it('demonstrates basic event subscription and history', async () => {
			const Contract = await ethers.getContractFactory('Events1')
			let contract = await Contract.deploy()

			// Call it once, check the event log in a real time
			let transaction = await contract.updateMessage('Hey!')
			await transaction.wait()
			await expect(transaction).to.emit(contract, 'MessageUpdated')
				.withArgs(user1.address, 'Hey!')

			// Call it a few more times to get event history
			transaction = await contract.updateMessage('Ho!')
			await transaction.wait()

			transaction = await contract.updateMessage('Ha!')
			await transaction.wait()

			// Get all past events
			// https://docs.ethers.io/v5/getting-started/#getting-started--history
			let eventStream = await contract.queryFilter('MessageUpdated')
			expect(eventStream.length).to.equal(3)

			// Check first event in the stream
			let firstEvent = eventStream[0]
			expect(firstEvent.args[1]).to.equal('Hey!')

			// Trigger event from user 2
			transaction = await contract.connect(user2).updateMessage('Huh!')
			await transaction.wait()

			// Filter only events created by user2
			let user2Filter = contract.filters.MessageUpdated(user2.address, null)
			eventStream = await contract.queryFilter(user2Filter)
			expect(eventStream.length).to.equal(1)

			// Make sure it's user 2's message
			firstEvent = eventStream[0]
			expect(firstEvent.args[1]).to.equal('Huh!')
		})
	})

})
