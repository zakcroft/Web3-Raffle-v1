const LotteryToken = artifacts.require("LotteryToken");
const Lottery = artifacts.require("Lottery");

module.exports = async function (deployer) {
  const _MAX_COINS = 2500000;
  const _JACKPOT = 1000000;
  await deployer.deploy(LotteryToken, _MAX_COINS);
  await deployer.deploy(Lottery, LotteryToken.address);

  const lotteryToken = await LotteryToken.deployed();

  // msg.sender is the owner account[0] so comes from balances of account[0]
  await lotteryToken.transfer(Lottery.address, _JACKPOT);

  // Now we have
  // lotteryToken.balanceOf(accounts[0])  => 1500000
  // lotteryToken.balanceOf(lottery.address) => 1000000
};
