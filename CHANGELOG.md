## [1.2.2](https://github.com/FLchs/ValheimStatus/compare/v1.2.1...v1.2.2) (2026-03-09)


### Bug Fixes

* bad rebase ([e017e70](https://github.com/FLchs/ValheimStatus/commit/e017e70aed70373bb52b1ce57387de5e12dfd9c0))



## [1.2.1](https://github.com/FLchs/ValheimStatus/compare/v1.2.0...v1.2.1) (2026-03-09)


### Bug Fixes

* demo screenshot ([#10](https://github.com/FLchs/ValheimStatus/issues/10)) ([837ba72](https://github.com/FLchs/ValheimStatus/commit/837ba7211e405eba31108eb891c3f78f6ec341da))



# [1.2.0](https://github.com/FLchs/ValheimStatus/compare/v1.1.2...v1.2.0) (2026-03-08)


### Features

* add demo page  ([#9](https://github.com/FLchs/ValheimStatus/issues/9)) ([4fee47d](https://github.com/FLchs/ValheimStatus/commit/4fee47d833ef51da4afd1cec6c112d0a4b52efd9))



## [1.1.2](https://github.com/FLchs/ValheimStatus/compare/v1.1.1...v1.1.2) (2026-03-08)


### Bug Fixes

* **assets:** rename background file ([#8](https://github.com/FLchs/ValheimStatus/issues/8)) ([6afbb8a](https://github.com/FLchs/ValheimStatus/commit/6afbb8a24f74eeb077ac0fac8453162342077797))



## [1.1.1](https://github.com/FLchs/ValheimStatus/compare/v1.1.0...v1.1.1) (2026-03-08)


### Bug Fixes

* themes ([#7](https://github.com/FLchs/ValheimStatus/issues/7)) ([e9eb8f3](https://github.com/FLchs/ValheimStatus/commit/e9eb8f31a430a18ba6c0155aabeaf022ae25464b))



# [1.1.0](https://github.com/FLchs/ValheimStatus/compare/v1.0.0...v1.1.0) (2026-03-08)


### Features

* themes ([#6](https://github.com/FLchs/ValheimStatus/issues/6)) ([87746df](https://github.com/FLchs/ValheimStatus/commit/87746df57acb8f2db0ab487f799bf06c34d87917))



# [1.0.0](https://github.com/FLchs/ValheimStatus/compare/v0.3.1...v1.0.0) (2026-03-06)


* feat!: remove /s/ prefix from server status URLs (#4) ([0ae5d4d](https://github.com/FLchs/ValheimStatus/commit/0ae5d4d4a40f68d3273ebcbbee9f64816912273f)), closes [#4](https://github.com/FLchs/ValheimStatus/issues/4)


### BREAKING CHANGES

* Server status URLs no longer use the /s/ prefix.
URLs changed from /s/{api}/{server} to /{api}/{server}.
Old URLs will need to be updated.

- Moved route from /_localized/s/$apiDomain/{-$serverDomain} to /_localized/$apiDomain/{-$serverDomain}
- Updated navigation in ServerFormPage to use new URL format
- Updated useParams reference in ServerName component

* fix: change server autofill



## [0.3.1](https://github.com/FLchs/ValheimStatus/compare/v0.3.0...v0.3.1) (2026-03-06)


### Bug Fixes

* **build:** add @tanstack/devtools-vite plugin to auto-remove devtools from production ([#3](https://github.com/FLchs/ValheimStatus/issues/3)) ([80b289f](https://github.com/FLchs/ValheimStatus/commit/80b289fdd90093960d8eac975fed78e066d80f75))



# [0.3.0](https://github.com/FLchs/ValheimStatus/compare/v0.2.0...v0.3.0) (2026-03-06)


### Features

* add dynamic Y-axis scaling to ping graph with anti-jitter ([#2](https://github.com/FLchs/ValheimStatus/issues/2)) ([c5c0d5b](https://github.com/FLchs/ValheimStatus/commit/c5c0d5bb8648582cecb626c8a6c1ae27644d33ed))



# [0.2.0](https://github.com/FLchs/ValheimStatus/compare/96a3719f667d08dc99681e969c2b04dd982c7627...v0.2.0) (2026-03-06)


### Bug Fixes

* action ([ed2ef74](https://github.com/FLchs/ValheimStatus/commit/ed2ef746dd3f62ae9f8da24eefcfd7391092aabc))
* auto release ([577af18](https://github.com/FLchs/ValheimStatus/commit/577af18b9ed9f4a249d249889643b2138c6ff3d3))
* **imports:** correct relative import paths after feature reorganization ([f648e4f](https://github.com/FLchs/ValheimStatus/commit/f648e4f5df428348f2bedaae9bba352a5adc53ed))
* **PingGraph:** prevent canvas reuse error and use neutral line color ([f0854eb](https://github.com/FLchs/ValheimStatus/commit/f0854ebcb2ccf079b84a08b607b8e466ae67d623))
* prevent screen flash when switching languages ([1697497](https://github.com/FLchs/ValheimStatus/commit/1697497d7fc06cab73857fc65603e3ea86d06e7d))
* remove player list ([b2dad64](https://github.com/FLchs/ValheimStatus/commit/b2dad643dd54533634f52a4ff3ce279eb707c605))
* **router:** add basepath for GitHub Pages deployment ([2ee40fd](https://github.com/FLchs/ValheimStatus/commit/2ee40fd62249df55e5cce252baebd71684f96787))
* **server-form:** update testApi to accept full URLs ([f2fb9a9](https://github.com/FLchs/ValheimStatus/commit/f2fb9a9e4fd08e4586df85205435af863d3306ba))


### Features

* add footer with version display ([cbabc42](https://github.com/FLchs/ValheimStatus/commit/cbabc42f9ddef24e400119537e8bef92f84083a0))
* add form to root ([708eee4](https://github.com/FLchs/ValheimStatus/commit/708eee4d79cc53600b4659c052b24179c91a2f5e))
* add oxlint and oxfmt ([7a944f1](https://github.com/FLchs/ValheimStatus/commit/7a944f100679fc97005f297ac6fc51b65e7c3d13))
* add PingGraph component with real-time latency visualization ([39f8a69](https://github.com/FLchs/ValheimStatus/commit/39f8a69eef33feb5875ff7fd318587680069ac6d))
* add TypeScript i18n wrappers for paraglide ([5edb2fd](https://github.com/FLchs/ValheimStatus/commit/5edb2fdc1ac3692bf124555ffbd1c0f04d1e136d))
* add usePingLatency hook for real-time latency tracking ([1c33e51](https://github.com/FLchs/ValheimStatus/commit/1c33e5121b8c32c115112c9b01ff5cbb3fbc4867))
* add VITE_APP_VERSION env variable for release tracking ([3f5817d](https://github.com/FLchs/ValheimStatus/commit/3f5817da509c13941c90d5432acdc29cb99c22bd))
* **assets:** add Steam icon SVG ([dc05205](https://github.com/FLchs/ValheimStatus/commit/dc0520555f53babeb39571e350692f59ae9ddf5b))
* Complete Valheim server status dashboard ([96a3719](https://github.com/FLchs/ValheimStatus/commit/96a3719f667d08dc99681e969c2b04dd982c7627))
* **config:** add ConfigContext for dynamic domain configuration ([6955f97](https://github.com/FLchs/ValheimStatus/commit/6955f97f76a5b229671d7f8abb9a0d8e75a23b57))
* **config:** add URL building utilities ([fe94fee](https://github.com/FLchs/ValheimStatus/commit/fe94fee947ca93c8b86c595c644cc81a3793f6a5))
* **deps:** add TanStack Router and devtools dependencies ([148debc](https://github.com/FLchs/ValheimStatus/commit/148debc61cba8e8c4f7cb3868963cbb842f47c11))
* **devtools:** integrate TanStack Router, Query and Devtools in main entry ([c1f1f6a](https://github.com/FLchs/ValheimStatus/commit/c1f1f6a60c04c9fff1798eee7cdbf317cede9755))
* **form:** add language switcher to index page and refactor form components ([b9b1673](https://github.com/FLchs/ValheimStatus/commit/b9b1673a240d1fcd204fb161fb32cc694230e56b))
* **i18n:** add change server button translations ([51d998e](https://github.com/FLchs/ValheimStatus/commit/51d998e52a8b9a1c3f38919c72c88cecfd5f8aae))
* **i18n:** add English and French internationalization with Inlang ParaglideJS ([8952b92](https://github.com/FLchs/ValheimStatus/commit/8952b92a90ea22b09544be67d061cc7d32fe4042))
* **i18n:** add join_or_manual translations for EN and FR ([bb3b4c2](https://github.com/FLchs/ValheimStatus/commit/bb3b4c2367a96c24be48a24e11de2d4817e54c81))
* **i18n:** add join_steam_button translations for EN and FR ([97f3325](https://github.com/FLchs/ValheimStatus/commit/97f3325729594a92f946433da1fb2c85f9d7650c))
* **i18n:** translate to French and update metadata ([5e29cf6](https://github.com/FLchs/ValheimStatus/commit/5e29cf6aa6c8c4312d364f512ed808172f5908ea))
* **i18n:** update translations for full URL support ([d0a2295](https://github.com/FLchs/ValheimStatus/commit/d0a229517248ea3ff3888ae15d0f0b8aa3073ee2))
* integrate PingGraph into App.tsx ([2786578](https://github.com/FLchs/ValheimStatus/commit/278657806e8d5010f8b0e93ba2b8f44dd3f72e5a))
* **routing:** add file-based route definitions with dynamic domain support ([e53e33b](https://github.com/FLchs/ValheimStatus/commit/e53e33b9082ad22e79ed9ea51803dfc1d28e9035))
* **server-form:** add URL validation and normalization ([8de9425](https://github.com/FLchs/ValheimStatus/commit/8de9425b27490f0ddb0d175fe71f6b413e8a8c7a))
* **ui:** add background image support and adjust CSS ([5e7e9f4](https://github.com/FLchs/ValheimStatus/commit/5e7e9f4969253db5a6d331fdfee883d98c158d98))
* **ui:** add or separator between steam button and manual instructions ([88930be](https://github.com/FLchs/ValheimStatus/commit/88930be13f188721b8df2cc29678759dc4812b79))
* **ui:** add Steam join button with amber theme styling ([893f5eb](https://github.com/FLchs/ValheimStatus/commit/893f5ebce96d2c759ddb1be6c17987355563ac26))
* **ui:** translate to French and improve UX ([df0e17b](https://github.com/FLchs/ValheimStatus/commit/df0e17b2e6d6fd43226e54d1a66a8e5d9a80880e))



