Getting started
===============

In this guide, we're going to setup a simple project that utilizes the SDK. The project will instantiate the SDK, use it to create a token, and finally retrieve token's information.

Setup your project
------------------

The SDK works well both on browsers, and Node.js applications. In this guide we're going to setup a simple Node.js project. In case that setup steps differ for the browser, we're going to highlight that below.

First, create a new Node.js project:

::

    mkdir sdk-demo && cd sdk-demo
    npm init

Follow ``npm init`` wizard to initialize your project. Then install the SDK, which is the only dependency we need to build a simple application.

::

    npm add @polymathnetwork/sdk@"2.0.x"

Finally, add an entry js file such as ``index.js``, which imports the SDK API as well as some browser utils that we're going to use later.

::

    import { Polymath, browserUtils } from '@polymathnetwork/sdk';

Instantiate and initialize Polymath client
------------------------------------------

Before we use Polymath SDK, we need to `connect` to the deployed smart contracts on the desired Ethereum network. 

There are two main connection parameters; ``PolymathRegistry`` contract address,  which is the main registry that keeps track of core components of the system, including the addresses of other contract registries. 
And ``httpProviderUrl``, which is an Ethereum network client that enables you to view and interact with the blockchain, via HTTP. That node can be a local ``geth`` or ``parity`` network client, or a 3rd-party provider such a ``Infura``.

**NB** make sure you local node "account" is unlocked (i.e private key decrypted), and have enough Eth balance on the network in question. Like any Ethereum transaction, interacting with Polymath smart contracts, through the SDK, costs gas and requires a signature. 

::

    const networkId = 1; // Or browserUtils.getNetworkId()
    const networkConfigs = {
        1: {
            polymathRegistryAddress: '0xdfabf3e4793cd30affb47ab6fa4cf4eef26bbc27',
            httpProviderUrl: 'http://localhost:8545',
        },
        42: {
            polymathRegistryAddress: '0x5b215a7d39ee305ad28da29bf2f0425c6c2a00b3',
            httpProviderUrl: 'http://localhost:8545',
        },
    };
    const config = networkConfigs[networkId];
    const polyClient = new Polymath();
    await polyClient.connect(config);

Alternatively, you can pass an instance of Web3.providers.HttpProvider_ object, which in turn, accepts provider's Url.

**On browsers**, some plugins such as Metamask, automatically injects a Web3 instance for your webpage to use. In that case, you can omit passing `httpProviderUrl`, and the SDK will use the injected provider behind the scenes.

Additionally, you can detect the currently selected network using ``browserUtils.getNetworkId()``, which returns network's ID. e.g `1` for mainnet.

Deploying your first security token
-----------------------------------

There's a multitude of modules and features provided by Polymath smart contracts contracts. Many of them are abstracted by the SDK for simpler usage. In this section, we are going to interact with ``SecurityTokenRegistry`` contract to create our first token.

::

    try {
        const reservation = await polyClient.reserveSecurityToken({
            symbol: 'ABC123',
            name: 'ABC 123 Inc.',
        });
        await reservation.run(); // Will run sequentially every transaction required

        const creation = await polyClient.createSecurityToken({
            symbol: 'ABC123',
            name: 'ABC 123 Inc.',
            detailsUrl: 'http://example.com',
            divisible: true,
        }).
        await creation.run();

        // Ta-da!! you've deployed your first security token!

    } catch(error) {
        // Transaction reverted, transaction has been rejected by user, network issues..etc
        console.error(error);
    }

A successful ``reserveSecurityToken()`` call will reserve a symbol to the current user addres. Reserving a symbol means that no one else will be able to take it, while you complete the necessary steps to deploy the actual token.

Once ``reservation.run()`` resolve, we can proceed with token creation. Method ``createSecurityToken()`` accepts four parameters.

- **symbol**: the symbol we've just reserved.
- **name**: this name will override the name supplied during the reservation.
- **detailsUrl**: is an offchain (i.e a webpage) resource about the token.
- **divisible**: whether or not the token is divisible.

**NB** symbols are reserved for a determined period `e.g 15 days`. After which, it can be claimed by other issuers.

As you might have noticed, all SDK  `write` operations are represented as transaction queues. For each operation, the SDK will create as many transactions as needed to complete that operation. Upon a call to `queue.run()`, the SDK will execute these transactions, sequentially, until completion.

Reading your tokens' data
-------------------------

Finally, you can retrieve the token you've created, either by symbol or by your own address, as shown below:

::

    const token = await polyClient.getSecurityToken({symbol: 'ABC123'});

    // or 

    const token = (await polyClient.getSecurityTokens({owner: [ISSUER_ADDRESS]}))[0];

    console.log(token);
    // => 
    // SecurityToken {
    //  symbol: "ABC123", 
    //  name: "ABC 123 Inc.", 
    //  owner: "0xC257274276a4E539741Ca11b590B9447B26A8051", 
    //  address: "0xCD959e71449425F6E4ac814b7f5aeBdE93012E24", 
    //  uid: "c2VjdXJpdHlUb2tlbjp7InN5bWJvbCI6IktPVkFOM1RFU1QifQ=="
    ...

``SecurityToken`` entity is a JS object representation of your deployed SecurityToken_ contract. Besides bringing token properties such as name, symbol and divisibility, it allows you to manage all aspects of your Security token. Aspects such as user permissions, shareholders management and eventually, launching your first Security token offering. We will discuss those features in upcoming user guides.



.. _Web3.providers.HttpProvider: https://web3js.readthedocs.io/en/v1.2.1/web3-eth.html?#providers
.. _SecurityToken: https://github.com/PolymathNetwork/polymath-core/blob/master/contracts/tokens/SecurityToken.sol