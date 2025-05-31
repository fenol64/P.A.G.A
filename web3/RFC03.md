# Buildando Contrato
```bash
cargo build --target wasm32-unknown-unknown --release
```

# Otimização
```bash
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.14.0
```

# Subir nó
```bash
git clone -b main https://github.com/neutron-org/neutron.git
cd neutron
make build-docker-image
make start-docker-container
```

# Parar container
```bash
make stop-docker-container
```

# Copiar artefatos para o container
```bash
docker cp ./artifacts/{CONTRACT}.wasm neutron:/
```

# Subir o contrato
```bash
neutrond tx wasm store /{CONTRACT}.wasm  --fees 200000untrn --from mywallet   --gas auto --gas-adjustment 1.3   --keyring-backend test   --home ./data/test-1   --broadcast-mode sync   --chain-id test-1   --yes
```

# Resgatar Code ID
```bash
neutrond query wasm list-code --home ./data/test-1
```

# Instanciar o contrato
```bash
neutrond tx wasm instantiate {CODE_ID} '{INSTANTIATE_MSG}'   --from mywallet   --label "meu-contrato"   --fees 10000untrn   --gas auto --gas-adjustment 1.3   --keyring-backend test   --home ./data/test-1   --broadcast-mode sync   --chain-id test-1   --yes --no-admin
```

# Resgatar o endereço do contrato a partir do hash da transação
```bash
neutrond query tx {TX_HASH} --home ./data/test-1
```

# Portas Padrões
- 1317:1317 — the REST server;
- 26657:26657 — the Tendermint RPC server;
- 26656:26656 — the Tendermint P2P server;
- 9090:8090 — the gRPC server.

# Query test
```bash
neutrond query wasm contract-state smart  <CONTRACT_ADDR> '{"query_msg": {}}' --chain-id test-1 --home ./data/test-1
```
