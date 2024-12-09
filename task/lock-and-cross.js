const { task } = require("hardhat/config");
const { networkConfig } = require("../helper-hardhat-config");

task("lock-and-cross")
  .addParam("tokenid", "tokenId to be locked and crossed")
  .addOptionalParam("chainselector", "chain selector of destination chain")
  .addOptionalParam("receiver", "receiver in the destination chain")
  .setAction(async (taskArgs, hre) => {
    // get tokenId from parameter
    const tokenId = taskArgs.tokenid;

    const { firstAccount } = await getNamedAccounts();
    console.log(`deployer is ${firstAccount}`);

    // get receiver contract
    // deployed contract will be used if there is no receiver provided
    let destReceiver;
    if (taskArgs.receiver) {
      destReceiver = taskArgs.receiver;
    } else {
      const nftBurnAndMint = await hre.companionNetworks[
        "destChain"
      ].deployments.get("NFTPoolBurnAndMint");
      destReceiver = nftBurnAndMint.address;
    }
    console.log(
      `NFTPoolBurnAndMint address on destination chain is ${destReceiver}`
    );

    // get the chain selector of destination chain
    // deployed contract will be used if there is no chain selector provided
    let destChainSelector;
    if (taskArgs.chainselector) {
      destChainSelector = taskArgs.chainselector;
    } else {
      destChainSelector =
        networkConfig[network.config.chainId].companionChainSelector;
    }
    console.log(`destination chain selector is ${destChainSelector}`);

    const nftPoolLockAndRelease = await ethers.getContract(
      "NFTPoolLockAndRelease",
      firstAccount
    );

    /*
        const linkTokenAddr = networkConfig[network.config.chainId].linkToken
        const linkToken = await ethers.getContractAt("LinkToken", linkTokenAddr)
        
        
        // transfer 10 LINK token from deployer to pool
        const balanceBefore = await linkToken.balanceOf(nftPoolLockAndRelease.target)
        console.log(`balance before: ${balanceBefore}`)
        // todo：实践跨链消耗的link token是0.0183868974759271 LINK
        // 所以自己修改这里要发送的link token数量吧，避免浪费
        // 我成功执行的跨链交易链接：https://ccip.chain.link/#/side-drawer/msg/0x8ac21dd2f8c833581b6bb30cf3aa3b6c956c86b631a1f3f5008df729e2e28585
        const transferTx = await linkToken.transfer(nftPoolLockAndRelease.target, ethers.parseEther("1"))
        await transferTx.wait(6)
        const balanceAfter = await linkToken.balanceOf(nftPoolLockAndRelease.target)
        console.log(`balance after: ${balanceAfter}`)
        */

    // approve the pool have the permision to transfer deployer's token
    const nft = await ethers.getContract("MyToken", firstAccount);
    await nft.approve(nftPoolLockAndRelease.target, tokenId);
    console.log("approve successfully");

    // ccip send
    console.log(
      `${tokenId}, ${firstAccount}, ${destChainSelector}, ${destReceiver}`
    );
    const lockAndCrossTx = await nftPoolLockAndRelease.lockAndSendNFT(
      tokenId,
      firstAccount,
      destChainSelector,
      destReceiver
    );

    // provide t
    console.log(
      `NFT locked and crossed, transaction hash is ${lockAndCrossTx.hash}`
    );
  });

module.exports = {};
