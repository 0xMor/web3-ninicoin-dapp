// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    // We change this to 'internal' so it can be used by the contract importing it
    function getLatestPrice() internal view returns (uint256) {
        // Sepolia ETH/USD Address
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );

        (
            /* uint80 roundID */,
            int price,
            /* uint startedAt */,
            /* uint timeStamp */,
            /* uint80 answeredInRound */
        ) = priceFeed.latestRoundData();

        // Type casting: Msg.value is uint256, but Chainlink returns int.
        // We cast it here to avoid errors in FundMe.sol
        return uint256(price);
    }
}