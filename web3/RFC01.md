# RFC: P.A.G.A. (Sistema de Avaliação de Promessas Políticas)

## 1. Introdução

Este documento descreve a arquitetura e a tecnologia utilizadas no desenvolvimento do sistema **P.A.G.A.** (Sistema de Avaliação de Promessas Políticas). O P.A.G.A. será uma plataforma baseada em blockchain que visa validar e recompensar eleitores por seu envolvimento nas promessas políticas. O sistema será desenvolvido utilizando o **Cosmos SDK** e implementado com contratos inteligentes na blockchain.

O objetivo do P.A.G.A. é permitir que eleitores votem sobre o cumprimento de promessas feitas por políticos. A votação resultará em uma recompensa de tokens **PAGA**, que os eleitores podem usar para influenciar decisões políticas futuras.

## 2. Justificativa para o Uso do Cosmos SDK

O Cosmos SDK foi escolhido como plataforma para o desenvolvimento do sistema P.A.G.A. devido aos seguintes motivos:

- **Patrocínio da Cosmos:** O projeto é patrocinado pela equipe Cosmos, o que proporciona suporte direto.
- **Menor Custo de Transação:** Taxas mais acessíveis que outras blockchains.
- **Escalabilidade:** Permite blockchains customizadas e crescimento progressivo da rede.

## 3. Arquitetura do Sistema

### 3.1 Arquitetura Externa

A arquitetura do P.A.G.A. é composta por três camadas principais:

#### 🧠 Contratos Inteligentes

Utilizando **CosmWasm (Rust)**, os contratos gerenciam toda a lógica de votação e distribuição de tokens.

**Contratos Considerados:**

- **Contrato de Eleitores:** Registra os eleitores, os políticos seguidos e os saldos de tokens.
- **Contrato de Políticos:** Permite o cadastro de políticos e promessas.
- **Contrato de Votação:** Armazena votos e distribui recompensas.
- **Contrato de Requisições:** Permite aos eleitores solicitarem promessas específicas.

#### 🔧 Backend

Implementado em **Go**, será responsável por:

- Validação de identidade e unicidade de eleitores.
- Comunicação com a blockchain.
- APIs para frontend.

#### 💻 Frontend

Desenvolvido em **Next.js**:

- Registro de usuários, votação e acompanhamento de tokens.
- Interface responsiva para web.
- **Versão mobile** poderá ser desenvolvida futuramente.

### 3.2 Arquitetura Interna

Os contratos inteligentes seguem uma estrutura modular com os seguintes componentes:

- `errors`: Gerenciamento de falhas de execução.
- `execute`: Lógica principal dos contratos (ex: votar, distribuir).
- `lib`: principal função ("main") do contrato.
- `msg`: Tipos de mensagens enviadas aos contratos.
- `query`: Consultas de estado (ex: saldo de tokens).
- `state`: Estruturas de dados persistentes, como votos e saldos.

### 3.3 Fluxo de Trabalho

1. **Registro de Eleitor:** Validação via backend e blockchain.
2. **Votação:** Registro imutável das decisões na blockchain.
3. **Recompensas e Governança:** Eleitores recebem tokens e participam de decisões futuras.

## 4. Ferramentas e Configuração de Desenvolvimento

### 4.1 Instalação do Rust e Ferramentas

**Instalar Rust:**

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
rustc --version
```

**Ferramentas Adicionais:**

```bash
rustup target add wasm32-unknown-unknown
cargo install cargo-generate --features vendored-openssl
cargo install cargo-run-script
```

**Criar novo contrato:**

```bash
cargo new nome_do_contrato
```

## 5. Requisitos Funcionais e Técnicos

### 5.1 Requisitos Funcionais
- **Registro de Eleitores:** Permitir que eleitores se registrem e validem sua identidade.
- **Votação:** Permitir que eleitores votem em promessas políticas.
- **Distribuição de Tokens:** Recompensar eleitores com tokens PAGA após a votação.
- **Consulta de Saldo:** Permitir que eleitores consultem seu saldo de tokens.
- **Requisições de Promessas:** Permitir que eleitores solicitem promessas específicas e invistam tokens nelas.
- **Ranking de Promessas:** Exibir um ranking das promessas mais investidas.

### 5.2 Requisitos Técnicos
- **Blockchain:** Utilizar o Cosmos SDK para criar uma blockchain customizada.
- **Contratos Inteligentes:** Implementar contratos em CosmWasm (Rust).

- **Frontend:** Desenvolver o frontend em Next.js para interação com os usuários.
- **Banco de Dados:** Utilizar um banco de dados relacional (ex: PostgreSQL) para armazenar dados não críticos.
- **API REST:** Implementar uma API REST para comunicação entre o frontend e o backend.
- **Autenticação:** Implementar autenticação via CPF e Celular.
- **Após mvp: Backend:** Desenvolver o backend em Go para comunicação com a blockchain.