// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

contract Events {
    event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
    event SoldTokens(
        address buyer,
        uint256 amountOfETH,
        uint256 amountOfTokens
    );
    event WinnerDeclared(address winner, uint256 winnings);

    event Log(address addr, uint256 amount, string msg);
}
