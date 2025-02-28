# P.A.G.A. – Promessa Assinada Gera Atitude

## Introdução

O **P.A.G.A.** (Promessa Assinada Gera Atitude) é uma plataforma inovadora que visa fortalecer a democracia, estimular a participação cidadã e promover maior transparência na gestão pública. O projeto incentiva os eleitores a monitorarem o cumprimento das promessas de campanha dos políticos e, como incentivo, recompensa essa fiscalização com tokens baseados em **tecnologia Web3**.

## Objetivos

- Incentivar a população a acompanhar e fiscalizar os governantes.
- Criar uma relação direta entre promessas eleitorais e sua execução.
- Garantir maior transparência e engajamento cívico.
- Oferecer recompensas na forma de tokens Web3, que podem ser usados no comércio local.
- Implementar o **Selo de Político Confiável**, uma certificação que atesta a credibilidade dos políticos.

## Como Funciona

1. **Registro e Autenticação**: Os cidadãos fazem login na plataforma usando carteiras Web3 como MetaMask.
2. **Monitoramento**: Os usuários podem registrar o acompanhamento de promessas de campanha dos políticos.
3. **Validação Comunitária**: Outras pessoas podem votar e verificar a veracidade das informações.
4. **Recompensas com Tokens**: Com base na participação e na qualidade das informações fornecidas, os cidadãos recebem tokens.
5. **Uso dos Tokens**: Os tokens podem ser usados em estabelecimentos parceiros do comércio local.
6. **Selo de Político Confiável**: Políticos que cumprem suas promessas recebem um selo que melhora sua reputação pública.

## Tecnologia Web3 Utilizada

O P.A.G.A. é baseado em tecnologia blockchain para garantir transparência e imutabilidade.

### Componentes principais:

- **Smart Contracts (Contratos Inteligentes)**: Desenvolvidos em Solidity, armazenam e validam os registros das promessas eleitorais e a distribuição dos tokens.
- **Blockchain (Ethereum / Polygon / Solana)**: Utiliza uma blockchain eficiente para registros descentralizados e seguros.
- **Carteiras Web3**: Compatibilidade com carteiras como **MetaMask, Trust Wallet** e outras para autenticação e recebimento de tokens.
- **Tokens ERC-20 / ERC-721**: Implementação de um sistema de tokens para recompensas.
- **IPFS (InterPlanetary File System)**: Armazena provas de cumprimento de promessas de forma descentralizada.
- **Oracles**: Uso de oráculos para integração com dados públicos e registros governamentais.

## Benefícios

### Para a População
- Acesso facilitado às informações sobre os políticos eleitos.
- Incentivo financeiro pela participação cidadã.
- Maior transparência e controle social.

### Para o Comércio Local
- Integração dos tokens como meio de pagamento.
- Aumento no fluxo de clientes e economia local fortalecida.

### Para os Políticos
- Reputação aprimorada através do **Selo de Político Confiável**.
- Maior visibilidade e reconhecimento público.
- Fortalecimento da confiança com a população.

## Roadmap

### Fase 1 - Desenvolvimento (2025)
- Criação do MVP
- Implementação dos contratos inteligentes
- Desenvolvimento da interface Web3

### Fase 2 - Testes e Parcerias (2025-2026)
- Testes beta com grupos selecionados
- Parcerias com comércios locais
- Avaliação da usabilidade e feedback

### Fase 3 - Lançamento Oficial (2026)
- Lançamento público da plataforma
- Expansão para novos municípios
- Promoção e adoção pela sociedade

## Contribuição e Contato

O projeto **P.A.G.A.** é open-source e qualquer pessoa pode contribuir para sua melhoria.
Se você deseja apoiar, contribuir com código ou se tornar um parceiro, entre em contato:

- **GitHub**: [github.com/fenol64/p.a.g.a](https://github.com/fenol64/p.a.g.a)

Vamos juntos construir um futuro mais transparente e participativo!


## Parte técnica do projeto

### Estrutura do projeto

```
    app/               # Frontend
    docs/              # Documentação
    infra/             # Infraestrutura e containers
    web3/              # Contratos inteligentes e o hardhat para subir o nó
```

### Instalação

pré-requisitos:
    - docker

Para rodar o projeto localmente só executar o comando:

```bash
make
```

### Tecnologias utilizadas

- **Solidity**: Linguagem de programação para contratos inteligentes.
- **Hardhat**: Framework para desenvolvimento de contratos inteligentes.
- **Web3js**: Biblioteca para interação com contratos inteligentes.
- **Next.js**: Biblioteca para desenvolvimento de interfaces.


### e como tudo se conecta?

A aplicação web3 se conecta com a blockchain através do contrato inteligente, que é a camada intermediária entre a aplicação e a blockchain. O contrato inteligente é responsável por armazenar as promessas eleitorais e distribuir os tokens. A aplicação web3 se conecta com o contrato inteligente através da biblioteca web3js, que permite a interação com a blockchain.
