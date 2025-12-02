// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Staking
 * @dev A simple staking contract where users can stake NiniCoin and earn rewards.
 * Rewards are calculated based on a fixed rate per second.
 */
contract Staking is Ownable {
    IERC20 public token;

    struct Position {
        uint256 amount;
        uint256 timestamp;
    }

    // Mapping from user address to their staking position
    mapping(address => Position) public positions;

    // Fixed reward rate: 10 tokens per second
    uint256 public constant REWARD_RATE = 10 * 10**18;

    /**
     * @dev Constructor sets the token to be staked.
     * @param _token Address of the ERC20 token.
     */
    constructor(address _token) Ownable(msg.sender) {
        token = IERC20(_token);
    }

    /**
     * @dev Stakes a specific amount of tokens.
     * @param amount The amount of tokens to stake.
     * Requirements:
     * - User must not have an active stake (simple version limitation).
     * - User must have approved the contract to spend the tokens.
     */
    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(positions[msg.sender].amount == 0, "Already staking");

        // Transfer tokens from user to contract
        token.transferFrom(msg.sender, address(this), amount);

        // Create new position
        positions[msg.sender] = Position({
            amount: amount,
            timestamp: block.timestamp
        });
    }

    /**
     * @dev Calculates the pending reward for the caller.
     * @return The pending reward amount.
     */
    function claimReward() public view returns (uint256) {
        Position memory position = positions[msg.sender];
        if (position.amount == 0) {
            return 0;
        }

        uint256 timeElapsed = block.timestamp - position.timestamp;
        return timeElapsed * REWARD_RATE;
    }

    /**
     * @dev Withdraws the staked amount plus accrued rewards.
     * Deletes the position after withdrawal.
     */
    function withdraw() external {
        Position memory position = positions[msg.sender];
        require(position.amount > 0, "No active stake");

        uint256 reward = claimReward();
        uint256 totalAmount = position.amount + reward;

        // Reset position before transfer to prevent re-entrancy (though less risky here with simple transfer)
        delete positions[msg.sender];

        // Transfer principal + reward to user
        require(token.transfer(msg.sender, totalAmount), "Transfer failed");
    }
}
