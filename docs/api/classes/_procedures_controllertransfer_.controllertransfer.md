# Class: ControllerTransfer <**ReturnType**>

Procedure that forcefully transfers Security Tokens from one account to another.
Can only be executed by the Security Token's Controller

## Type parameters

▪ **ReturnType**

## Hierarchy

* Procedure‹[ControllerTransferProcedureArgs](../interfaces/_types_index_.controllertransferprocedureargs.md)›

  ↳ **ControllerTransfer**

## Index

### Constructors

* [constructor](_procedures_controllertransfer_.controllertransfer.md#constructor)

### Properties

* [args](_procedures_controllertransfer_.controllertransfer.md#protected-args)
* [context](_procedures_controllertransfer_.controllertransfer.md#protected-context)
* [type](_procedures_controllertransfer_.controllertransfer.md#type)

### Methods

* [addProcedure](_procedures_controllertransfer_.controllertransfer.md#addprocedure)
* [addSignatureRequest](_procedures_controllertransfer_.controllertransfer.md#addsignaturerequest)
* [addTransaction](_procedures_controllertransfer_.controllertransfer.md#addtransaction)
* [prepare](_procedures_controllertransfer_.controllertransfer.md#prepare)
* [prepareTransactions](_procedures_controllertransfer_.controllertransfer.md#preparetransactions)

## Constructors

###  constructor

\+ **new ControllerTransfer**(`args`: [ControllerTransferProcedureArgs](../interfaces/_types_index_.controllertransferprocedureargs.md), `context`: [Context](_context_.context.md)): *[ControllerTransfer](_procedures_controllertransfer_.controllertransfer.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/Procedure.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | [ControllerTransferProcedureArgs](../interfaces/_types_index_.controllertransferprocedureargs.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[ControllerTransfer](_procedures_controllertransfer_.controllertransfer.md)*

## Properties

### `Protected` args

• **args**: *[ControllerTransferProcedureArgs](../interfaces/_types_index_.controllertransferprocedureargs.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:34](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/Procedure.ts#L34)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:36](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/Procedure.ts#L36)*

___

###  type

• **type**: *[ProcedureType](../enums/_types_index_.proceduretype.md)* =  ProcedureType.ControllerTransfer

*Overrides void*

*Defined in [src/procedures/ControllerTransfer.ts:44](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/ControllerTransfer.ts#L44)*

## Methods

###  addProcedure

▸ **addProcedure**<**A**, **R**>(`Proc`: [ProcedureClass](../interfaces/_procedures_procedure_.procedureclass.md)‹A, R›): *(Anonymous function)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:91](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/Procedure.ts#L91)*

Appends a Procedure into the TransactionQueue's queue. This defines
what will be run by the TransactionQueue when it is started.

**Type parameters:**

▪ **A**

▪ **R**: *any*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`Proc` | [ProcedureClass](../interfaces/_procedures_procedure_.procedureclass.md)‹A, R› | A Procedure that will be run in the Procedure's TransactionQueue  |

**Returns:** *(Anonymous function)*

whichever value is returned by the Procedure

___

###  addSignatureRequest

▸ **addSignatureRequest**<**A**>(`request`: [SignatureRequest](../modules/_types_index_.md#signaturerequest)‹A›): *(Anonymous function)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:179](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/Procedure.ts#L179)*

Appends a signature request into the TransactionQueue's queue. This defines
what will be run by the TransactionQueue when it is started.

**Type parameters:**

▪ **A**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | [SignatureRequest](../modules/_types_index_.md#signaturerequest)‹A› | A signature request that will be run in the Procedure's TransactionQueue  |

**Returns:** *(Anonymous function)*

a PostTransactionResolver that resolves to the signed data

___

###  addTransaction

▸ **addTransaction**<**A**, **R**, **V**>(`method`: [LowLevelMethod](../modules/_types_index_.md#lowlevelmethod)‹A› | [FutureLowLevelMethod](../interfaces/_types_index_.futurelowlevelmethod.md)‹V, A›, `__namedParameters`: object): *(Anonymous function)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:137](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/Procedure.ts#L137)*

Appends a method or future method into the TransactionQueue's queue. This defines
what will be run by the TransactionQueue when it is started.

**Type parameters:**

▪ **A**

▪ **R**: *any[]*

▪ **V**: *any*

**Parameters:**

▪ **method**: *[LowLevelMethod](../modules/_types_index_.md#lowlevelmethod)‹A› | [FutureLowLevelMethod](../interfaces/_types_index_.futurelowlevelmethod.md)‹V, A›*

A method (or future method) that will be run in the Procedure's TransactionQueue.
A future method is a transaction that doesn't exist at prepare time
(for example a transaction on a module that hasn't been attached but will be by the time the previous transactions are run)

▪`Default value`  **__namedParameters**: *object*=  {}

Name | Type | Default |
------ | ------ | ------ |
`fees` | undefined &#124; [Fees](../interfaces/_types_index_.fees.md) | - |
`resolvers` | object |  ([] as unknown) as ResolverArray<R> |
`tag` | undefined &#124; [Any](../enums/_types_index_.polytransactiontag.md#any) &#124; [GetTokens](../enums/_types_index_.polytransactiontag.md#gettokens) &#124; [ApproveErc20](../enums/_types_index_.polytransactiontag.md#approveerc20) &#124; [TransferErc20](../enums/_types_index_.polytransactiontag.md#transfererc20) &#124; [ReserveSecurityToken](../enums/_types_index_.polytransactiontag.md#reservesecuritytoken) &#124; [CreateSecurityToken](../enums/_types_index_.polytransactiontag.md#createsecuritytoken) &#124; [CreateCheckpoint](../enums/_types_index_.polytransactiontag.md#createcheckpoint) &#124; [CreateErc20DividendDistribution](../enums/_types_index_.polytransactiontag.md#createerc20dividenddistribution) &#124; [SetErc20TaxWithholding](../enums/_types_index_.polytransactiontag.md#seterc20taxwithholding) &#124; [SetEtherTaxWithholding](../enums/_types_index_.polytransactiontag.md#setethertaxwithholding) &#124; [SetDefaultExcluded](../enums/_types_index_.polytransactiontag.md#setdefaultexcluded) &#124; [EnableDividends](../enums/_types_index_.polytransactiontag.md#enabledividends) &#124; [EnableCappedSto](../enums/_types_index_.polytransactiontag.md#enablecappedsto) &#124; [EnableTieredSto](../enums/_types_index_.polytransactiontag.md#enabletieredsto) &#124; [EnableGeneralPermissionManager](../enums/_types_index_.polytransactiontag.md#enablegeneralpermissionmanager) &#124; [EnableGeneralTransferManager](../enums/_types_index_.polytransactiontag.md#enablegeneraltransfermanager) &#124; [EnableCountTransferManager](../enums/_types_index_.polytransactiontag.md#enablecounttransfermanager) &#124; [EnablePercentageTransferManager](../enums/_types_index_.polytransactiontag.md#enablepercentagetransfermanager) &#124; [DisableController](../enums/_types_index_.polytransactiontag.md#disablecontroller) &#124; [FreezeIssuance](../enums/_types_index_.polytransactiontag.md#freezeissuance) &#124; [DisableFeature](../enums/_types_index_.polytransactiontag.md#disablefeature) &#124; [ReclaimDividendFunds](../enums/_types_index_.polytransactiontag.md#reclaimdividendfunds) &#124; [WithdrawTaxWithholdings](../enums/_types_index_.polytransactiontag.md#withdrawtaxwithholdings) &#124; [PushDividendPayment](../enums/_types_index_.polytransactiontag.md#pushdividendpayment) &#124; [PullDividendPayment](../enums/_types_index_.polytransactiontag.md#pulldividendpayment) &#124; [SetDividendsWallet](../enums/_types_index_.polytransactiontag.md#setdividendswallet) &#124; [AddDelegate](../enums/_types_index_.polytransactiontag.md#adddelegate) &#124; [ChangePermission](../enums/_types_index_.polytransactiontag.md#changepermission) &#124; [ControllerTransfer](../enums/_types_index_.polytransactiontag.md#controllertransfer) &#124; [ControllerRedeem](../enums/_types_index_.polytransactiontag.md#controllerredeem) &#124; [PauseSto](../enums/_types_index_.polytransactiontag.md#pausesto) &#124; [UnpauseSto](../enums/_types_index_.polytransactiontag.md#unpausesto) &#124; [FinalizeSto](../enums/_types_index_.polytransactiontag.md#finalizesto) &#124; [SetController](../enums/_types_index_.polytransactiontag.md#setcontroller) &#124; [SetDocument](../enums/_types_index_.polytransactiontag.md#setdocument) &#124; [RemoveDocument](../enums/_types_index_.polytransactiontag.md#removedocument) &#124; [ModifyKycDataMulti](../enums/_types_index_.polytransactiontag.md#modifykycdatamulti) &#124; [ModifyInvestorFlagMulti](../enums/_types_index_.polytransactiontag.md#modifyinvestorflagmulti) &#124; [IssueMulti](../enums/_types_index_.polytransactiontag.md#issuemulti) &#124; [AllowPreMinting](../enums/_types_index_.polytransactiontag.md#allowpreminting) &#124; [RevokePreMinting](../enums/_types_index_.polytransactiontag.md#revokepreminting) &#124; [ChangeAllowBeneficialInvestments](../enums/_types_index_.polytransactiontag.md#changeallowbeneficialinvestments) &#124; [ModifyTimes](../enums/_types_index_.polytransactiontag.md#modifytimes) &#124; [ModifyFunding](../enums/_types_index_.polytransactiontag.md#modifyfunding) &#124; [ModifyAddresses](../enums/_types_index_.polytransactiontag.md#modifyaddresses) &#124; [ModifyTiers](../enums/_types_index_.polytransactiontag.md#modifytiers) &#124; [ModifyLimits](../enums/_types_index_.polytransactiontag.md#modifylimits) &#124; [ModifyOracles](../enums/_types_index_.polytransactiontag.md#modifyoracles) &#124; [BuyWithScRateLimited](../enums/_types_index_.polytransactiontag.md#buywithscratelimited) &#124; [BuyWithPolyRateLimited](../enums/_types_index_.polytransactiontag.md#buywithpolyratelimited) &#124; [BuyWithEthRateLimited](../enums/_types_index_.polytransactiontag.md#buywithethratelimited) &#124; [BuyTokens](../enums/_types_index_.polytransactiontag.md#buytokens) &#124; [BuyTokensWithPoly](../enums/_types_index_.polytransactiontag.md#buytokenswithpoly) &#124; [ChangeHolderCount](../enums/_types_index_.polytransactiontag.md#changeholdercount) &#124; [ChangeHolderPercentage](../enums/_types_index_.polytransactiontag.md#changeholderpercentage) &#124; [ModifyWhitelistMulti](../enums/_types_index_.polytransactiontag.md#modifywhitelistmulti) &#124; [SetAllowPrimaryIssuance](../enums/_types_index_.polytransactiontag.md#setallowprimaryissuance) &#124; [TransferSecurityTokens](../enums/_types_index_.polytransactiontag.md#transfersecuritytokens) &#124; [UnfreezeTransfers](../enums/_types_index_.polytransactiontag.md#unfreezetransfers) &#124; [FreezeTransfers](../enums/_types_index_.polytransactiontag.md#freezetransfers) &#124; [Signature](../enums/_types_index_.polytransactiontag.md#signature) &#124; [TransferReservationOwnership](../enums/_types_index_.polytransactiontag.md#transferreservationownership) &#124; [TransferOwnership](../enums/_types_index_.polytransactiontag.md#transferownership) | - |

**Returns:** *(Anonymous function)*

a PostTransactionResolver that resolves to the value returned by the resolver function, or undefined if no resolver function was passed

___

###  prepare

▸ **prepare**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹Args, ReturnType››*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:52](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/Procedure.ts#L52)*

Mandatory method that builds a list of transactions that will be
run

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹Args, ReturnType››*

___

###  prepareTransactions

▸ **prepareTransactions**(): *Promise‹void›*

*Overrides void*

*Defined in [src/procedures/ControllerTransfer.ts:54](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/procedures/ControllerTransfer.ts#L54)*

Forcefully transfer tokens from one address to another

Note this procedure will fail if:
- Any of the addresses are invalid
- The sender's ("from" address) balance is less than the amount being transferred
- The current wallet address is not the Security Token controller address

**Returns:** *Promise‹void›*
