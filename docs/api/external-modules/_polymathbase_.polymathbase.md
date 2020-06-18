# PolymathBase

Class that wraps the polymathnetwork/contract-wrappers library to add utility functions

## Hierarchy

* PolymathAPI

  ↳ **PolymathBase**

## Index

### Constructors

* [constructor]()

### Properties

* [contractFactory]()
* [featureRegistry]()
* [getAccount]()
* [getBalance]()
* [getERC20TokenWrapper]()
* [getPolyTokens]()
* [isTestnet]()
* [moduleFactory]()
* [moduleRegistry]()
* [polyToken]()
* [polyTokenFaucet]()
* [polymathRegistry]()
* [securityTokenRegistry]()
* [tokenFactory]()
* [web3Wrapper]()

### Methods

* [getAllDividends]()
* [getAttachedModules]()
* [getCheckpoint]()
* [getCheckpoints]()
* [getDividend]()
* [getDividends]()
* [getDividendsByCheckpoint]()
* [getModuleAddressesByName]()
* [getModuleFactoryAddress]()
* [getTreasuryWallet]()
* [roleToPermission]()

## Constructors

### constructor

+ **new PolymathBase**\(`params`: ApiConstructorParams\): [_PolymathBase_]()

_Inherited from void_

Defined in node\_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:79

Instantiates a new PolymathAPI instance.

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | ApiConstructorParams |

**Returns:** [_PolymathBase_]()

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

▸ **getAllDividends**\(`__namedParameters`: object\): _Promise‹_[_BaseDividend_]()_\[\]›_

_Defined in_ [_src/PolymathBase.ts:888_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/PolymathBase.ts#L888)

Auxiliary function to fetch all dividend distributions

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `checkpointId` | undefined \| number | checkpoint UUID |
| `securityTokenSymbol` | string | symbol of the Security Token |

**Returns:** _Promise‹_[_BaseDividend_]()_\[\]›_

### getAttachedModules

▸ **getAttachedModules**\(`__namedParameters`: object, `opts?`: [GetAttachedModulesOpts]()\): _Promise‹any\[\]›_

_Defined in_ [_src/PolymathBase.ts:523_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/PolymathBase.ts#L523)

Fetch all Modules of a certain type attached to a Security Token

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `moduleName` | ModuleName | name of the Module |
| `symbol` | string | symbol of the Security Token |

▪`Optional` **opts**: [_GetAttachedModulesOpts_]()

**Returns:** _Promise‹any\[\]›_

### getCheckpoint

▸ **getCheckpoint**\(`__namedParameters`: object\): _Promise‹_[_BaseCheckpoint_]()_›_

_Defined in_ [_src/PolymathBase.ts:697_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/PolymathBase.ts#L697)

Get data associated to a Checkpoint

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `checkpointId` | number | checkpoint UUID |
| `securityToken` | SecurityToken\_3\_0\_0 | instance of the Security Token |

**Returns:** _Promise‹_[_BaseCheckpoint_]()_›_

### getCheckpoints

▸ **getCheckpoints**\(`__namedParameters`: object\): _Promise‹_[_BaseCheckpoint_]()_\[\]›_

_Defined in_ [_src/PolymathBase.ts:722_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/PolymathBase.ts#L722)

Get all Checkpoints of a Security Token

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `securityToken` | SecurityToken\_3\_0\_0 | instance of the Security Token |

**Returns:** _Promise‹_[_BaseCheckpoint_]()_\[\]›_

### getDividend

▸ **getDividend**\(`__namedParameters`: object\): _Promise‹_[_BaseDividend_]()_›_

_Defined in_ [_src/PolymathBase.ts:783_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/PolymathBase.ts#L783)

Get data associated to a specific Dividend Distribution

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `dividendIndex` | number | index of the Dividend |
| `dividendsModule` | ERC20DividendCheckpoint\_3\_0\_0 | - |

**Returns:** _Promise‹_[_BaseDividend_]()_›_

### getDividends

▸ **getDividends**\(`__namedParameters`: object\): _Promise‹_[_BaseDividend_]()_\[\]›_

_Defined in_ [_src/PolymathBase.ts:868_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/PolymathBase.ts#L868)

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `dividendsModule` | ERC20DividendCheckpoint\_3\_0\_0 |

**Returns:** _Promise‹_[_BaseDividend_]()_\[\]›_

### getDividendsByCheckpoint

▸ **getDividendsByCheckpoint**\(`__namedParameters`: object\): _Promise‹_[_BaseDividend_]()_\[\]›_

_Defined in_ [_src/PolymathBase.ts:849_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/PolymathBase.ts#L849)

Fetch list of all Dividends at a certain Checkpoint

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `checkpointId` | number | checkpoint UUID |
| `dividendsModule` | ERC20DividendCheckpoint\_3\_0\_0 | - |

**Returns:** _Promise‹_[_BaseDividend_]()_\[\]›_

### getModuleAddressesByName

▸ **getModuleAddressesByName**\(`__namedParameters`: object, `opts?`: [GetModuleAddressesByNameOpts]()\): _Promise‹string\[\]›_

_Defined in_ [_src/PolymathBase.ts:485_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/PolymathBase.ts#L485)

Fetch addresses of all Modules of a certain type attached to a Security Token

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `moduleName` | ModuleName | name of the Module |
| `symbol` | string | symbol of the Security Token |

▪`Optional` **opts**: [_GetModuleAddressesByNameOpts_]()

**Returns:** _Promise‹string\[\]›_

### getModuleFactoryAddress

▸ **getModuleFactoryAddress**\(`__namedParameters`: object\): _Promise‹string›_

_Defined in_ [_src/PolymathBase.ts:362_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/PolymathBase.ts#L362)

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

_Defined in_ [_src/PolymathBase.ts:425_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/PolymathBase.ts#L425)

Fetch a Module's Treasury Wallet

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `module` | GeneralPermissionManager\_3\_0\_0 \| GeneralPermissionManager\_3\_1\_0 \| CountTransferManager\_3\_0\_0 \| GeneralTransferManager\_3\_0\_0 \| GeneralTransferManager\_3\_1\_0 \| ManualApprovalTransferManager\_3\_0\_0 \| PercentageTransferManager\_3\_0\_0 \| VolumeRestrictionTransferManager\_3\_0\_0 \| BlacklistTransferManager\_3\_0\_0 \| LockUpTransferManager\_3\_0\_0 \| RestrictedPartialSaleTransferManager\_3\_1\_0 \| CappedSTO\_3\_0\_0 \| CappedSTO\_3\_1\_0 \| USDTieredSTO\_3\_0\_0 \| USDTieredSTO\_3\_1\_0 \| ERC20DividendCheckpoint\_3\_0\_0 \| VestingEscrowWallet\_3\_0\_0 \| VestingEscrowWallet\_3\_1\_0 \| EtherDividendCheckpoint\_3\_0\_0 |

**Returns:** _Promise‹string›_

### roleToPermission

▸ **roleToPermission**\(`__namedParameters`: object\): _Promise‹object›_

_Defined in_ [_src/PolymathBase.ts:923_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/PolymathBase.ts#L923)

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `role` | [SecurityTokenRole]() |

**Returns:** _Promise‹object›_

