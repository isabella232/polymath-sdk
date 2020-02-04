[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["PolymathBase"](../modules/_polymathbase_.md) › [PolymathBase](_polymathbase_.polymathbase.md)

# Class: PolymathBase

Class that wraps the polymathnetwork/contract-wrappers library to add utility functions

## Hierarchy

- PolymathAPI

  ↳ **PolymathBase**

## Index

### Constructors

- [constructor](_polymathbase_.polymathbase.md#constructor)

### Properties

- [contractFactory](_polymathbase_.polymathbase.md#contractfactory)
- [featureRegistry](_polymathbase_.polymathbase.md#featureregistry)
- [getAccount](_polymathbase_.polymathbase.md#getaccount)
- [getBalance](_polymathbase_.polymathbase.md#getbalance)
- [getERC20TokenWrapper](_polymathbase_.polymathbase.md#geterc20tokenwrapper)
- [getPolyTokens](_polymathbase_.polymathbase.md#getpolytokens)
- [isTestnet](_polymathbase_.polymathbase.md#istestnet)
- [moduleFactory](_polymathbase_.polymathbase.md#modulefactory)
- [moduleRegistry](_polymathbase_.polymathbase.md#moduleregistry)
- [polyToken](_polymathbase_.polymathbase.md#polytoken)
- [polyTokenFaucet](_polymathbase_.polymathbase.md#polytokenfaucet)
- [polymathRegistry](_polymathbase_.polymathbase.md#polymathregistry)
- [securityTokenRegistry](_polymathbase_.polymathbase.md#securitytokenregistry)
- [tokenFactory](_polymathbase_.polymathbase.md#tokenfactory)
- [web3Wrapper](_polymathbase_.polymathbase.md#web3wrapper)

### Methods

- [getAllDividends](_polymathbase_.polymathbase.md#getalldividends)
- [getAttachedModules](_polymathbase_.polymathbase.md#getattachedmodules)
- [getCheckpoint](_polymathbase_.polymathbase.md#getcheckpoint)
- [getCheckpoints](_polymathbase_.polymathbase.md#getcheckpoints)
- [getDividend](_polymathbase_.polymathbase.md#getdividend)
- [getDividends](_polymathbase_.polymathbase.md#getdividends)
- [getDividendsByCheckpoint](_polymathbase_.polymathbase.md#getdividendsbycheckpoint)
- [getModuleAddressesByName](_polymathbase_.polymathbase.md#getmoduleaddressesbyname)
- [getModuleFactoryAddress](_polymathbase_.polymathbase.md#getmodulefactoryaddress)
- [getTreasuryWallet](_polymathbase_.polymathbase.md#gettreasurywallet)
- [roleToPermission](_polymathbase_.polymathbase.md#roletopermission)

## Constructors

### constructor

\+ **new PolymathBase**(`params`: ApiConstructorParams): _[PolymathBase](_polymathbase_.polymathbase.md)_

_Inherited from void_

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:79

Instantiates a new PolymathAPI instance.

**Parameters:**

| Name     | Type                 |
| -------- | -------------------- |
| `params` | ApiConstructorParams |

**Returns:** _[PolymathBase](_polymathbase_.polymathbase.md)_

An instance of the PolymathAPI class.

## Properties

### contractFactory

• **contractFactory**: _ContractFactory_

_Inherited from void_

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:79

---

### featureRegistry

• **featureRegistry**: _FeatureRegistryWrapper_

_Inherited from void_

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:62

An instance of the FeatureRegistryWrapper class containing methods
for interacting with FeatureRegistry smart contract.

---

### getAccount

• **getAccount**: _function_

_Inherited from void_

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:95

Get the account currently used by PolymathAPI

**`returns`** Address string

#### Type declaration:

▸ (): _Promise‹string›_

---

### getBalance

• **getBalance**: _function_

_Inherited from void_

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:100

Get the ETH balance

**`returns`** Balance BigNumber

#### Type declaration:

▸ (`params`: GetBalanceParams): _Promise‹BigNumber›_

**Parameters:**

| Name     | Type             |
| -------- | ---------------- |
| `params` | GetBalanceParams |

---

### getERC20TokenWrapper

• **getERC20TokenWrapper**: _function_

_Inherited from void_

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:90

Get a wrapped token from an address

**`returns`** TokenWrapper ERC20

#### Type declaration:

▸ (`params`: GetERC20WrapperParams): _Promise‹ERC20›_

**Parameters:**

| Name     | Type                  |
| -------- | --------------------- |
| `params` | GetERC20WrapperParams |

---

### getPolyTokens

• **getPolyTokens**: _function_

_Inherited from void_

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:85

#### Type declaration:

▸ (`params`: GetTokensParams): _Promise‹PolyResponse›_

**Parameters:**

| Name     | Type            |
| -------- | --------------- |
| `params` | GetTokensParams |

---

### isTestnet

• **isTestnet**: _function_

_Inherited from void_

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:104

Is it Testnet network?

#### Type declaration:

▸ (): _Promise‹boolean›_

---

### moduleFactory

• **moduleFactory**: _ModuleWrapperFactory_

_Inherited from void_

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:72

An instance of the ModuleWrapperFactory class to get
different module wrapper instances to interact with SecurityToken smart contracts

---

### moduleRegistry

• **moduleRegistry**: _ModuleRegistryWrapper_

_Inherited from void_

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:57

An instance of the ModuleRegistryWrapper class containing methods
for interacting with ModuleRegistry smart contract.

---

### polyToken

• **polyToken**: _PolyTokenWrapper_

_Inherited from void_

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:52

An instance of the PolyTokenWrapper class containing methods
for interacting with PolyToken smart contract.

---

### polyTokenFaucet

• **polyTokenFaucet**: _PolyTokenFaucetWrapper_

_Inherited from void_

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:77

An instance of the PolyTokenFaucetWrapper class containing methods
for interacting with PolyTokenFaucet smart contract.

---

### polymathRegistry

• **polymathRegistry**: _PolymathRegistryWrapper_

_Inherited from void_

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:42

An instance of the PolymathRegistryWrapper class containing methods
for interacting with PolymathRegistry smart contract.

---

### securityTokenRegistry

• **securityTokenRegistry**: _SecurityTokenRegistryWrapper_

_Inherited from void_

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:47

An instance of the SecurityTokenRegistryWrapper class containing methods
for interacting with SecurityTokenRegistry smart contract.

---

### tokenFactory

• **tokenFactory**: _TokenWrapperFactory_

_Inherited from void_

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:67

An instance of the TokenWrapperFactory class to get
TokenWrapper instances to interact with SecurityToken or ERC20 smart contracts

---

### web3Wrapper

• **web3Wrapper**: _Web3Wrapper_

_Inherited from void_

Defined in node_modules/@polymathnetwork/contract-wrappers/lib/PolymathAPI.d.ts:78

## Methods

### getAllDividends

▸ **getAllDividends**(`__namedParameters`: object): _Promise‹[BaseDividend](../interfaces/_polymathbase_.basedividend.md)[]›_

_Defined in [src/PolymathBase.ts:888](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L888)_

Auxiliary function to fetch all dividend distributions

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name                  | Type                    | Description                  |
| --------------------- | ----------------------- | ---------------------------- |
| `checkpointId`        | undefined &#124; number | checkpoint UUID              |
| `securityTokenSymbol` | string                  | symbol of the Security Token |

**Returns:** _Promise‹[BaseDividend](../interfaces/_polymathbase_.basedividend.md)[]›_

---

### getAttachedModules

▸ **getAttachedModules**(`__namedParameters`: object, `opts?`: [GetAttachedModulesOpts](../interfaces/_polymathbase_.getattachedmodulesopts.md)): _Promise‹any[]›_

_Defined in [src/PolymathBase.ts:523](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L523)_

Fetch all Modules of a certain type attached to a Security Token

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name         | Type       | Description                  |
| ------------ | ---------- | ---------------------------- |
| `moduleName` | ModuleName | name of the Module           |
| `symbol`     | string     | symbol of the Security Token |

▪`Optional` **opts**: _[GetAttachedModulesOpts](../interfaces/_polymathbase_.getattachedmodulesopts.md)_

**Returns:** _Promise‹any[]›_

---

### getCheckpoint

▸ **getCheckpoint**(`__namedParameters`: object): _Promise‹[BaseCheckpoint](../interfaces/_polymathbase_.basecheckpoint.md)›_

_Defined in [src/PolymathBase.ts:697](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L697)_

Get data associated to a Checkpoint

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name            | Type                | Description                    |
| --------------- | ------------------- | ------------------------------ |
| `checkpointId`  | number              | checkpoint UUID                |
| `securityToken` | SecurityToken_3_0_0 | instance of the Security Token |

**Returns:** _Promise‹[BaseCheckpoint](../interfaces/_polymathbase_.basecheckpoint.md)›_

---

### getCheckpoints

▸ **getCheckpoints**(`__namedParameters`: object): _Promise‹[BaseCheckpoint](../interfaces/_polymathbase_.basecheckpoint.md)[]›_

_Defined in [src/PolymathBase.ts:722](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L722)_

Get all Checkpoints of a Security Token

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name            | Type                | Description                    |
| --------------- | ------------------- | ------------------------------ |
| `securityToken` | SecurityToken_3_0_0 | instance of the Security Token |

**Returns:** _Promise‹[BaseCheckpoint](../interfaces/_polymathbase_.basecheckpoint.md)[]›_

---

### getDividend

▸ **getDividend**(`__namedParameters`: object): _Promise‹[BaseDividend](../interfaces/_polymathbase_.basedividend.md)›_

_Defined in [src/PolymathBase.ts:783](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L783)_

Get data associated to a specific Dividend Distribution

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name              | Type                          | Description           |
| ----------------- | ----------------------------- | --------------------- |
| `dividendIndex`   | number                        | index of the Dividend |
| `dividendsModule` | ERC20DividendCheckpoint_3_0_0 | -                     |

**Returns:** _Promise‹[BaseDividend](../interfaces/_polymathbase_.basedividend.md)›_

---

### getDividends

▸ **getDividends**(`__namedParameters`: object): _Promise‹[BaseDividend](../interfaces/_polymathbase_.basedividend.md)[]›_

_Defined in [src/PolymathBase.ts:868](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L868)_

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name              | Type                          |
| ----------------- | ----------------------------- |
| `dividendsModule` | ERC20DividendCheckpoint_3_0_0 |

**Returns:** _Promise‹[BaseDividend](../interfaces/_polymathbase_.basedividend.md)[]›_

---

### getDividendsByCheckpoint

▸ **getDividendsByCheckpoint**(`__namedParameters`: object): _Promise‹[BaseDividend](../interfaces/_polymathbase_.basedividend.md)[]›_

_Defined in [src/PolymathBase.ts:849](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L849)_

Fetch list of all Dividends at a certain Checkpoint

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name              | Type                          | Description     |
| ----------------- | ----------------------------- | --------------- |
| `checkpointId`    | number                        | checkpoint UUID |
| `dividendsModule` | ERC20DividendCheckpoint_3_0_0 | -               |

**Returns:** _Promise‹[BaseDividend](../interfaces/_polymathbase_.basedividend.md)[]›_

---

### getModuleAddressesByName

▸ **getModuleAddressesByName**(`__namedParameters`: object, `opts?`: [GetModuleAddressesByNameOpts](../interfaces/_polymathbase_.getmoduleaddressesbynameopts.md)): _Promise‹string[]›_

_Defined in [src/PolymathBase.ts:485](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L485)_

Fetch addresses of all Modules of a certain type attached to a Security Token

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name         | Type       | Description                  |
| ------------ | ---------- | ---------------------------- |
| `moduleName` | ModuleName | name of the Module           |
| `symbol`     | string     | symbol of the Security Token |

▪`Optional` **opts**: _[GetModuleAddressesByNameOpts](../interfaces/_polymathbase_.getmoduleaddressesbynameopts.md)_

**Returns:** _Promise‹string[]›_

---

### getModuleFactoryAddress

▸ **getModuleFactoryAddress**(`__namedParameters`: object): _Promise‹string›_

_Defined in [src/PolymathBase.ts:362](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L362)_

Fetch the address of a specified Module Factory

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name           | Type       | Description                                            |
| -------------- | ---------- | ------------------------------------------------------ |
| `moduleName`   | ModuleName | name of the Module corresponding to the Module Factory |
| `tokenAddress` | string     | address of the Security Token                          |

**Returns:** _Promise‹string›_

---

### getTreasuryWallet

▸ **getTreasuryWallet**(`__namedParameters`: object): _Promise‹string›_

_Defined in [src/PolymathBase.ts:425](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L425)_

Fetch a Module's Treasury Wallet

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name     | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `module` | GeneralPermissionManager_3_0_0 &#124; GeneralPermissionManager_3_1_0 &#124; CountTransferManager_3_0_0 &#124; GeneralTransferManager_3_0_0 &#124; GeneralTransferManager_3_1_0 &#124; ManualApprovalTransferManager_3_0_0 &#124; PercentageTransferManager_3_0_0 &#124; VolumeRestrictionTransferManager_3_0_0 &#124; BlacklistTransferManager_3_0_0 &#124; LockUpTransferManager_3_0_0 &#124; RestrictedPartialSaleTransferManager_3_1_0 &#124; CappedSTO_3_0_0 &#124; CappedSTO_3_1_0 &#124; USDTieredSTO_3_0_0 &#124; USDTieredSTO_3_1_0 &#124; ERC20DividendCheckpoint_3_0_0 &#124; VestingEscrowWallet_3_0_0 &#124; VestingEscrowWallet_3_1_0 &#124; EtherDividendCheckpoint_3_0_0 |

**Returns:** _Promise‹string›_

---

### roleToPermission

▸ **roleToPermission**(`__namedParameters`: object): _Promise‹object›_

_Defined in [src/PolymathBase.ts:923](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L923)_

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name   | Type                                                             |
| ------ | ---------------------------------------------------------------- |
| `role` | [SecurityTokenRole](../enums/_types_index_.securitytokenrole.md) |

**Returns:** _Promise‹object›_
