// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title Simple staking pool for ArenERC20 tokens
/// @notice Users can stake tokens and withdraw them later
contract StakingPool {
    IERC20 public immutable token;
    mapping(address => uint256) public balances;

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "amount > 0");
        balances[msg.sender] += amount;
        require(token.transferFrom(msg.sender, address(this), amount), "transfer failed");
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "insufficient balance");
        balances[msg.sender] -= amount;
        require(token.transfer(msg.sender, amount), "transfer failed");
    }
}
