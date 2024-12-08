- filebase 网站注册一个账户:https://console.filebase.com/
- 一个 meta 数据的例子

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
Deploying the nft contract
deploying "MyToken" (tx: 0xebe448aa8d8609f840c8fa9ddcf81d774446e209b7cdd2335b24084127994136)...: deployed at 0xEE0dE5c623E1Fe54af8F3Ea325f4496013709a9c with 2649530 gas
MyToken is deployed!
non local environment: sourcechain router: 0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59, link token: 0x779877A7B0D9E8603169DdbD7836e478b4624789
NFT address: 0xEE0dE5c623E1Fe54af8F3Ea325f4496013709a9c
deploying the lmn pool
deploying "NFTPoolLockAndRelease" (tx: 0xd806f7ca69aa594f8aaf45cca0f45cdeee23db0eb6036541c7485eff58c7664a)...: deployed at 0xe7840833a1e8A0808d452a50BcC6Ba8cA5b16fbA with 2564601 gas

看到 3:07:00
