# Class: PolymathBase

Class that wraps the polymathnetwork/contract-wrappers library to add utility functions

## Hierarchy

* PolymathAPI

  ↳ **PolymathBase**

## Index

### Constructors

* [constructor](_polymathbase_.polymathbase.md#constructor)

### Properties

* [contractFactory](_polymathbase_.polymathbase.md#contractfactory)
* [featureRegistry](_polymathbase_.polymathbase.md#featureregistry)
* [getAccount](_polymathbase_.polymathbase.md#getaccount)
* [getBalance](_polymathbase_.polymathbase.md#getbalance)
* [getERC20TokenWrapper](_polymathbase_.polymathbase.md#geterc20tokenwrapper)
* [getPolyTokens](_polymathbase_.polymathbase.md#getpolytokens)
* [isTestnet](_polymathbase_.polymathbase.md#istestnet)
* [moduleFactory](_polymathbase_.polymathbase.md#modulefactory)
* [moduleRegistry](_polymathbase_.polymathbase.md#moduleregistry)
* [polyToken](_polymathbase_.polymathbase.md#polytoken)
* [polyTokenFaucet](_polymathbase_.polymathbase.md#polytokenfaucet)
* [polymathRegistry](_polymathbase_.polymathbase.md#polymathregistry)
* [securityTokenRegistry](_polymathbase_.polymathbase.md#securitytokenregistry)
* [tokenFactory](_polymathbase_.polymathbase.md#tokenfactory)
* [web3Wrapper](_polymathbase_.polymathbase.md#web3wrapper)

### Methods

* [getAllDividends](_polymathbase_.polymathbase.md#getalldividends)
* [getAttachedModules](_polymathbase_.polymathbase.md#getattachedmodules)
* [getCheckpoint](_polymathbase_.polymathbase.md#getcheckpoint)
* [getCheckpoints](_polymathbase_.polymathbase.md#getcheckpoints)
* [getDividend](_polymathbase_.polymathbase.md#getdividend)
* [getDividends](_polymathbase_.polymathbase.md#getdividends)
* [getDividendsByCheckpoint](_polymathbase_.polymathbase.md#getdividendsbycheckpoint)
* [getModuleAddressesByName](_polymathbase_.polymathbase.md#getmoduleaddressesbyname)
* [getModuleFactoryAddress](_polymathbase_.polymathbase.md#getmodulefactoryaddress)
* [getTreasuryWallet](_polymathbase_.polymathbase.md#gettreasurywallet)
* [roleToPermission](_polymathbase_.polymathbase.md#roletopermission)

## Constructors

###  constructor

\+ **new PolymathBase**(`params`: ApiConstructorParams): *[PolymathBase](_polymathbase_.polymathbase.md)*

*Inherited from void*

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:79

Instantiates a new PolymathAPI instance.

**Parameters:**

Name | Type |
------ | ------ |
`params` | ApiConstructorParams |

**Returns:** *[PolymathBase](_polymathbase_.polymathbase.md)*

An instance of the PolymathAPI class.

## Properties

###  contractFactory

• **contractFactory**: *ContractFactory*

*Inherited from void*

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:79

___

###  featureRegistry

• **featureRegistry**: *FeatureRegistryWrapper*

*Inherited from void*

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:62

An instance of the FeatureRegistryWrapper class containing methods
for interacting with FeatureRegistry smart contract.

___

###  getAccount

• **getAccount**: *function*

*Inherited from void*

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:95

Get the account currently used by PolymathAPI

**`returns`** Address string

#### Type declaration:

▸ (): *Promise‹string›*

___

###  getBalance

• **getBalance**: *function*

*Inherited from void*

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:100

Get the ETH balance

**`returns`** Balance BigNumber

#### Type declaration:

▸ (`params`: GetBalanceParams): *Promise‹BigNumber›*

**Parameters:**

Name | Type |
------ | ------ |
`params` | GetBalanceParams |

___

###  getERC20TokenWrapper

• **getERC20TokenWrapper**: *function*

*Inherited from void*

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:90

Get a wrapped token from an address

**`returns`** TokenWrapper ERC20

#### Type declaration:

▸ (`params`: GetERC20WrapperParams): *Promise‹ERC20›*

**Parameters:**

Name | Type |
------ | ------ |
`params` | GetERC20WrapperParams |

___

###  getPolyTokens

• **getPolyTokens**: *function*

*Inherited from void*

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:85

#### Type declaration:

▸ (`params`: GetTokensParams): *Promise‹PolyResponse›*

**Parameters:**

Name | Type |
------ | ------ |
`params` | GetTokensParams |

___

###  isTestnet

• **isTestnet**: *function*

*Inherited from void*

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:104

Is it Testnet network?

#### Type declaration:

▸ (): *Promise‹boolean›*

___

###  moduleFactory

• **moduleFactory**: *ModuleWrapperFactory*

*Inherited from void*

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:72

An instance of the ModuleWrapperFactory class to get
different module wrapper instances to interact with SecurityToken smart contracts

___

###  moduleRegistry

• **moduleRegistry**: *ModuleRegistryWrapper*

*Inherited from void*

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:57

An instance of the ModuleRegistryWrapper class containing methods
for interacting with ModuleRegistry smart contract.

___

###  polyToken

• **polyToken**: *PolyTokenWrapper*

*Inherited from void*

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:52

An instance of the PolyTokenWrapper class containing methods
for interacting with PolyToken smart contract.

___

###  polyTokenFaucet

• **polyTokenFaucet**: *PolyTokenFaucetWrapper*

*Inherited from void*

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:77

An instance of the PolyTokenFaucetWrapper class containing methods
for interacting with PolyTokenFaucet smart contract.

___

###  polymathRegistry

• **polymathRegistry**: *PolymathRegistryWrapper*

*Inherited from void*

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:42

An instance of the PolymathRegistryWrapper class containing methods
for interacting with PolymathRegistry smart contract.

___

###  securityTokenRegistry

• **securityTokenRegistry**: *SecurityTokenRegistryWrapper*

*Inherited from void*

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:47

An instance of the SecurityTokenRegistryWrapper class containing methods
for interacting with SecurityTokenRegistry smart contract.

___

###  tokenFactory

• **tokenFactory**: *TokenWrapperFactory*

*Inherited from void*

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:67

An instance of the TokenWrapperFactory class to get
TokenWrapper instances to interact with SecurityToken or ERC20 smart contracts

___

###  web3Wrapper

• **web3Wrapper**: *Web3Wrapper*

*Inherited from void*

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:78

## Methods

###  getAllDividends

▸ **getAllDividends**(`__namedParameters`: object): *Promise‹[BaseDividend](../interfaces/_polymathbase_.basedividend.md)[]›*

*Defined in [src/PolymathBase.ts:888](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/PolymathBase.ts#L888)*

Auxiliary function to fetch all dividend distributions

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *Promise‹[BaseDividend](../interfaces/_polymathbase_.basedividend.md)[]›*

___

###  getAttachedModules

▸ **getAttachedModules**(`__namedParameters`: object, `opts?`: GetAttachedModulesOpts): *Promise‹any[]›*

*Defined in [src/PolymathBase.ts:523](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/PolymathBase.ts#L523)*

Fetch all Modules of a certain type attached to a Security Token

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |
`opts?` | GetAttachedModulesOpts |

**Returns:** *Promise‹any[]›*

___

###  getCheckpoint

▸ **getCheckpoint**(`__namedParameters`: object): *Promise‹[BaseCheckpoint](../interfaces/_polymathbase_.basecheckpoint.md)›*

*Defined in [src/PolymathBase.ts:697](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/PolymathBase.ts#L697)*

Get data associated to a Checkpoint

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *Promise‹[BaseCheckpoint](../interfaces/_polymathbase_.basecheckpoint.md)›*

___

###  getCheckpoints

▸ **getCheckpoints**(`__namedParameters`: object): *Promise‹[BaseCheckpoint](../interfaces/_polymathbase_.basecheckpoint.md)[]›*

*Defined in [src/PolymathBase.ts:722](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/PolymathBase.ts#L722)*

Get all Checkpoints of a Security Token

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *Promise‹[BaseCheckpoint](../interfaces/_polymathbase_.basecheckpoint.md)[]›*

___

###  getDividend

▸ **getDividend**(`__namedParameters`: object): *Promise‹[BaseDividend](../interfaces/_polymathbase_.basedividend.md)›*

*Defined in [src/PolymathBase.ts:783](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/PolymathBase.ts#L783)*

Get data associated to a specific Dividend Distribution

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *Promise‹[BaseDividend](../interfaces/_polymathbase_.basedividend.md)›*

___

###  getDividends

▸ **getDividends**(`__namedParameters`: object): *Promise‹[BaseDividend](../interfaces/_polymathbase_.basedividend.md)[]›*

*Defined in [src/PolymathBase.ts:868](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/PolymathBase.ts#L868)*

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *Promise‹[BaseDividend](../interfaces/_polymathbase_.basedividend.md)[]›*

___

###  getDividendsByCheckpoint

▸ **getDividendsByCheckpoint**(`__namedParameters`: object): *Promise‹[BaseDividend](../interfaces/_polymathbase_.basedividend.md)[]›*

*Defined in [src/PolymathBase.ts:849](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/PolymathBase.ts#L849)*

Fetch list of all Dividends at a certain Checkpoint

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *Promise‹[BaseDividend](../interfaces/_polymathbase_.basedividend.md)[]›*

___

###  getModuleAddressesByName

▸ **getModuleAddressesByName**(`__namedParameters`: object, `opts?`: GetModuleAddressesByNameOpts): *Promise‹string[]›*

*Defined in [src/PolymathBase.ts:485](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/PolymathBase.ts#L485)*

Fetch addresses of all Modules of a certain type attached to a Security Token

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |
`opts?` | GetModuleAddressesByNameOpts |

**Returns:** *Promise‹string[]›*

___

###  getModuleFactoryAddress

▸ **getModuleFactoryAddress**(`__namedParameters`: object): *Promise‹string›*

*Defined in [src/PolymathBase.ts:362](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/PolymathBase.ts#L362)*

Fetch the address of a specified Module Factory

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *Promise‹string›*

___

###  getTreasuryWallet

▸ **getTreasuryWallet**(`__namedParameters`: object): *Promise‹string›*

*Defined in [src/PolymathBase.ts:425](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/PolymathBase.ts#L425)*

Fetch a Module's Treasury Wallet

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *Promise‹string›*

___

###  roleToPermission

▸ **roleToPermission**(`__namedParameters`: object): *Promise‹object›*

*Defined in [src/PolymathBase.ts:923](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/PolymathBase.ts#L923)*

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *Promise‹object›*
