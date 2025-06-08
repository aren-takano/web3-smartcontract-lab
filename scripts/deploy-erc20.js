const { ethers } = require("hardhat");

async function main() {
  const initialSupply = 1000000;
  const ArenERC20 = await ethers.getContractFactory("ArenERC20");
  const erc20 = await ArenERC20.deploy(initialSupply);
  await erc20.deployed();
  console.log("ArenERC20 deployed to:", erc20.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
