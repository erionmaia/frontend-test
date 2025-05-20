# Binance Price Tracker

Aplicação Angular 14 para monitoramento em tempo real de preços de criptomoedas via WebSocket da Binance.

## Sumário
- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Como Executar](#como-executar)
- [Testes](#testes)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Detalhes de Arquitetura](#detalhes-de-arquitetura)

## Visão Geral

Este projeto permite ao usuário criar uma lista de observação de pares de criptomoedas e acompanhar, em tempo real, as cotações e variações de preço diretamente da API da Binance.

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── watch-list/           # Componente de seleção e exibição dos símbolos
│   │   │   └── ticker-display/       # Componente de exibição dos preços em tempo real
│   │   ├── services/
│   │   │   └── binance.service.ts    # Serviço para conexão WebSocket e lógica de dados
│   │   ├── interfaces/
│   │   │   └── ticker.interface.ts   # Interface para tipagem dos dados do ticker
│   │   ├── app.module.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.component.scss
│   ├── environments/
│   │   └── environment.ts
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   └── styles.scss
├── package.json
├── angular.json
├── tsconfig.json
└── README.md
```

## Principais Funcionalidades
- Seleção de múltiplos pares de criptomoedas para observação
- Atualização em tempo real dos preços via WebSocket
- Interface responsiva e moderna com Angular Material
- Remoção de símbolos da lista de observação
- Destaque visual para variação positiva/negativa

## Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Rode o servidor de desenvolvimento:
   ```bash
   ng serve
   ```
3. Acesse em: [http://localhost:4200](http://localhost:4200)

## Testes
- Testes unitários e de integração estão em `src/app/components/**/*.spec.ts` e `src/app/services/**/*.spec.ts`.
- Para rodar os testes:
  ```bash
  ng test
  ```

## Tecnologias Utilizadas
- Angular 14
- Angular Material
- RxJS
- TypeScript
- WebSocket

## Detalhes de Arquitetura
- **WatchListComponent**: Gerencia a lista de símbolos observados e interação do usuário.
- **TickerDisplayComponent**: Exibe os dados de preço em tempo real em uma tabela responsiva.
- **BinanceService**: Centraliza a lógica de conexão WebSocket, inscrição e atualização dos dados.
- **Responsividade**: Layout adaptável para desktop e mobile, com scroll horizontal na tabela em telas pequenas.

---

Desenvolvido para desafio técnico. Para dúvidas ou sugestões, abra uma issue.
