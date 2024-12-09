- filebase 网站注册一个账户:https://console.filebase.com/（公开图片需要收费，建议使用https://app.pinata.cloud/ipfs/files）
- 一个 meta 数据的例子
  跨链的原理：
- 验证过程中的哈希计算：
  当目标链上的节点或智能合约验证跨链操作时，它们确实需要访问源链的区块链数据。这包括计算和比对哈希值。目标链的合约通常通过预言机或其他去中心化的验证网络来获取源链的数据。
  • 例如，源链上的合约锁定资产时会触发一个事件，并生成一个交易哈希（transaction hash）。
  • 目标链上的合约会检查这个哈希是否与源链上发布的事件相匹配。如果匹配，目标链的合约会执行相应的操作（如铸造跨链资产、更新目标链状态等）。

```json
{
  "description": "Shiba Inu stands on the ground.",
  "external_url": "https://openseacreatures.io/3",
  "image": "https://ipfs.filebase.io/ipfs/QmVsPq1aNWYar6MtLTW2tqWwqcXWkk8LG76LB11eQhRjgk",
  "name": "Shiba Inu",
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Shiba Inu"
    },
    {
      "trait_type": "temperature",
      "value": "average"
    }
  ]
}
```

- 可以先把合约部署在 remix 来测试（连到自己的 metamask），避免写一堆脚本,部署完后，调用 safeMint 函数，往自己的账户里面构造 NFT，然后在 openset 的 testnet 网站可以看到自己有一个 nft 了，https://testnets.opensea.io/account

- safemint 函数的作用是什么？
- 跨链 lock 的意义是什么？
- link token ???
- to analyse the contracts
- 基础知识
  contract A 有 func 1
  contract B 调用 func1 , 此时 msg.sender 是 contract B's address
  用户直接调用 func1, 此时 msg.sender 是 user's address

- ccip 怎么验证 wnft 已经被烧掉了？

- 加密敏感信息
- npx env-enc set-pw
  npx env-enc set

- sepolia rpc 和 amoy rpc 使用自己的 alchamy 的 app

- todo:在测试网部署合约（分别使用不同的 tag）

npx hardhat deploy --network sepolia
• 部署成功后，Hardhat Deploy 会在 deployments/sepolia 文件夹下生成合约地址信息。

ethers.getContract("MyToken", firstAccount) 的作用是通过 Hardhat 的部署机制，在本地 deployments 文件夹 中查找已部署合约的相关信息（例如合约地址、ABI 等），然后通过 ethers 提供的工具生成一个可以直接与合约交互的实例

如果你重复部署了同一个合约（例如名称相同的合约），deployments 文件夹会默认覆盖旧的部署记录，并保留最新的部署地址和相关信息。这是因为 Hardhat 的 hardhat-deploy 插件会以合约的名称为键存储部署数据。

npx env-enc view :

在 source chain 部署合约：
npx hardhat deploy --tags sourcechain --network sepolia

在 sepolia 部署的合约地址：
Compiled 4 Solidity files successfully (evm target: paris).
Deploying the nft contract
deploying "MyToken" (tx: 0xfc5918b29b6188190041969c6cc89a46690a467096f55325afb39331fff94ad9)...: deployed at 0x04117983a81cE2553e65b3ba60C77ffaa5b8a850 with 2649530 gas
MyToken is deployed!
non local environment: sourcechain router: 0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59, link token: 0x779877A7B0D9E8603169DdbD7836e478b4624789
NFT address: 0x04117983a81cE2553e65b3ba60C77ffaa5b8a850
deploying the lmn pool
deploying "NFTPoolLockAndRelease" (tx: 0xa6b544ab440350ee973926a48738694c683dd7abdf7636b0631b0f1399c62948)...: deployed at 0x66AA812bFF101eF47b611Ae5Fbd0D17538D2d8eD with 2564601 gas
lmn pool deployed

在 amoy 部署合约
npx hardhat deploy --tags destchain --network amoy

