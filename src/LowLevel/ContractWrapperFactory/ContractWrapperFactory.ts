import { Context } from '../LowLevel';
import { SecurityToken } from '../SecurityToken';

export class ContractWrapperFactory {
  static packVersion(versions: number[]) {
    return versions.join('.');
  }

  /**
   * Given contract's address, this function will return a version agnostic contract wrapper.
   */
  static wrapContract = async (contractName: string, address: string, context: Context) => {
    // First, wrap this address with a 'stub' wrapper in order to get deployed contract's version.
    const stubAbi = (await import(`../${contractName}/stub.abi`)).StubAbi;
    const stubClass = (await import(`../${contractName}/stub`)).Stub;
    const stubLowLevelContract = new stubClass({ address, abi: stubAbi, context });

    const versionArray = await stubLowLevelContract.getVersion();
    const packedVersion = ContractWrapperFactory.packVersion(versionArray);

    // Now that we know deployed contract version, we'll wrap it with a version specific contract wrapper.
    const ContractWrapper = (await import(`../${contractName}/${packedVersion}`))[contractName];
    const wrappedContract = new ContractWrapper({ address, context });
    return wrappedContract;
  };

  static getSecurityToken = async (address: string, context: Context) => {
    return (await ContractWrapperFactory.wrapContract(
      'SecurityToken',
      address,
      context
    )) as SecurityToken;
  };
}
