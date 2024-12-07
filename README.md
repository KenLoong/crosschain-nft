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
