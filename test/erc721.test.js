const { expect } = require("chai");

describe("ArenERC721", function () {
  it("should mint a new NFT", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("ArenERC721");
    const nft = await NFT.deploy();
    await nft.deployed();

    await nft.mint(addr1.address);
    expect(await nft.ownerOf(0)).to.equal(addr1.address);
  });
});
