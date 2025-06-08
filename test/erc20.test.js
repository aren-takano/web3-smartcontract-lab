const { expect } = require("chai");

describe("ArenERC20", function () {
  it("should deploy with initial supply", async function () {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("ArenERC20");
    const token = await Token.deploy(10000);
    await token.deployed();

    expect(await token.balanceOf(owner.address)).to.equal(10000n * 10n ** 18n);
    expect(await token.totalSupply()).to.equal(10000n * 10n ** 18n);
  });
});
