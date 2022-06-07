// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./Events.sol";
import "./LotteryToken.sol";

contract Lottery is Ownable, Events {
    enum LOTTERY_STATE {
        OPEN,
        CLOSED,
        CALCULATING_WINNER
    }
    LOTTERY_STATE public lottery_state;
    uint256 private constant _PRIZE_FUND = 1000;
    address payable[] public players;
    mapping(address => bool) playersMap;
    address public lastWinner;
    address public saleTokens;

    LotteryToken public token;

    constructor(address tokenAddress) {
        token = LotteryToken(tokenAddress);
        lottery_state = LOTTERY_STATE.OPEN;
    }

    modifier lotteryIsOpen() {
        assert(lottery_state == LOTTERY_STATE.OPEN);
        _;
    }

    function closeLottery() public onlyOwner {
        require(
            lottery_state != LOTTERY_STATE.CLOSED,
            "Lottery already closed"
        );
        // reset dynamic memory array
        players = new address payable[](0);
        lottery_state = LOTTERY_STATE.CLOSED;
    }

    function openLottery() public onlyOwner {
        require(lottery_state == LOTTERY_STATE.CLOSED, "Lottery already open");
        lottery_state = LOTTERY_STATE.OPEN;
    }

    function buyLotteryTokens()
        external
        payable
        lotteryIsOpen
        returns (uint256 tokenAmount)
    {
        // 0.1 ether == "100000000000000000"
        require(msg.value == 0.1 ether, "Send only 0.1 ETH to buy 100 tokens");

        // Can only buy 100 at a time.
        uint256 amountToBuy = 100;

        emit Log(msg.sender, amountToBuy, "Bought tokens");
        // basically this on cmd lotteryToken.balanceOf(lottery.address)
        uint256 lotteryTokenBalance = token.balanceOf(address(this));
        require(
            lotteryTokenBalance >= amountToBuy,
            "Vendor contract has not enough tokens in its balance"
        );

        // Contract A calls Contract B
        // _transfer(lotteryContract, account[1], amountToBuy);
        // msg.sender is different from msg.sender in the erc20 as its the lotteryContract in erc20
        bool sent = token.transfer(msg.sender, amountToBuy);
        require(sent, "Failed to transfer token to user");

        emit BuyTokens(msg.sender, msg.value, amountToBuy);

        return amountToBuy;
    }

    function enterLottery(uint256 lotteryTokensAmountToEnter)
        external
        lotteryIsOpen
    {
        uint256 playerBalance = token.balanceOf(msg.sender);
        require(
            playerBalance >= 0,
            "You need to approve lotteryTokens from the lottery contract first"
        );
        require(
            lotteryTokensAmountToEnter >= 100,
            "Minimum 100 LotteryTokens to enter"
        );

        // does not work
        // token.approve(address(this), amountToEnter)
        // because Lottery calls LotteryToken and msg.sender becomes Lottery in LotteryToken.approve
        // not the msg.sender of the call to enterLottery()
        // Contract A calls Contract B

        // so bought them and then send back to enter the lottery.
        token.transferFrom(
            msg.sender,
            address(this),
            lotteryTokensAmountToEnter
        );
        players.push(payable(msg.sender));

        emit Log(msg.sender, lotteryTokensAmountToEnter, "Lottery Entered");
    }

    function getRandomNumber() public view returns (uint256) {
        uint256 rnd = uint256(
            keccak256(
                abi.encodePacked(block.difficulty, block.timestamp, players)
            )
        );

        return rnd;
    }

    function pickWinner() public lotteryIsOpen onlyOwner {
        lottery_state = LOTTERY_STATE.CALCULATING_WINNER;

        // TODO with getRandomNumber()
        lastWinner = players[players.length - 1];
        uint256 winnings = address(this).balance;

        closeLottery();

        payable(lastWinner).transfer(address(this).balance);

        emit WinnerDeclared(lastWinner, winnings);
    }

    //    function isParticipate(address _participant) private view returns (bool) {
    //        for (uint256 i = 0; i < players.length; i++) {
    //            if (players[i] == _participant) {
    //                return true;
    //            }
    //        }
    //        return false;
    //    }
}

// cmds

// const lottery  = await Lottery.deployed()
// const lotteryToken  = await LotteryToken.deployed()

// web3.eth.getBalance(lottery.address);  // no eth
// lotteryToken.balanceOf(lottery.address) // gives lottery quota 1000000

// await lotteryToken.totalSupply() // gives max coins 2500000

// lotteryToken.balanceOf(accounts[1])  0

// lottery.buyLotteryTokens({ from:accounts[1], value:"100000000000000000"})

// must approve from the token first.
// lotteryToken.allowance(accounts[1], lottery.address) // 0
// lotteryToken.approve(lottery.address, "100", { from:accounts[1] }); // owner => (spender => amount)
// lotteryToken.allowance(accounts[1], lottery.address) // 100

// Now enter and use the transferFrom
// const res = await lottery.enterLottery("100", { from:accounts[1] })

// lottery.pickWinner()

// Other
// res.logs[1].args.amount

// fromWei converts any wei value into a ether value.
// const amountToBuy =  web3.utils.fromWei("100000000000000000")
