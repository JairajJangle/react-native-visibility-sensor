# [1.4.0](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.22...v1.4.0) (2025-08-26)


### Bug Fixes

* add window dimension change listener to handle orientation changes ([5f640db](https://github.com/JairajJangle/react-native-visibility-sensor/commit/5f640db1be9f447f9b82aece4b1e9a366df36573))
* added missing state dependencies in visiblity calculations ([af0161c](https://github.com/JairajJangle/react-native-visibility-sensor/commit/af0161c6fcfb4d72f7db97e7fb1c88cc96706c13))
* handle initial visibility state and improve measurement timing ([f5e4de7](https://github.com/JairajJangle/react-native-visibility-sensor/commit/f5e4de7dd7802951a5654fe9ab8cf574f9f4d52d))
* **perf:** reduced unnecessary onPercentChange callback calls when last percent is already 0 ([39e8aa8](https://github.com/JairajJangle/react-native-visibility-sensor/commit/39e8aa847b42eabe9341e4bec96c35f1b8c67972))
* prevent race conditions during rapid mount/unmount cycles ([de6cb59](https://github.com/JairajJangle/react-native-visibility-sensor/commit/de6cb59111b4b8944d3070bb826290b8941340c5))
* prevent state updates on unmounted components ([6c9786a](https://github.com/JairajJangle/react-native-visibility-sensor/commit/6c9786a1ccc46e5c48813e349a7e6aabb9b4052a))


### Features

* added percent visiblity callback requested in [#44](https://github.com/JairajJangle/react-native-visibility-sensor/issues/44) ([e78fa27](https://github.com/JairajJangle/react-native-visibility-sensor/commit/e78fa27a9fe2d8c37227f3ab6022964aeafe8b37))


### Performance Improvements

* conserved percent calc. if view is not visible - [#44](https://github.com/JairajJangle/react-native-visibility-sensor/issues/44) ([81d0036](https://github.com/JairajJangle/react-native-visibility-sensor/commit/81d003651348dcfb871d832137330d174f1f56e2))

# [1.4.0-beta.3](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.4.0-beta.2...v1.4.0-beta.3) (2025-08-26)


### Bug Fixes

* **perf:** reduced unnecessary onPercentChange callback calls when last percent is already 0 ([39e8aa8](https://github.com/JairajJangle/react-native-visibility-sensor/commit/39e8aa847b42eabe9341e4bec96c35f1b8c67972))

# [1.4.0-beta.2](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.4.0-beta.1...v1.4.0-beta.2) (2025-08-23)


### Bug Fixes

* added missing state dependencies in visiblity calculations ([af0161c](https://github.com/JairajJangle/react-native-visibility-sensor/commit/af0161c6fcfb4d72f7db97e7fb1c88cc96706c13))

# [1.4.0-beta.1](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.22...v1.4.0-beta.1) (2025-08-23)


### Bug Fixes

* add window dimension change listener to handle orientation changes ([5f640db](https://github.com/JairajJangle/react-native-visibility-sensor/commit/5f640db1be9f447f9b82aece4b1e9a366df36573))
* handle initial visibility state and improve measurement timing ([f5e4de7](https://github.com/JairajJangle/react-native-visibility-sensor/commit/f5e4de7dd7802951a5654fe9ab8cf574f9f4d52d))
* prevent race conditions during rapid mount/unmount cycles ([de6cb59](https://github.com/JairajJangle/react-native-visibility-sensor/commit/de6cb59111b4b8944d3070bb826290b8941340c5))
* prevent state updates on unmounted components ([6c9786a](https://github.com/JairajJangle/react-native-visibility-sensor/commit/6c9786a1ccc46e5c48813e349a7e6aabb9b4052a))


### Features

* added percent visiblity callback requested in [#44](https://github.com/JairajJangle/react-native-visibility-sensor/issues/44) ([e78fa27](https://github.com/JairajJangle/react-native-visibility-sensor/commit/e78fa27a9fe2d8c37227f3ab6022964aeafe8b37))


### Performance Improvements

* conserved percent calc. if view is not visible - [#44](https://github.com/JairajJangle/react-native-visibility-sensor/issues/44) ([81d0036](https://github.com/JairajJangle/react-native-visibility-sensor/commit/81d003651348dcfb871d832137330d174f1f56e2))

## [1.3.22](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.21...v1.3.22) (2025-08-12)


### Bug Fixes

* upgrade expo from 53.0.19 to 53.0.20 ([8e99031](https://github.com/JairajJangle/react-native-visibility-sensor/commit/8e9903196584a60e884c55b2b3d0e302fc343978))

## [1.3.21](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.20...v1.3.21) (2025-07-18)


### Bug Fixes

* upgrade expo from 53.0.11 to 53.0.12 ([535c141](https://github.com/JairajJangle/react-native-visibility-sensor/commit/535c141a62147b47d18b52172ccd5f99a0c20842))

## [1.3.20](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.19...v1.3.20) (2025-06-14)


### Bug Fixes

* dep version upgrade + fixed package metadata ([d16adc5](https://github.com/JairajJangle/react-native-visibility-sensor/commit/d16adc55c5b90bdfdd9421a9735e6b92f187f767))

## [1.3.19](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.18...v1.3.19) (2025-06-10)


### Bug Fixes

* deps upgraded ([1252fee](https://github.com/JairajJangle/react-native-visibility-sensor/commit/1252fee2e45b9121d64fc95fefd11b8c67cee4a2))

## [1.3.18](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.17...v1.3.18) (2025-05-13)


### Bug Fixes

* upgrade react-dom from 19.0.0 to 19.1.0 ([55cebfe](https://github.com/JairajJangle/react-native-visibility-sensor/commit/55cebfe142e8fc43fcda1a82ecc3ea43ef8e5963))

## [1.3.17](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.16...v1.3.17) (2025-05-13)


### Bug Fixes

* upgrade react from 19.0.0 to 19.1.0 ([4a57e4f](https://github.com/JairajJangle/react-native-visibility-sensor/commit/4a57e4fcf5ff4390e0b3cd75d637cc2e8b9846b2))

## [1.3.16](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.15...v1.3.16) (2025-05-11)


### Bug Fixes

* upgraded example app to expo sdk 53 ([6310358](https://github.com/JairajJangle/react-native-visibility-sensor/commit/6310358b9e7efa35cf17ba3ece5509a868250e40))

## [1.3.15](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.14...v1.3.15) (2025-04-26)


### Bug Fixes

* incorrect visibility state on initial render - fixes [#30](https://github.com/JairajJangle/react-native-visibility-sensor/issues/30) ([d60a411](https://github.com/JairajJangle/react-native-visibility-sensor/commit/d60a41188a44d48ce038b205252ba5880d30e509)), closes [#33](https://github.com/JairajJangle/react-native-visibility-sensor/issues/33)

## [1.3.14](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.13...v1.3.14) (2025-04-14)


### Bug Fixes

* updated lock file deps ([3ee154b](https://github.com/JairajJangle/react-native-visibility-sensor/commit/3ee154b8fb0a853433db707a8de39ac65509be5c))

## [1.3.13](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.12...v1.3.13) (2025-04-06)


### Bug Fixes

* upgraded multiple deps ([3ccaa2c](https://github.com/JairajJangle/react-native-visibility-sensor/commit/3ccaa2c8f14ead661df4db0e2393218f1a7eef16))

## [1.3.12](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.11...v1.3.12) (2025-03-11)


### Bug Fixes

* upgrade expo from 52.0.32 to 52.0.35 ([3b93316](https://github.com/JairajJangle/react-native-visibility-sensor/commit/3b9331669b35a599db653f71e173b95cbcff1cd8))

## [1.3.11](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.10...v1.3.11) (2025-02-11)


### Bug Fixes

* upgrade expo from 52.0.25 to 52.0.27 ([fef8acd](https://github.com/JairajJangle/react-native-visibility-sensor/commit/fef8acdde9263075995dfd85c5e3d2cee4017261))

## [1.3.10](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.9...v1.3.10) (2025-02-04)


### Bug Fixes

* upgrade react-native from 0.76.0 to 0.76.6 ([e239ae3](https://github.com/JairajJangle/react-native-visibility-sensor/commit/e239ae3051ddd66413bc447c5282b9b55511e2bb))

## [1.3.9](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.8...v1.3.9) (2025-01-18)


### Bug Fixes

* upgrade expo from 52.0.18 to 52.0.21 ([e47a69f](https://github.com/JairajJangle/react-native-visibility-sensor/commit/e47a69f418c1bf56517db93fa9633ad1dad75967))

## [1.3.8](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.7...v1.3.8) (2024-12-16)


### Bug Fixes

* upgrade expo from 52.0.7 to 52.0.11 ([8336047](https://github.com/JairajJangle/react-native-visibility-sensor/commit/83360473af762e2f60f2129302b5ada274d2f894))

## [1.3.7](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.6...v1.3.7) (2024-11-17)


### Bug Fixes

* example/package.json & example/yarn.lock to reduce vulnerabilities ([e596d6d](https://github.com/JairajJangle/react-native-visibility-sensor/commit/e596d6dd4574f49a84dc39f70cc07dd142cea7e4))

## [1.3.6](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.5...v1.3.6) (2024-11-17)


### Bug Fixes

* example/package.json & example/yarn.lock to reduce vulnerabilities ([23d75f6](https://github.com/JairajJangle/react-native-visibility-sensor/commit/23d75f6c314a6cc858b67ab14af8308bc41ef638))

## [1.3.5](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.4...v1.3.5) (2024-10-22)


### Bug Fixes

* upgrade expo from 51.0.34 to 51.0.35 ([5b23e0b](https://github.com/JairajJangle/react-native-visibility-sensor/commit/5b23e0b1f093edaae7c0091b08613496a8d7d6ad))

## [1.3.4](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.3...v1.3.4) (2024-09-26)


### Bug Fixes

* upgrade expo from 51.0.31 to 51.0.32 ([751ba97](https://github.com/JairajJangle/react-native-visibility-sensor/commit/751ba97446dca5327d8f03c524b244bf886feb1c))
* upgrade react-native from 0.75.1 to 0.75.2 ([c15f073](https://github.com/JairajJangle/react-native-visibility-sensor/commit/c15f0734e745e2aee11bf818d8300367def2fb3f))

## [1.3.3](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.2...v1.3.3) (2024-09-09)


### Bug Fixes

* upgrade react-dom from 18.2.0 to 18.3.1 ([8f8f34e](https://github.com/JairajJangle/react-native-visibility-sensor/commit/8f8f34ea6002d3010a5905725002ce49cf2aab11))
* upgrade react-native from 0.74.5 to 0.75.1 ([1413631](https://github.com/JairajJangle/react-native-visibility-sensor/commit/14136314728b7f06c97bb6a4de1b4c3e00c7250e))

## [1.3.2](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.1...v1.3.2) (2024-09-08)


### Bug Fixes

* upgraded deps ([542e4f1](https://github.com/JairajJangle/react-native-visibility-sensor/commit/542e4f10af074050d00a037c32ef75262cd62c86))

## [1.3.1](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.3.0...v1.3.1) (2024-09-05)


### Bug Fixes

* upgrade react-dom from 18.2.0 to 18.3.1 ([293b129](https://github.com/JairajJangle/react-native-visibility-sensor/commit/293b129da39f591ad7159d727c512f497f2dcfdf))

# [1.3.0](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.2.9...v1.3.0) (2024-08-27)


### Features

* trigger release ([d1436e4](https://github.com/JairajJangle/react-native-visibility-sensor/commit/d1436e41ef9c168d5f28cfda6db2875ae810170b))

## [1.2.9](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.2.8...v1.2.9) (2024-05-11)


### Bug Fixes

* **semantic_release:** updated gh actions to v4 ([33142d2](https://github.com/JairajJangle/react-native-visibility-sensor/commit/33142d2f26e5c778a3445b0eeffc7b458b6320ce))
* **semantic_release:** updated lock files ([ca77dfc](https://github.com/JairajJangle/react-native-visibility-sensor/commit/ca77dfceaf65b8475e28a0dd13247b4df4de0b90))

## [1.2.8](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.2.7...v1.2.8) (2024-05-11)


### Bug Fixes

* **semantic_release:** removed duplicate release config from package json ([397f18c](https://github.com/JairajJangle/react-native-visibility-sensor/commit/397f18ccd699b1da74978570a93e649220e0c16c))

## [1.2.7](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.2.6...v1.2.7) (2024-05-11)


### Bug Fixes

* **semantic_release:** release config fix for assets ([78fa8ae](https://github.com/JairajJangle/react-native-visibility-sensor/commit/78fa8ae3daf5b0b4bd72df0f553b4914b16b8a67))

## [1.2.6](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.2.5...v1.2.6) (2024-05-11)


### Bug Fixes

* **semantic_release:** release config fix for assets ([79eb25e](https://github.com/JairajJangle/react-native-visibility-sensor/commit/79eb25e3efeac040a57478fe955d464630b096a4))

## [1.2.5](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.2.4...v1.2.5) (2024-05-10)


### Bug Fixes

* **semantic_release:** added github release config ([08b018d](https://github.com/JairajJangle/react-native-visibility-sensor/commit/08b018db0ca7d52e41d5a767f3f14f9db7ea2e9d))
* **semantic_release:** updated lock files ([fad6633](https://github.com/JairajJangle/react-native-visibility-sensor/commit/fad6633a768faf1c8766e0574de365ab312fbcb9))

## [1.2.4](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.2.3...v1.2.4) (2024-05-10)


### Bug Fixes

* **semantic_release:** updated lock files ([f55586f](https://github.com/JairajJangle/react-native-visibility-sensor/commit/f55586fa706a5f0f971a58960e4138a0a7540b71))
* **semantic_release:** updated lock files ([f4ce442](https://github.com/JairajJangle/react-native-visibility-sensor/commit/f4ce44275d0c4440c8e7e7e09f40addb3f5c5043))

## [1.2.3](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.2.2...v1.2.3) (2024-05-10)


### Bug Fixes

* **semantic_release:** updated lock files ([e50fcc0](https://github.com/JairajJangle/react-native-visibility-sensor/commit/e50fcc0de6f98ed3637e7f18463d1d00431e5f7a))

## [1.2.2](https://github.com/JairajJangle/react-native-visibility-sensor/compare/v1.2.1...v1.2.2) (2024-05-10)


### Bug Fixes

* **semantic_release:** added missing semantic release dependencies ([0d0e64d](https://github.com/JairajJangle/react-native-visibility-sensor/commit/0d0e64d9704c0fa39330dab76e6c6e735157c893))
* **semantic_release:** updated node version to satisfy semantic release dep ([9805f7b](https://github.com/JairajJangle/react-native-visibility-sensor/commit/9805f7b787f0a31b7cd3d137bfbf5b630fb991fa))
