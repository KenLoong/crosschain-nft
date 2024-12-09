# 第一步

```sh
npx hardhat deploy --tags sourcechain --network sepolia
```

输出：

```sh
Compiled 4 Solidity files successfully (evm target: paris).
Deploying the nft contract
deploying "MyToken" (tx: 0x85efd17c3f43709449a955c28b3cee11ca7060b77ccb44ccfb63d41f67f60820)...: deployed at 0x46e0843c3dA9f90868A35dADd7f96D525b5d8fcB with 2652345 gas
MyToken is deployed!
non local environment: sourcechain router: 0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59, link token: 0x779877A7B0D9E8603169DdbD7836e478b4624789
NFT address: 0x46e0843c3dA9f90868A35dADd7f96D525b5d8fcB
deploying the lmn pool
deploying "NFTPoolLockAndRelease" (tx: 0xc74b3421ecdebcff0bba2feebf564d576568ae5e59c45784428e854fcd46e7dc)...: deployed at 0xB167d97d6e68e248F24A7c586e1ff33DCa9aaFb0 with 2564601 gas
lmn pool deployed
```

# 第二步

```sh
npx hardhat deploy --tags destchain --network amoy
```

输出

```sh
Nothing to compile
deploying wrapped NFT on destination chain
deploying "WrappedNFT" (tx: 0x24ce2e39fbdad0f34f6d7f49874c0520f5e526e50470ad8486af66c25b8766d0)...: deployed at 0x35d057444803A79aB1076D8f1758E98653EC6aFD with 2663927 gas
deployed wrapped nft
get the parameters: 0x9C32fCB86BF0f4a1A8921a9Fe46de3198bb884B2, 0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904, 0x35d057444803A79aB1076D8f1758E98653EC6aFD
deploying nftPoolBurnAndMint
deploying "NFTPoolBurnAndMint" (tx: 0xf46f5eb85a207fcc3e052d1fb99bd1832785d74abe57aba69b5b04d37dcf3ca7)...: deployed at 0x46e474c731A5C42b26A27d2Fd97aCDB8aE734b32 with 2489968 gas
nftPoolBurnAndMint deployed
```

# 第三步

(执行两次，方便你对比一个跨链的 nft 和没有跨链的 nft)

```sh
npx hardhat mint-nft --network sepolia
```

```sh
nft address is 0x46e0843c3dA9f90868A35dADd7f96D525b5d8fcB
minting NFT...
NFT minted, tokenId is 0
```

```sh
npx hardhat mint-nft --network sepolia
nft address is 0x46e0843c3dA9f90868A35dADd7f96D525b5d8fcB
minting NFT...
NFT minted, tokenId is 1
```

# 检查状态

```sh
npx hardhat check-nft --network sepolia
```

输出

```sh
checking status of ERC-721
there are 2 tokens under the collection
TokenId: 0, Owner is 0x86a1721A01ec828CC612bA1350f0cCDdc651cf09
TokenId: 1, Owner is 0x86a1721A01ec828CC612bA1350f0cCDdc651cf09
```

# 锁定并跨链

```sh
npx hardhat lock-and-cross --tokenid 0 --network sepolia
```

输出

```sh
deployer is 0x86a1721A01ec828CC612bA1350f0cCDdc651cf09
NFTPoolBurnAndMint address on destination chain is 0x46e474c731A5C42b26A27d2Fd97aCDB8aE734b32
destination chain selector is 16281711391670634445
approve successfully
0, 0x86a1721A01ec828CC612bA1350f0cCDdc651cf09, 16281711391670634445, 0x46e474c731A5C42b26A27d2Fd97aCDB8aE734b32
NFT locked and crossed, transaction hash is 0x99221770ca922f04eb34e9a4ebf95be6c41af7efd8a5f86aa3fb912ef16f51ea
```

由于 chainlink 要模拟真实的跨链，所以即使是测试网，跨链的交易要最终到达 Success 状态也是很长的，大概需要 20 分钟,可以在这里查看跨链交易的状态：https://ccip.chain.link/

# 查看状态

```sh
npx hardhat check-wrapped-nft --tokenid 0 --network amoy
```

输出,nft token 0 的 owner 已经转移到 amoy 了

```
checking status of ERC-721
there are 1 tokens under the collection
TokenId: 0, Owner is 0x86a1721A01ec828CC612bA1350f0cCDdc651cf09
```

```sh
npx hardhat check-nft --network sepolia
```

输出

```
checking status of ERC-721
there are 2 tokens under the collection
TokenId: 0, Owner is 0xB167d97d6e68e248F24A7c586e1ff33DCa9aaFb0
TokenId: 1, Owner is 0x86a1721A01ec828CC612bA1350f0cCDdc651cf09
```
