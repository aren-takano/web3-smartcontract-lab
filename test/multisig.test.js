const { expect } = require("chai");

describe("MultiSigWallet", function () {
  it("should deploy with owners and required confirmations", async function () {
    const [owner1, owner2] = await ethers.getSigners();
    const MultiSig = await ethers.getContractFactory("MultiSigWallet");
    const wallet = await MultiSig.deploy([owner1.address, owner2.address], 2);
    await wallet.deployed();

    expect(await wallet.owners(0)).to.equal(owner1.address);
    expect(await wallet.owners(1)).to.equal(owner2.address);
    expect(await wallet.required()).to.equal(2);
  });
});
