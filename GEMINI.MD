我现在想写一个ts-sdk,主要是对接各个区块链, 如 bitcoin,ethereum, solana, polkadot, etc.
我希望使用monorepo的方式来管理这个项目, 使用pnpm来管理依赖, changesets来管理版本, 使用github actions来管理发布.

使用typescript来编写, 使用vitest来管理测试, 最好是能打包成 commonjs 和 esm 两种格式.

utils 包, 包含以下功能:
- 常用的 hex 编码解码, 转换, hexToBn, hexToU8a
- 常用的 base58 编码解码, 转换, base58ToBn, base58ToU8a, u8aToBase58, etc.
- 常用的 base64 编码解码, 转换, base64ToBn, base64ToU8a, u8aToBase64, etc.
- 常用的 stringToU8a, u8aToString, etc.

我需要一个工具, 能够根据我输入的区块链名称, 自动生成一个sdk, 这个sdk需要包含以下功能:

- 能够根据我输入的区块链名称, 自动生成一个sdk, 这个sdk需要包含以下功能:
  - 公钥生成地址
  - 私密生成公钥
  - 签名
  - 验证
  - 交易
  - 查询





