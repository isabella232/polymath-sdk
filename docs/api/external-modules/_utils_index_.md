# utils/index

## Index

### Interfaces

* [FindCappedStoPauseParams](../interfaces/_utils_index_.findcappedstopauseparams.md)
* [FindCappedStoPreMintAllowedParams](../interfaces/_utils_index_.findcappedstopremintallowedparams.md)
* [FindCheckpointCreatedParams](../interfaces/_utils_index_.findcheckpointcreatedparams.md)
* [FindControllerTransferParams](../interfaces/_utils_index_.findcontrollertransferparams.md)
* [FindErc20DividendClaimedParams](../interfaces/_utils_index_.finderc20dividendclaimedparams.md)
* [FindErc20DividendDepositedParams](../interfaces/_utils_index_.finderc20dividenddepositedparams.md)
* [FindErc20DividendReclaimedParams](../interfaces/_utils_index_.finderc20dividendreclaimedparams.md)
* [FindErc20SetWalletParams](../interfaces/_utils_index_.finderc20setwalletparams.md)
* [FindErc20SetWithholdingParams](../interfaces/_utils_index_.finderc20setwithholdingparams.md)
* [FindEthDividendClaimedParams](../interfaces/_utils_index_.findethdividendclaimedparams.md)
* [FindEthDividendReclaimedParams](../interfaces/_utils_index_.findethdividendreclaimedparams.md)
* [FindEthSetWalletParams](../interfaces/_utils_index_.findethsetwalletparams.md)
* [FindEthSetWithholdingParams](../interfaces/_utils_index_.findethsetwithholdingparams.md)
* [FindEtherDividendDepositedParams](../interfaces/_utils_index_.findetherdividenddepositedparams.md)
* [FindEventParams](../interfaces/_utils_index_.findeventparams.md)
* [FindEvents](../interfaces/_utils_index_.findevents.md)
* [FindModifyInvestorFlagParams](../interfaces/_utils_index_.findmodifyinvestorflagparams.md)
* [FindModifyKycDataParams](../interfaces/_utils_index_.findmodifykycdataparams.md)
* [FindModuleAddedParams](../interfaces/_utils_index_.findmoduleaddedparams.md)
* [FindNewSecurityTokenParams](../interfaces/_utils_index_.findnewsecuritytokenparams.md)
* [FindTickerRegisteredParams](../interfaces/_utils_index_.findtickerregisteredparams.md)
* [FindTieredStoPauseParams](../interfaces/_utils_index_.findtieredstopauseparams.md)
* [FindTieredStoPreMintAllowedParams](../interfaces/_utils_index_.findtieredstopremintallowedparams.md)

### Functions

* [areSameAddress](_utils_index_.md#aresameaddress)
* [checkStringLength](_utils_index_.md#checkstringlength)
* [convertVersionToEnum](_utils_index_.md#convertversiontoenum)
* [delay](_utils_index_.md#const-delay)

## Functions

### areSameAddress

▸ **areSameAddress**\(`a`: string, `b`: string\): _boolean_

_Defined in_ [_src/utils/index.ts:57_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/utils/index.ts#L57)

Check if two addresses correspond to the same wallet

**Parameters:**

| Name | Type |
| :--- | :--- |
| `a` | string |
| `b` | string |

**Returns:** _boolean_

### checkStringLength

▸ **checkStringLength**\(`value`: string, `variableName`: string, `opts`: object\): _void_

_Defined in_ [_src/utils/index.ts:68_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/utils/index.ts#L68)

Check the length of a given string to ensure it meets correct bounds

**Parameters:**

▪ **value**: _string_

the string itself

▪ **variableName**: _string_

the name of the variable associated to the string itself

▪`Default value` **opts**: _object_= { maxLength: 32 }

optional min and max length of the string. Defaults to a minimum of 0 \(empty string\) and a maximum of 32 characters

| Name | Type |
| :--- | :--- |
| `maxLength` | number |
| `minLength?` | undefined \| number |

**Returns:** _void_

### convertVersionToEnum

▸ **convertVersionToEnum**\(`versionBigNumber`: BigNumber\[\]\): _V3\_0\_0 \| V3\_1\_0_

_Defined in_ [_src/utils/index.ts:296_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/utils/index.ts#L296)

Convert a version number array into a string of type \[\[Version\]\]

**Parameters:**

| Name | Type |
| :--- | :--- |
| `versionBigNumber` | BigNumber\[\] |

**Returns:** _V3\_0\_0 \| V3\_1\_0_

### `Const` delay

▸ **delay**\(`amount`: number\): _Promise‹Object›_

_Defined in_ [_src/utils/index.ts:46_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/utils/index.ts#L46)

Promisified version of a timeout

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `amount` | number | time to wait |

**Returns:** _Promise‹Object›_

