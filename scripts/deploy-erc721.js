const { ethers } = require("hardhat");

async function main() {
  const ArenERC721 = await ethers.getContractFactory("ArenERC721");
  const erc721 = await ArenERC721.deploy();
  await erc721.deployed();
  console.log("ArenERC721 deployed to:", erc721.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
