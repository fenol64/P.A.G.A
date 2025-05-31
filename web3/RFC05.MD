# 🗳️ ExecuteMsg – Documentação de Mensagens de Execução do Contrato

Este documento descreve todas as mensagens de execução disponíveis no contrato CosmWasm, com exemplos de payload em JSON e uma breve explicação de cada ação.

Todos os campos seguem o padrão `snake_case`, como esperado ao interagir com contratos CosmWasm.

---

Atualiza o endereço do contrato que gerencia os eleitores.

```json
{
  "update_electors_contract": {
    "new_contract": "cosmos1..."
  }
}
```


Atualiza o endereço do contrato que gerencia os eleitores. O novo contrato deve ser um endereço válido de um contrato CosmWasm.
```json
{
  "update_politicians_contract": {
    "new_contract": "cosmos1..."
  }
}
```

Registar um eleitor
```json
{
  "register_elector": {}
}
```

Permite que um eleitor siga um político específico.
```json
{
  "follow_politician": {
    "politician_address": "cosmos1..."
  }
}
```

Registra o remetente como político com o cargo especificado.
```json
{
  "register_politician": {
    "role": "Deputado"
  }
}
```


Cria uma nova promessa associada ao político.
```json
{
  "create_promise": {
    "title": "Construir escola",
    "description": "Construiremos uma escola no bairro central",
    "conclusion_date": 1716403200
  }
}
```

Permite que um eleitor vote se uma promessa foi cumprida ou não.
```json
{
  "vote_on_promisse": {
    "politician_address": "cosmos1...",
    "promise_id": 1,
    "vote": true
  }
}
```

Cria uma requisição de investimento associada a um político.
```json
{
  "request_from_politician": {
    "politician_address": "cosmos1...",
    "title": "Nova ponte",
    "description": "Construção de uma ponte sobre o rio central",
    "investiment": 1000000
  }
}
```

Permite que um eleitor invista em uma requisição existente.
```json
{
  "invest_in_request": {
    "request_id": 1,
    "amount": 50000
  }
}
```

## Queries para buscar dados no contrato Electors
```json
{
  "elector": {
    "address": "cosmos1..."
  }
}
```

Consulta apenas o saldo de um eleitor.
```json
{
  "balance": {
    "address": "cosmos1..."
  }
}
```

Lista todas as requisições feitas por um político específico.
```json
{
  "requests_by_politician": {
    "politician_address": "cosmos1..."
  }
}
```

Lista todas as requisições investidas por um eleitor específico.
```json
{
  "requests_by_elector": {
    "elector_address": "cosmos1..."
  }
}
```

## Queries para buscar dados no contrato Politicians

Retorna as promessas feitas por um político específico.
```json
{
  "promises_by_politician": {
    "politician_address": "cosmos1..."
  }
}
```

Retorna os detalhes de uma promessa específica.
```json
{
  "promise": {
    "politician": "cosmos1...",
    "promise_id": 1
  }
}
```

Retorna os votos de um eleitor
```json
{
  "votes_by_elector": {
    "elector": "cosmos1..."
  }
}
```

Retorna os dados de um político
```json
{
  "politician": {
    "address": "cosmos1..."
  }
}
```

Retorna os dados de todos os políticos pela Role
```json
{
  "politicians_by_role": {
    "role": "Deputado"
  }
}
```

pub enum PoliticianRole {
    Vereador,
    DeputadoEstadual,
    DeputadoFederal,
    Governador,
    Senador,
    Presidente,
}