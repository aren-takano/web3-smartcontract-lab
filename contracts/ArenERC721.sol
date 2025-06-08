// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
contract ArenERC721 is ERC721 {
    uint256 public tokenCounter;
    constructor() ERC721("ArenNFT", "ANFT") {
        tokenCounter = 0;
    }
    function mint(address to) public returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(to, newItemId);
        tokenCounter += 1;
        return newItemId;
    }
}
