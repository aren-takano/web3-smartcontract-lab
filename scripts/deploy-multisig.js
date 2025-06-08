const { ethers } = require("hardhat");

async function main() {
  const owners = [/* Add your addresses here */];
  const required = 2;
  const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
  const multisig = await MultiSigWallet.deploy(owners, required);
  await multisig.deployed();
  console.log("MultiSigWallet deployed to:", multisig.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
