// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract ArenERC20 is ERC20 {
    constructor(uint256 initialSupply) ERC20("Aren Token", "ATK") {
        _mint(msg.sender, initialSupply * 1e18);
    }
}
