const LottoToken = artifacts.require("ERC20Mintable");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path: ".env"});

contract("LOTTO Token Test", async (accounts) => {

  const [deployerAccount, someAccount, anotherAccount] = accounts;

  beforeEach(async () => {
    this.myLottoToken = await LottoToken.new(process.env.INITIAL_SUPPLY);
  });

  it('all tokens should be in my account', async () => {
    let instance = this.myLottoToken;
    let totalSupply = await instance.totalSupply();

    return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(process.env.INITIAL_SUPPLY);
  });

  it('tokens can be transfered', async () => {
    const transferAmount = new BN(1);
    let instance = this.myLottoToken;

    let totalSupply = await instance.totalSupply();
    let initialBalance = await instance.balanceOf(deployerAccount);
    await instance.transfer(someAccount, transferAmount);

    expect(instance.balanceOf(someAccount)).to.eventually.be.a.bignumber.equal(transferAmount);
    expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal((initialBalance.sub(transferAmount)));
    return expect(instance.totalSupply()).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it('deployer can mint', async () => {
    let instance = this.myLottoToken;
    let amount = new BN(100);
    let totalSupply = await instance.totalSupply();
    let initialBalance = await instance.balanceOf(someAccount);
    await instance.mint(someAccount, amount);

    expect(instance.totalSupply()).to.eventually.be.a.bignumber.equal(totalSupply.add(amount));
    return expect(instance.balanceOf(someAccount)).to.eventually.be.a.bignumber.equal(initialBalance.add(amount));
  });

  it("is not possible to send more tokens than available in total", async () => {
    let instance = this.myLottoToken;
    let balanceOfDeployer = await instance.balanceOf(deployerAccount);

    expect(instance.transfer(anotherAccount, new BN(balanceOfDeployer+1))).to.eventually.be.rejected;
    return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
  });

});