const LotteryToken = artifacts.require("LotteryToken");
const Lottery = artifacts.require("Lottery");

module.exports = async function (deployer) {
  const _MAX_COINS = 2500000;
  const _JACKPOT = 1000000;
  await deployer.deploy(LotteryToken, _MAX_COINS);
  await deployer.deploy(Lottery, LotteryToken.address);

  const lotteryToken = await LotteryToken.deployed();
  await lotteryToken.transfer(Lottery.address, _JACKPOT);
};
