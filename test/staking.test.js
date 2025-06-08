const { expect } = require("chai");
const { parseEther } = require("ethers");

describe("StakingPool", function () {
  it("should allow staking and withdrawing", async function () {
    const [owner, user] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("ArenERC20");
    const token = await Token.deploy(1000);
    await token.deployed();

    const Pool = await ethers.getContractFactory("StakingPool");
    const pool = await Pool.deploy(token.address);
    await pool.deployed();

    await token.transfer(user.address, parseEther("100"));
    await token.connect(user).approve(pool.address, parseEther("50"));
    await pool.connect(user).stake(parseEther("50"));

    expect(await pool.balances(user.address)).to.equal(parseEther("50"));

    await pool.connect(user).withdraw(parseEther("20"));
    expect(await token.balanceOf(user.address)).to.equal(parseEther("70"));
    expect(await pool.balances(user.address)).to.equal(parseEther("30"));
  });
});
