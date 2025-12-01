// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Crowdsale {
    IERC20 public token;
    uint256 public rate;

    constructor(address tokenAddress, uint256 _rate) {
        token = IERC20(tokenAddress);
        rate = _rate;
    }

    function buyTokens() public payable {
        uint256 amount = msg.value * rate;
        require(token.balanceOf(address(this)) >= amount, "Not enough tokens in contract");
        token.transfer(msg.sender, amount);
    }
}