Nothing to compile
deploying wrapped NFT on destination chain
deploying "WrappedNFT" (tx: 0xfe75d4f2ff769ac81f605f0f8b34e3a7e79f5431b6e998e3c4afb93b4920d648)...: deployed at 0xfF5ef84f7567f29DF53B9C99Bb83D27e73a8A66c with 2661119 gas
deployed wrapped nft
get the parameters: 0x9C32fCB86BF0f4a1A8921a9Fe46de3198bb884B2, 0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904, 0xfF5ef84f7567f29DF53B9C99Bb83D27e73a8A66c
deploying nftPoolBurnAndMint
deploying "NFTPoolBurnAndMint" (tx: 0xbaef2e536f75b6c77e874f47687c4997bb23de1a25ec5125e59d4b919ffa291d)...: deployed at 0xa7823699BC483C934E2bC0Feca89D5617Ad01C95 with 2489968 gas
nftPoolBurnAndMint deployed

## 铸造 nft

npx hardhat mint-nft --network sepolia

nft address is 0x04117983a81cE2553e65b3ba60C77ffaa5b8a850
minting NFT...
NFT minted, tokenId is 0

查看 nft 状态：npx hardhat check-nft --network sepolia

## 锁定 nft

npx hardhat lock-and-cross --tokenid 0 --network sepolia

deployer is 0x86a1721A01ec828CC612bA1350f0cCDdc651cf09
NFTPoolBurnAndMint address on destination chain is 0xa7823699BC483C934E2bC0Feca89D5617Ad01C95
destination chain selector is 16281711391670634445
balance before: 0
balance after: 10000000000000000000
approve successfully
0, 0x86a1721A01ec828CC612bA1350f0cCDdc651cf09, 16281711391670634445, 0xa7823699BC483C934E2bC0Feca89D5617Ad01C95
NFT locked and crossed, transaction hash is 0xd08941b25202cafa5c4bbe060a9833d44f1c7b2c6591bffdc7ed9a9ececa5a23

可以去 ccip 的网站查看交易状态,要等挺久才能 finalityde （Expected total: 20 min 39 sec）https://ccip.chain.link/

## 查看 wrapped NFT 状态

这个要等跨链 NFT 交易完成后，才能查看，否则会报错：ProviderError: execution reverted

npx hardhat check-wrapped-nft --tokenid 0 --network amoy

checking status of ERC-721
there are 1 tokens under the collection
TokenId: 0, Owner is 0x86a1721A01ec828CC612bA1350f0cCDdc651cf09

这时候再去查看 sepolia 的 nft 状态
npx hardhat check-nft --network sepolia
checking status of ERC-721
there are 1 tokens under the collection
TokenId: 0, Owner is 0x66AA812bFF101eF47b611Ae5Fbd0D17538D2d8eD
(持有人已经变成合约 NFTPoolLockAndRelease 的地址了)

去https://www.oklink.com/amoy测试网，就可以看到目前你的账号在amoy拥有nft了
通过 WrappedNFT 合约，持有这个 nft

## 燃烧这一步我就不执行了，pol 不够用了

燃烧并且跨链 wnft：npx hardhat burn-and-cross --tokenid 0 --network amoy

- Amoy 网络：需要支付原生代币 POL 作为燃烧的 Gas 费用。
- Sepolia 网络：需要支付 ETH（Sepolia 上的测试币）作为跨链接收的 Gas。
- 协议使用 Chainlink，需要 LINK 代币作为预言机服务费用。

#TODO:
构建一个公开的 yuki nft,需要写 meta 文件
{
"description": "Shiba Inu stands on the ground.",
"external_url": "https://openseacreatures.io/3",
"image": "https://ipfs.filebase.io/ipfs/QmVsPq1aNWYar6MtLTW2tqWwqcXWkk8LG76LB11eQhRjgk",
"name": "Shiba Inu",
"attributes": [
{
"trait_type": "Breed",
"value": "Shiba Inu"
},
{
"trait_type": "temperature",
"value": "average"
}
]
}
