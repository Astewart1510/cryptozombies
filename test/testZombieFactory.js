//import truffle assertions
const truffleAssert = require('truffle-assertions')

// import the contract artifact
const ZombieFactory = artifacts.require('ZombieFactory.sol')

// test starts here
contract('ZombieFactory', function (accounts) {
  // predefine the contract instance
  // 
  let ZombieFactoryInstance

  // before each test, create a new contract instance
  beforeEach(async function () { //before every test is run it createes a new instance of the coin
    ZombieFactoryInstance = await ZombieFactory.new()
  })

  // first test: define what it should do in the string
  it('test one zombie created per address', async function () {
    // calling the create random zombie function , await - means wait for blockchain to answer ( always include)
    await ZombieFactoryInstance.createRandomZombie("Zombie_Address1", { 'from': accounts[0] })
    let count =  await ZombieFactoryInstance.ownerZombieCount(accounts[0])
    assert.equal(count.toNumber(), 1, "Zombies count is not equal to 1")
    // truffleAssert.revert doesnt let the function go through.
    await truffleAssert.reverts(ZombieFactoryInstance.createRandomZombie("Zombie_Address1", { 'from': accounts[0] })) // this line should fail 
})
})
// 2nd test

