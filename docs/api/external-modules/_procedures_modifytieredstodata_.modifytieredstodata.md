# ModifyTieredStoData

Procedure that modifies the configuration parameters of a Tiered STO

## Type parameters

▪ **ReturnType**

## Hierarchy

* Procedure‹[ModifyTieredStoDataProcedureArgs](../interfaces/_types_index_.modifytieredstodataprocedureargs.md)›

  ↳ **ModifyTieredStoData**

## Index

### Constructors

* [constructor](../classes/_procedures_modifytieredstodata_.modifytieredstodata.md#constructor)

### Properties

* [args](../classes/_procedures_modifytieredstodata_.modifytieredstodata.md#protected-args)
* [context](../classes/_procedures_modifytieredstodata_.modifytieredstodata.md#protected-context)
* [type](../classes/_procedures_modifytieredstodata_.modifytieredstodata.md#type)

### Methods

* [addProcedure](../classes/_procedures_modifytieredstodata_.modifytieredstodata.md#addprocedure)
* [addSignatureRequest](../classes/_procedures_modifytieredstodata_.modifytieredstodata.md#addsignaturerequest)
* [addTransaction](../classes/_procedures_modifytieredstodata_.modifytieredstodata.md#addtransaction)
* [prepare](../classes/_procedures_modifytieredstodata_.modifytieredstodata.md#prepare)
* [prepareTransactions](../classes/_procedures_modifytieredstodata_.modifytieredstodata.md#preparetransactions)

## Constructors

### constructor

+ **new ModifyTieredStoData**\(`args`: [ModifyTieredStoDataProcedureArgs](../interfaces/_types_index_.modifytieredstodataprocedureargs.md), `context`: [Context](../classes/_context_.context.md)\): [_ModifyTieredStoData_](../classes/_procedures_modifytieredstodata_.modifytieredstodata.md)

_Inherited from void_

_Defined in_ [_src/procedures/Procedure.ts:40_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/Procedure.ts#L40)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `args` | [ModifyTieredStoDataProcedureArgs](../interfaces/_types_index_.modifytieredstodataprocedureargs.md) |
| `context` | [Context](../classes/_context_.context.md) |

**Returns:** [_ModifyTieredStoData_](../classes/_procedures_modifytieredstodata_.modifytieredstodata.md)

## Properties

### `Protected` args

• **args**: [_ModifyTieredStoDataProcedureArgs_](../interfaces/_types_index_.modifytieredstodataprocedureargs.md)

_Inherited from void_

_Defined in_ [_src/procedures/Procedure.ts:34_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/Procedure.ts#L34)

### `Protected` context

• **context**: [_Context_](../classes/_context_.context.md)

_Inherited from void_

_Defined in_ [_src/procedures/Procedure.ts:36_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/Procedure.ts#L36)

### type

• **type**: [_ProcedureType_](../enums/_types_index_.proceduretype.md) = ProcedureType.ModifyTieredStoData

_Overrides void_

_Defined in_ [_src/procedures/ModifyTieredStoData.ts:43_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/ModifyTieredStoData.ts#L43)

## Methods

### addProcedure

▸ **addProcedure**&lt;**A**, **R**&gt;\(`Proc`: [ProcedureClass](../interfaces/_procedures_procedure_.procedureclass.md)‹A, R›\): _\(Anonymous function\)_

_Inherited from void_

_Defined in_ [_src/procedures/Procedure.ts:91_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/Procedure.ts#L91)

Appends a Procedure into the TransactionQueue's queue. This defines what will be run by the TransactionQueue when it is started.

**Type parameters:**

▪ **A**

▪ **R**: _any_

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `Proc` | [ProcedureClass](../interfaces/_procedures_procedure_.procedureclass.md)‹A, R› | A Procedure that will be run in the Procedure's TransactionQueue |

**Returns:** _\(Anonymous function\)_

whichever value is returned by the Procedure

### addSignatureRequest

▸ **addSignatureRequest**&lt;**A**&gt;\(`request`: [SignatureRequest](_types_index_.md#signaturerequest)‹A›\): _\(Anonymous function\)_

_Inherited from void_

_Defined in_ [_src/procedures/Procedure.ts:179_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/Procedure.ts#L179)

Appends a signature request into the TransactionQueue's queue. This defines what will be run by the TransactionQueue when it is started.

**Type parameters:**

▪ **A**

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `request` | [SignatureRequest](_types_index_.md#signaturerequest)‹A› | A signature request that will be run in the Procedure's TransactionQueue |

**Returns:** _\(Anonymous function\)_

a PostTransactionResolver that resolves to the signed data

### addTransaction

▸ **addTransaction**&lt;**A**, **R**, **V**&gt;\(`method`: [LowLevelMethod](_types_index_.md#lowlevelmethod)‹A› \| [FutureLowLevelMethod](../interfaces/_types_index_.futurelowlevelmethod.md)‹V, A›, `__namedParameters`: object\): _\(Anonymous function\)_

_Inherited from void_

_Defined in_ [_src/procedures/Procedure.ts:137_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/Procedure.ts#L137)

Appends a method or future method into the TransactionQueue's queue. This defines what will be run by the TransactionQueue when it is started.

**Type parameters:**

▪ **A**

▪ **R**: _any\[\]_

▪ **V**: _any_

**Parameters:**

▪ **method**: [_LowLevelMethod_](_types_index_.md#lowlevelmethod)_‹A› \|_ [_FutureLowLevelMethod_](../interfaces/_types_index_.futurelowlevelmethod.md)_‹V, A›_

A method \(or future method\) that will be run in the Procedure's TransactionQueue. A future method is a transaction that doesn't exist at prepare time \(for example a transaction on a module that hasn't been attached but will be by the time the previous transactions are run\)

▪`Default value` **\_\_namedParameters**: _object_= {}

| Name | Type | Default |
| :--- | :--- | :--- |
| `fees` | undefined \| [Fees](../interfaces/_types_index_.fees.md) | - |
| `resolvers` | object | \(\[\] as unknown\) as ResolverArray |
| `tag` | undefined \| [Any](../enums/_types_index_.polytransactiontag.md#any) \| [GetTokens](../enums/_types_index_.polytransactiontag.md#gettokens) \| [ApproveErc20](../enums/_types_index_.polytransactiontag.md#approveerc20) \| [TransferErc20](../enums/_types_index_.polytransactiontag.md#transfererc20) \| [ReserveSecurityToken](../enums/_types_index_.polytransactiontag.md#reservesecuritytoken) \| [CreateSecurityToken](../enums/_types_index_.polytransactiontag.md#createsecuritytoken) \| [CreateCheckpoint](../enums/_types_index_.polytransactiontag.md#createcheckpoint) \| [CreateErc20DividendDistribution](../enums/_types_index_.polytransactiontag.md#createerc20dividenddistribution) \| [SetErc20TaxWithholding](../enums/_types_index_.polytransactiontag.md#seterc20taxwithholding) \| [SetEtherTaxWithholding](../enums/_types_index_.polytransactiontag.md#setethertaxwithholding) \| [SetDefaultExcluded](../enums/_types_index_.polytransactiontag.md#setdefaultexcluded) \| [EnableDividends](../enums/_types_index_.polytransactiontag.md#enabledividends) \| [EnableCappedSto](../enums/_types_index_.polytransactiontag.md#enablecappedsto) \| [EnableTieredSto](../enums/_types_index_.polytransactiontag.md#enabletieredsto) \| [EnableGeneralPermissionManager](../enums/_types_index_.polytransactiontag.md#enablegeneralpermissionmanager) \| [EnableGeneralTransferManager](../enums/_types_index_.polytransactiontag.md#enablegeneraltransfermanager) \| [EnableCountTransferManager](../enums/_types_index_.polytransactiontag.md#enablecounttransfermanager) \| [EnablePercentageTransferManager](../enums/_types_index_.polytransactiontag.md#enablepercentagetransfermanager) \| [DisableController](../enums/_types_index_.polytransactiontag.md#disablecontroller) \| [FreezeIssuance](../enums/_types_index_.polytransactiontag.md#freezeissuance) \| [DisableFeature](../enums/_types_index_.polytransactiontag.md#disablefeature) \| [ReclaimDividendFunds](../enums/_types_index_.polytransactiontag.md#reclaimdividendfunds) \| [WithdrawTaxWithholdings](../enums/_types_index_.polytransactiontag.md#withdrawtaxwithholdings) \| [PushDividendPayment](../enums/_types_index_.polytransactiontag.md#pushdividendpayment) \| [PullDividendPayment](../enums/_types_index_.polytransactiontag.md#pulldividendpayment) \| [SetDividendsWallet](../enums/_types_index_.polytransactiontag.md#setdividendswallet) \| [AddDelegate](../enums/_types_index_.polytransactiontag.md#adddelegate) \| [ChangePermission](../enums/_types_index_.polytransactiontag.md#changepermission) \| [ControllerTransfer](../enums/_types_index_.polytransactiontag.md#controllertransfer) \| [ControllerRedeem](../enums/_types_index_.polytransactiontag.md#controllerredeem) \| [PauseSto](../enums/_types_index_.polytransactiontag.md#pausesto) \| [UnpauseSto](../enums/_types_index_.polytransactiontag.md#unpausesto) \| [FinalizeSto](../enums/_types_index_.polytransactiontag.md#finalizesto) \| [SetController](../enums/_types_index_.polytransactiontag.md#setcontroller) \| [SetDocument](../enums/_types_index_.polytransactiontag.md#setdocument) \| [RemoveDocument](../enums/_types_index_.polytransactiontag.md#removedocument) \| [ModifyKycDataMulti](../enums/_types_index_.polytransactiontag.md#modifykycdatamulti) \| [ModifyInvestorFlagMulti](../enums/_types_index_.polytransactiontag.md#modifyinvestorflagmulti) \| [IssueMulti](../enums/_types_index_.polytransactiontag.md#issuemulti) \| [AllowPreMinting](../enums/_types_index_.polytransactiontag.md#allowpreminting) \| [RevokePreMinting](../enums/_types_index_.polytransactiontag.md#revokepreminting) \| [ChangeAllowBeneficialInvestments](../enums/_types_index_.polytransactiontag.md#changeallowbeneficialinvestments) \| [ModifyTimes](../enums/_types_index_.polytransactiontag.md#modifytimes) \| [ModifyFunding](../enums/_types_index_.polytransactiontag.md#modifyfunding) \| [ModifyAddresses](../enums/_types_index_.polytransactiontag.md#modifyaddresses) \| [ModifyTiers](../enums/_types_index_.polytransactiontag.md#modifytiers) \| [ModifyLimits](../enums/_types_index_.polytransactiontag.md#modifylimits) \| [ModifyOracles](../enums/_types_index_.polytransactiontag.md#modifyoracles) \| [BuyWithScRateLimited](../enums/_types_index_.polytransactiontag.md#buywithscratelimited) \| [BuyWithPolyRateLimited](../enums/_types_index_.polytransactiontag.md#buywithpolyratelimited) \| [BuyWithEthRateLimited](../enums/_types_index_.polytransactiontag.md#buywithethratelimited) \| [BuyTokens](../enums/_types_index_.polytransactiontag.md#buytokens) \| [BuyTokensWithPoly](../enums/_types_index_.polytransactiontag.md#buytokenswithpoly) \| [ChangeHolderCount](../enums/_types_index_.polytransactiontag.md#changeholdercount) \| [ChangeHolderPercentage](../enums/_types_index_.polytransactiontag.md#changeholderpercentage) \| [ModifyWhitelistMulti](../enums/_types_index_.polytransactiontag.md#modifywhitelistmulti) \| [SetAllowPrimaryIssuance](../enums/_types_index_.polytransactiontag.md#setallowprimaryissuance) \| [TransferSecurityTokens](../enums/_types_index_.polytransactiontag.md#transfersecuritytokens) \| [UnfreezeTransfers](../enums/_types_index_.polytransactiontag.md#unfreezetransfers) \| [FreezeTransfers](../enums/_types_index_.polytransactiontag.md#freezetransfers) \| [Signature](../enums/_types_index_.polytransactiontag.md#signature) \| [TransferReservationOwnership](../enums/_types_index_.polytransactiontag.md#transferreservationownership) \| [TransferOwnership](../enums/_types_index_.polytransactiontag.md#transferownership) | - |

**Returns:** _\(Anonymous function\)_

a PostTransactionResolver that resolves to the value returned by the resolver function, or undefined if no resolver function was passed

### prepare

▸ **prepare**\(\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹Args, ReturnType››_

_Inherited from void_

_Defined in_ [_src/procedures/Procedure.ts:52_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/Procedure.ts#L52)

Mandatory method that builds a list of transactions that will be run

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹Args, ReturnType››_

### prepareTransactions

▸ **prepareTransactions**\(\): _Promise‹void›_

_Overrides void_

_Defined in_ [_src/procedures/ModifyTieredStoData.ts:61_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/ModifyTieredStoData.ts#L61)

* Modify the start and end date of the STO
* Modify the fundraise types of the STO
* Modify the custom currency symbol and the oracles used to convert POLY and ETH to said currency
* Modify the STO's tiers \(rates, tokens per tier and discounts when buying with POLY\)
* Modify investment limits \(min investment, max invested for non-accredited investors\)
* Modify treasury wallet, wallet for unsold tokens and stable coin addresses

Only transactions that will effectively present changes will be submitted

Note that this procedure will fail if:

* The STO has not been enabled or has been archived
* The STO has already started
* Attempting to use a custom currency on an STO with version 3.0.0 or lower
* The supplied parameters don't represent any changes in the STO

**Returns:** _Promise‹void›_

