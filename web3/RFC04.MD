# Executar transações
```bash
neutrond tx wasm execute <CONTRACT_ADDR> '{"{<MENSAGE_NAME>}":{"<MSG_CONTENT>"}}' --from mywallet --fees 5000untrn --gas auto --gas-adjustment 1.3 --keyring-backend test --home ./data/test-1 --chain-id test-1 --yes
```

# Executar Query
```bash
neutrond query wasm contract-state smart <CONTRACT_ADDR> '{"<query_msg>": {}}' --chain-id test-1 --home ./data/test-1
```