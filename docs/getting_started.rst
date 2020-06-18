Getting started
===============

In this guide, we're going to setup a simple project that utilizes the SDK. The project will instantiate the SDK, use it to create a token, and finally retrieve token's information.

Setup your project
------------------

The SDK works equally well on browsers as well as Node.js applications. For sake of simplicity, we're going to setup Node.js project. In case that setup steps differ for browsers, we're going to highlight that below.

First, create a new Node.js project:

::

    mkdir sdk-demo && cd sdk-demo
    npm init

Follow ``npm init`` wizard to initialize your project. Then install the SDK, which is the only dependency we need to build a simple application.

::

    npm add @polymathnetwork/sdk@2.0.1-beta.24

Finally, add an entry js file such as ``index.js``, which imports the SDK API as well as some browser utils that we're going to use later.

::

    import { Polymath, browserUtils } from '@polymathnetwork/sdk';

Instantiate and initialize Polymath client
------------------------------------------

Before we use Polymath SDK, we need to `connect` to the deployed smart contracts on the desired Ethereum network. 

::

    const privateKey = process.env.PRIVATE_KEY;
    const networkId = 1; // Or you can detect the current network in browser environments via browserUtils.getNetworkId()
    const networkConfigs = {
        1: {
            polymathRegistryAddress: '0xdfabf3e4793cd30affb47ab6fa4cf4eef26bbc27',
            providerUrl: 'https://mainnet.infura.io/v3/[INFURA_PRODUCT_ID]',
            privateKey
        },
        42: {
            polymathRegistryAddress: '0x5b215a7d39ee305ad28da29bf2f0425c6c2a00b3',
            providerUrl: 'https://kovan.infura.io/v3/[INFURA_PRODUCT_ID]',
            privateKey
        },
    };
    const config = networkConfigs[networkId];
    const polyClient = new Polymath();
    await polyClient.connect(config);


``PolyClient.connect()`` accepts three parameters:

- ``PolymathRegistryAddress``, which is the address of the main registry that keeps track of core components of the system, including the addresses of other registries. 
- ``httpProviderUrl``, which is an Ethereum network client that enables you to view and interact with the blockchain, via HTTP. That node can be a local ``geth`` or ``parity`` network client, or a 3rd-party provider such a ``Infura``.
- ``privateKey`` this is the private key used to sign transactions sent from the SDK. 

**On browsers**, some plugins such as Metamask, automatically injects a Web3 instance for your webpage to use. In that case, you can omit passing `httpProviderUrl` and `privateKey`. The SDK will use the injected provider behind the scenes.

Additionally, you can detect the currently selected network using ``browserUtils.getNetworkId()``, which returns network's ID. e.g `1` for mainnet.

Deploying your first security token
-----------------------------------

There's a multitude of modules and features provided by Polymath smart contracts. Many of them are abstracted by the SDK for simpler usage. In this section, we are going to interact with ``SecurityTokenRegistry`` contract to create our first token.

::

    try {
        const reservationQueue = await polyClient.reserveSecurityToken({
            symbol: 'ABC123',
        });
        const reservation = await reservationQueue.run(); // Will run sequentially every transaction required

        const creationQueue = await reservation.createSecurityToken({
            symbol: 'ABC123',
            name: 'ABC 123 Inc.',
            detailsUrl: 'http://example.com',
            divisible: true
        });
        const token = await creationQueue.run();
        // Ta-da!! you've deployed your first security token!

    } catch(error) {
      // Transaction has reverted, transaction has been rejected by app user, network issues...etc
      console.error(error);
      if (error.message.contains('has already been registered')) {
        // Symbol 'ABC123' had been registered by someone else. Handle accordingly.
      }
    }

A successful ``reserveSecurityToken()`` call reserves a symbol to the current user address. Reserving a symbol means that no one else will be able to take it, while you complete the necessary steps to deploy the actual token.

Once ``reservation.run()`` has resolved, it will return a reservation entity. We can use that entity to proceed with the token creation. Method ``createSecurityToken()`` accepts four parameters:

- ``symbol``: the symbol we've just reserved.
- ``name``: the human-friendly name.
- ``detailsUrl``: is an offchain (i.e a webpage) resource about the token.
- ``divisible``: whether or not the token is divisible.

Note that ``reserveSecurityToken()``, as well as all SDK functions, typically expect one object called ``args``. That object wraps all required params such as ``symbol`` and ``name``.

**NB** symbols are reserved for a determined period `e.g 15 days`, after which, it can be claimed by other issuers.

As you might have noticed, all SDK  `write` operations are represented as transaction queues. For each operation, the SDK creates as many transactions as needed to complete that operation. Upon calling `queue.run()`, the SDK executes these transactions, sequentially, until completion. Then it will resolve and return the relevant entity, if any.

**Note on transaction errors**. In a perfect world, your token reservation and creation transactions will go through just fine. However, there are many reasons why a transaction might fail. Some errors are *operational*, for example, you've lost internet connection during script execution, or the ethereum account resposible for signing said transactions, had ran out of Ether.
Another kind of errors represent `exceptions` thrown during smart contract execution (i.e ``revert``). One typical reason for reverts is when we attempt to reserve a token symbol that's been reserved before. We catch that error in the example above, as follows:

::

    ...
    } catch(error) {
      // Transaction has reverted, transaction has been rejected by app user, network issues...etc
      console.error(error);
      if (error.message.contains('has already been registered')) {
      // Symbol 'ABC123' had been registered by someone else. Handle accordingly.
    }



Reading your tokens' data
-------------------------

Finally, you can retrieve the token you've created, either by symbol or by your own address, as shown below:

::

    const token = await polyClient.getSecurityToken({symbol: 'ABC123'});

    // or 

    const token = (await polyClient.getSecurityTokens({owner: ISSUER_ADDRESS}))[0];

    console.log(token);
    // => 
    // SecurityToken {
    //  symbol: "ABC123", 
    //  name: "ABC 123 Inc.", 
    //  owner: "0xC257274276a4E539741Ca11b590B9447B26A8051", 
    //  address: "0xCD959e71449425F6E4ac814b7f5aeBdE93012E24", 
    //  uid: "c2VjdXJpdHlUb2tlbjp7InN5bWJvbCI6IktPVkFOM1RFU1QifQ=="
    ...

``SecurityToken`` entity is a JS object representation of your deployed SecurityToken_ contract. Besides bringing token properties such as name, symbol and divisibility, it allows you to manage all aspects of your Security token. Aspects such as user permissions, shareholders management, and launching your first Security token offering, amongst others. We will discuss those features in upcoming user guides.



.. _Web3.providers.HttpProvider: https://web3js.readthedocs.io/en/v1.2.1/web3-eth.html?#providers
.. _SecurityToken: https://github.com/PolymathNetwork/polymath-core/blob/master/contracts/tokens/SecurityToken.sol
