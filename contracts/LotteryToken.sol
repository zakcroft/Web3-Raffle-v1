// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LotteryToken is ERC20Capped, ERC20Burnable, Ownable {
    constructor(
        uint256 _MAX_COINS
    ) ERC20("LottoToken", "LOT") ERC20Capped(_MAX_COINS) {
        // Owner of the contract is the sender.
        // msg.sender is account[0] the creator/owner of the contract
        // Someone needs to be the owner to access the new coins
        _mint(msg.sender, _MAX_COINS);
        // before migration finishes coins are in the token balance mapping
        // lotteryToken.balanceOf(accounts[0])  => 2500000
    }

    function _mint(
        address account,
        uint256 amount
    ) internal override(ERC20, ERC20Capped) {
        ERC20Capped._mint(account, amount);
    }
}
