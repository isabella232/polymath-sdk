# PolymathBase

Class that wraps the polymathnetwork/contract-wrappers library to add utility functions

## Hierarchy

* PolymathAPI

  ↳ **PolymathBase**

## Index

### Constructors

* [constructor](../classes/_polymathbase_.polymathbase.md#constructor)

### Properties

* [contractFactory](../classes/_polymathbase_.polymathbase.md#contractfactory)
* [featureRegistry](../classes/_polymathbase_.polymathbase.md#featureregistry)
* [getAccount](../classes/_polymathbase_.polymathbase.md#getaccount)
* [getBalance](../classes/_polymathbase_.polymathbase.md#getbalance)
* [getERC20TokenWrapper](../classes/_polymathbase_.polymathbase.md#geterc20tokenwrapper)
* [getPolyTokens](../classes/_polymathbase_.polymathbase.md#getpolytokens)
* [isTestnet](../classes/_polymathbase_.polymathbase.md#istestnet)
* [moduleFactory](../classes/_polymathbase_.polymathbase.md#modulefactory)
* [moduleRegistry](../classes/_polymathbase_.polymathbase.md#moduleregistry)
* [polyToken](../classes/_polymathbase_.polymathbase.md#polytoken)
* [polyTokenFaucet](../classes/_polymathbase_.polymathbase.md#polytokenfaucet)
* [polymathRegistry](../classes/_polymathbase_.polymathbase.md#polymathregistry)
* [securityTokenRegistry](../classes/_polymathbase_.polymathbase.md#securitytokenregistry)
* [tokenFactory](../classes/_polymathbase_.polymathbase.md#tokenfactory)
* [web3Wrapper](../classes/_polymathbase_.polymathbase.md#web3wrapper)

### Methods

* [getAllDividends](../classes/_polymathbase_.polymathbase.md#getalldividends)
* [getAttachedModules](../classes/_polymathbase_.polymathbase.md#getattachedmodules)
* [getCheckpoint](../classes/_polymathbase_.polymathbase.md#getcheckpoint)
* [getCheckpoints](../classes/_polymathbase_.polymathbase.md#getcheckpoints)
* [getDividend](../classes/_polymathbase_.polymathbase.md#getdividend)
* [getDividends](../classes/_polymathbase_.polymathbase.md#getdividends)
* [getDividendsByCheckpoint](../classes/_polymathbase_.polymathbase.md#getdividendsbycheckpoint)
* [getModuleAddressesByName](../classes/_polymathbase_.polymathbase.md#getmoduleaddressesbyname)
* [getModuleFactoryAddress](../classes/_polymathbase_.polymathbase.md#getmodulefactoryaddress)
* [getTreasuryWallet](../classes/_polymathbase_.polymathbase.md#gettreasurywallet)
* [roleToPermission](../classes/_polymathbase_.polymathbase.md#roletopermission)

## Constructors

### constructor

+ **new PolymathBase**\(`params`: ApiConstructorParams\): [_PolymathBase_](../classes/_polymathbase_.polymathbase.md)

_Inherited from void_

Defined in node\_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:79

Instantiates a new PolymathAPI instance.

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | ApiConstructorParams |

**Returns:** [_PolymathBase_](../classes/_polymathbase_.polymathbase.md)

An instance of the PolymathAPI class.

## Properties

### contractFactory

• **contractFactory**: _ContractFactory_

_Inherited from void_

Defined in node\_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:79

### featureRegistry

• **featureRegistry**: _FeatureRegistryWrapper_

_Inherited from void_

Defined in node\_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:62

An instance of the FeatureRegistryWrapper class containing methods for interacting with FeatureRegistry smart contract.

### getAccount

• **getAccount**: _function_

_Inherited from void_

Defined in node\_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:95

Get the account currently used by PolymathAPI

**`returns`** Address string

#### Type declaration:

▸ \(\): _Promise‹string›_

### getBalance

• **getBalance**: _function_

_Inherited from void_

Defined in node\_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:100

Get the ETH balance

**`returns`** Balance BigNumber

#### Type declaration:

▸ \(`params`: GetBalanceParams\): _Promise‹BigNumber›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | GetBalanceParams |

### getERC20TokenWrapper

• **getERC20TokenWrapper**: _function_

_Inherited from void_

Defined in node\_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:90

Get a wrapped token from an address

**`returns`** TokenWrapper ERC20

#### Type declaration:

▸ \(`params`: GetERC20WrapperParams\): _Promise‹ERC20›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | GetERC20WrapperParams |

### getPolyTokens

• **getPolyTokens**: _function_

_Inherited from void_

Defined in node\_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:85

#### Type declaration:

▸ \(`params`: GetTokensParams\): _Promise‹PolyResponse›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | GetTokensParams |

### isTestnet

• **isTestnet**: _function_

_Inherited from void_

Defined in node\_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:104

Is it Testnet network?

#### Type declaration:

▸ \(\): _Promise‹boolean›_

### moduleFactory

• **moduleFactory**: _ModuleWrapperFactory_

_Inherited from void_

Defined in node\_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:72

An instance of the ModuleWrapperFactory class to get different module wrapper instances to interact with SecurityToken smart contracts

### moduleRegistry

• **moduleRegistry**: _ModuleRegistryWrapper_

_Inherited from void_

Defined in node\_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:57

An instance of the ModuleRegistryWrapper class containing methods for interacting with ModuleRegistry smart contract.

### polyToken

• **polyToken**: _PolyTokenWrapper_

_Inherited from void_

Defined in node\_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:52

An instance of the PolyTokenWrapper class containing methods for interacting with PolyToken smart contract.

### polyTokenFaucet

• **polyTokenFaucet**: _PolyTokenFaucetWrapper_

_Inherited from void_

Defined in node\_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:77

An instance of the PolyTokenFaucetWrapper class containing methods for interacting with PolyTokenFaucet smart contract.

### polymathRegistry

• **polymathRegistry**: _PolymathRegistryWrapper_

_Inherited from void_

Defined in node\_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:42

An instance of the PolymathRegistryWrapper class containing methods for interacting with PolymathRegistry smart contract.

### securityTokenRegistry

• **securityTokenRegistry**: _SecurityTokenRegistryWrapper_

_Inherited from void_

Defined in node\_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:47

An instance of the SecurityTokenRegistryWrapper class containing methods for interacting with SecurityTokenRegistry smart contract.

### tokenFactory

• **tokenFactory**: _TokenWrapperFactory_

_Inherited from void_

Defined in node\_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:67

An instance of the TokenWrapperFactory class to get TokenWrapper instances to interact with SecurityToken or ERC20 smart contracts

### web3Wrapper

• **web3Wrapper**: _Web3Wrapper_

_Inherited from void_

Defined in node\_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:78

## Methods

### getAllDividends

▸ **getAllDividends**\(`__namedParameters`: object\): _Promise‹_[_BaseDividend_](../interfaces/_polymathbase_.basedividend.md)_\[\]›_

_Defined in_ [_src/PolymathBase.ts:888_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L888)

Auxiliary function to fetch all dividend distributions

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `checkpointId` | undefined \| number | checkpoint UUID |
| `securityTokenSymbol` | string | symbol of the Security Token |

**Returns:** _Promise‹_[_BaseDividend_](../interfaces/_polymathbase_.basedividend.md)_\[\]›_

### getAttachedModules

▸ **getAttachedModules**\(`__namedParameters`: object, `opts?`: [GetAttachedModulesOpts](../interfaces/_polymathbase_.getattachedmodulesopts.md)\): _Promise‹any\[\]›_

_Defined in_ [_src/PolymathBase.ts:523_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L523)

Fetch all Modules of a certain type attached to a Security Token

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `moduleName` | ModuleName | name of the Module |
| `symbol` | string | symbol of the Security Token |

▪`Optional` **opts**: [_GetAttachedModulesOpts_](../interfaces/_polymathbase_.getattachedmodulesopts.md)

**Returns:** _Promise‹any\[\]›_

### getCheckpoint

▸ **getCheckpoint**\(`__namedParameters`: object\): _Promise‹_[_BaseCheckpoint_](../interfaces/_polymathbase_.basecheckpoint.md)_›_

_Defined in_ [_src/PolymathBase.ts:697_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L697)

Get data associated to a Checkpoint

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `checkpointId` | number | checkpoint UUID |
| `securityToken` | SecurityToken\_3\_0\_0 | instance of the Security Token |

**Returns:** _Promise‹_[_BaseCheckpoint_](../interfaces/_polymathbase_.basecheckpoint.md)_›_

### getCheckpoints

▸ **getCheckpoints**\(`__namedParameters`: object\): _Promise‹_[_BaseCheckpoint_](../interfaces/_polymathbase_.basecheckpoint.md)_\[\]›_

_Defined in_ [_src/PolymathBase.ts:722_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L722)

Get all Checkpoints of a Security Token

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `securityToken` | SecurityToken\_3\_0\_0 | instance of the Security Token |

**Returns:** _Promise‹_[_BaseCheckpoint_](../interfaces/_polymathbase_.basecheckpoint.md)_\[\]›_

### getDividend

▸ **getDividend**\(`__namedParameters`: object\): _Promise‹_[_BaseDividend_](../interfaces/_polymathbase_.basedividend.md)_›_

_Defined in_ [_src/PolymathBase.ts:783_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L783)

Get data associated to a specific Dividend Distribution

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `dividendIndex` | number | index of the Dividend |
| `dividendsModule` | ERC20DividendCheckpoint\_3\_0\_0 | - |

**Returns:** _Promise‹_[_BaseDividend_](../interfaces/_polymathbase_.basedividend.md)_›_

### getDividends

▸ **getDividends**\(`__namedParameters`: object\): _Promise‹_[_BaseDividend_](../interfaces/_polymathbase_.basedividend.md)_\[\]›_

_Defined in_ [_src/PolymathBase.ts:868_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L868)

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `dividendsModule` | ERC20DividendCheckpoint\_3\_0\_0 |

**Returns:** _Promise‹_[_BaseDividend_](../interfaces/_polymathbase_.basedividend.md)_\[\]›_

### getDividendsByCheckpoint

▸ **getDividendsByCheckpoint**\(`__namedParameters`: object\): _Promise‹_[_BaseDividend_](../interfaces/_polymathbase_.basedividend.md)_\[\]›_

_Defined in_ [_src/PolymathBase.ts:849_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L849)

Fetch list of all Dividends at a certain Checkpoint

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `checkpointId` | number | checkpoint UUID |
| `dividendsModule` | ERC20DividendCheckpoint\_3\_0\_0 | - |

**Returns:** _Promise‹_[_BaseDividend_](../interfaces/_polymathbase_.basedividend.md)_\[\]›_

### getModuleAddressesByName

▸ **getModuleAddressesByName**\(`__namedParameters`: object, `opts?`: [GetModuleAddressesByNameOpts](../interfaces/_polymathbase_.getmoduleaddressesbynameopts.md)\): _Promise‹string\[\]›_

_Defined in_ [_src/PolymathBase.ts:485_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L485)

Fetch addresses of all Modules of a certain type attached to a Security Token

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `moduleName` | ModuleName | name of the Module |
| `symbol` | string | symbol of the Security Token |

▪`Optional` **opts**: [_GetModuleAddressesByNameOpts_](../interfaces/_polymathbase_.getmoduleaddressesbynameopts.md)

**Returns:** _Promise‹string\[\]›_

### getModuleFactoryAddress

▸ **getModuleFactoryAddress**\(`__namedParameters`: object\): _Promise‹string›_

_Defined in_ [_src/PolymathBase.ts:362_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L362)

Fetch the address of a specified Module Factory

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `moduleName` | ModuleName | name of the Module corresponding to the Module Factory |
| `tokenAddress` | string | address of the Security Token |

**Returns:** _Promise‹string›_

### getTreasuryWallet

▸ **getTreasuryWallet**\(`__namedParameters`: object\): _Promise‹string›_

_Defined in_ [_src/PolymathBase.ts:425_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L425)

Fetch a Module's Treasury Wallet

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `module` | GeneralPermissionManager\_3\_0\_0 \| GeneralPermissionManager\_3\_1\_0 \| CountTransferManager\_3\_0\_0 \| GeneralTransferManager\_3\_0\_0 \| GeneralTransferManager\_3\_1\_0 \| ManualApprovalTransferManager\_3\_0\_0 \| PercentageTransferManager\_3\_0\_0 \| VolumeRestrictionTransferManager\_3\_0\_0 \| BlacklistTransferManager\_3\_0\_0 \| LockUpTransferManager\_3\_0\_0 \| RestrictedPartialSaleTransferManager\_3\_1\_0 \| CappedSTO\_3\_0\_0 \| CappedSTO\_3\_1\_0 \| USDTieredSTO\_3\_0\_0 \| USDTieredSTO\_3\_1\_0 \| ERC20DividendCheckpoint\_3\_0\_0 \| VestingEscrowWallet\_3\_0\_0 \| VestingEscrowWallet\_3\_1\_0 \| EtherDividendCheckpoint\_3\_0\_0 |

**Returns:** _Promise‹string›_

### roleToPermission

▸ **roleToPermission**\(`__namedParameters`: object\): _Promise‹object›_

_Defined in_ [_src/PolymathBase.ts:923_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L923)

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `role` | [SecurityTokenRole](../enums/_types_index_.securitytokenrole.md) |

**Returns:** _Promise‹object›_

