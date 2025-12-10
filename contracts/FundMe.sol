// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./PriceConverter.sol";

// Get funds from users
// Withdraw funds
// Set a minimum funding value in USD

contract FundMe {
    // 1. Use the PriceConverter library for uint256
    // This allows us to call functions from that library directly on uint256 numbers if we want.
    using PriceConverter for uint256;

    // 2. State Variables
    // Minimum amount is 50 USD
    // We multiply by 1e18 to match the standard ETH wei decimals for comparison
    uint256 public constant MINIMUM_USD = 50 * 1e18;

    // Keep track of who sent us money
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    // 3. Fund Function
    // People send money here
    function fund() public payable {
        // We need to check if the amount sent (msg.value) is greater than MINIMUM_USD.
        // But msg.value is in ETH (Wei) and MINIMUM_USD is in USD.
        
        // Step A: Get the price from our library
        uint256 ethPrice = PriceConverter.getLatestPrice();
        
        // Step B: Math to convert ETH amount to USD value
        // 1. ethPrice has 8 decimals (e.g., 300000000000 for 3000 USD)
        // 2. msg.value has 18 decimals (Wei)
        // 3. We need to normalize to 18 decimals to compare with MINIMUM_USD
        
        // Formula: (ETH_Amount * ETH_Price) / 1e8 
        // Note: In production, we usually do (Price * 1e10) * Amount / 1e18 to be precise, 
        // but let's do the manual conversion here to be clear:
        
        // Adjust price to 18 decimals (add 10 zeros)
        uint256 ethPriceIn18Decimals = ethPrice * 1e10; 
        
        // Calculate value in USD (scaled to 18 decimals)
        uint256 ethAmountInUsd = (ethPriceIn18Decimals * msg.value) / 1e18;

        // Step C: The Check
        require(ethAmountInUsd >= MINIMUM_USD, "You need to spend more ETH!");

        // If the check passes:
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;
    }
    
    // Helper function to see the current balance of this contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}