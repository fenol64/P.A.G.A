## Adicionar carteira

- Adcione o minemonico(chave de 12 ou 20 palavras) no arquivo init.sh de sua carteira (linha 28)
- Adicione a conta no genesis (linha 57)
- Adicione dinheiros infinitos para a conta (linha 77)

```sh
MY_MNEMONIC="discover cactus old able arrest cover flush tag dumb click video pyramid antique dinner puppy nothing update tip ordinary spider reject dove guard skull"

echo "$MY_MNEMONIC" | $BINARY keys add mywallet --home "$CHAIN_DIR" --recover --keyring-backend=test

$BINARY $GENESIS_PREFIX add-genesis-account "$($BINARY --home "$CHAIN_DIR" keys show mywallet --keyring-backend test -a --home "$CHAIN_DIR")" "100000000000000$STAKEDENOM,100000000000000$IBCATOMDENOM,100000000000000$IBCUSDCDENOM"  --home "$CHAIN_DIR"
```


