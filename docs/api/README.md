# @polymathnetwork/sdk - v2.0.1-beta.126

# Getting Started

## Purpose

The Polymath SDK's main goal is to provide external developers with a set of tools that will allow them to build powerful applications that interact with the Polymath protocol. It focuses on abstracting away all the complexities of the smart contracts (and the blockchain itself) and expose a simple but complete interface. The result is a feature-rich, user-friendly node.js library.

## Before moving on

This document assumes you are already familiar with [Security Tokens](https://thesecuritytokenstandard.org/) in general and [Polymath](https://www.polymath.network/) in particular.

## Technical Pre-requisites

In order to use the Polymath SDK, you must install [node](https://nodejs.org/) (version 10) and [npm](https://www.npmjs.com/). The library is written in [typescript](https://www.typescriptlang.org/), but can also be used in plain javascript. This document will assume you are using typescript, but the translation to javascript is very simple.

## How to use

### Installation

`npm i @polymathnetwork/sdk --save`

Or, if you're using yarn

`yarn add @polymathnetwork/sdk`

### Initializing the client

Before you can start creating Security Tokens and launching STOs, you have to connect the Polymath SDK client to an Ethereum node. This is a pretty straightforward process:

```typescript
import { Polymath } from '@polymathnetwork/sdk';

async function connectAndReturnStatus() {
  const polyClient = new Polymath();
  await polyClient.connect({
    providerUrl: 'https://some-node-url.com',
    privateKey: 'YOUWISH',
  });

  return polyClient.isConnected ? 'connected' : 'not connected';
}

connectAndReturnStatus().then(status => console.log(`Connection status: ${status}`)); // 'Connection status: connected'
```

Here is an overview of the parameters passed to the `connect` function:

- `providerUrl` is a URL that points to a running Ethereum node
- `privateKey` is the private key of the wallet that will be performing transactions

**NOTE:** if using the SDK on a browser environment (i.e. with MetaMask), there is no need to supply the node URL nor the private key.
