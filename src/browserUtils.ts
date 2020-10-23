import { Web3Wrapper, Provider } from '@polymathnetwork/contract-wrappers';
import { PolymathError } from './PolymathError';
import { ErrorCode } from './types';
import { delay } from './utils';

export enum BrowserSupport {
  MetamaskDisabled = 'MetamaskDisabled',
  MetamaskEnabled = 'MetamaskEnabled',
  None = 'None',
}

interface Ethereum extends Provider {
  networkVersion: string;
  _metamask?: {
    isUnlocked: () => Promise<boolean>;
  };
  request(payload: { method: string }): Promise<any>;
}

interface Web3VersionAPI {
  network?: string;
}

interface InjectedWeb3 {
  currentProvider: Provider;
  version: Web3VersionAPI;
}

interface ExtendedWindow extends Window {
  ethereum?: Ethereum;
  web3?: InjectedWeb3;
}

interface WindowWithEthereum extends ExtendedWindow {
  ethereum: Ethereum;
}

/**
 * Returns the browser support for Ethereum
 */
export function getBrowserSupport() {
  const isClient = typeof window !== 'undefined';

  if (!isClient) {
    return BrowserSupport.None;
  }

  const win = window as ExtendedWindow;

  if (win.ethereum) {
    return BrowserSupport.MetamaskEnabled;
  }
  return BrowserSupport.MetamaskDisabled;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @hidden
 */
function isWindowWithEthereum(obj: any): obj is WindowWithEthereum {
  return getBrowserSupport() === BrowserSupport.MetamaskEnabled;
}

/**
 * @hidden
 */
function isExtendedWindow(obj: any): obj is ExtendedWindow {
  return getBrowserSupport() === BrowserSupport.MetamaskDisabled;
}
/* eslint-enable @typescript-eslint/no-unused-vars */

/**
 * @hidden
 */
export async function getInjectedProvider(): Promise<Provider | undefined> {
  const isClient = typeof window !== 'undefined';

  if (!isClient) {
    return undefined;
  }

  const win = (window as any) as ExtendedWindow;

  if (isWindowWithEthereum(win)) {
    const injectedProvider = win.ethereum;
    try {
      await injectedProvider.request({ method: 'eth_requestAccounts' });
      return injectedProvider;
    } catch (err) {
      throw new PolymathError({ code: ErrorCode.UserDeniedAccess });
    }
  } else {
    throw new PolymathError({ code: ErrorCode.MetamaskNotInstalled });
  }
}

/**
 * @hidden
 */
export async function getWeb3() {
  const provider = await getInjectedProvider();
  if (!provider) {
    throw new PolymathError({ code: ErrorCode.NonBrowserEnvironment });
  }
  return new Web3Wrapper(provider);
}

/**
 * @hidden
 * Return the current networkId provided by the browser
 */
export async function getNetworkId(): Promise<number | null> {
  const win: ExtendedWindow = window as ExtendedWindow;
  if (!win) {
    throw new PolymathError({ code: ErrorCode.NonBrowserEnvironment });
  }

  let rawNetworkId: string | undefined;

  if (isWindowWithEthereum(win)) {
    rawNetworkId = win.ethereum.networkVersion;
  } else {
    return null;
  }

  if (rawNetworkId === 'loading' || !rawNetworkId) {
    await delay(50);
    return getNetworkId();
  }

  return parseInt(rawNetworkId, 10);
}

/**
 * @hidden
 */
export async function getCurrentAddress() {
  const win = window as ExtendedWindow;
  const web3 = await getWeb3();
  const accounts = await web3.getAvailableAddressesAsync();

  if (!win) {
    throw new PolymathError({ code: ErrorCode.NonBrowserEnvironment });
  }

  if (isWindowWithEthereum(win)) {
    // Special check for Metamask to know if it is locked or not
    const metamask = win.ethereum._metamask;
    if (metamask) {
      const isUnlocked = await metamask.isUnlocked();
      if (isUnlocked && !accounts.length) {
        throw new PolymathError({ code: ErrorCode.WalletIsLocked });
      }
    }
  } else if (isExtendedWindow(win)) {
    throw new PolymathError({ code: ErrorCode.IncompatibleBrowser });
  }

  return accounts[0];
}

/**
 * Runs the callback anytime the wallet address changes in the browser
 *
 * @param cb - callback that receives the new address and the previous one
 *
 * @returns an unsubscribe function
 */
export function onAddressChange(cb: (newAddress: string, previousAddress?: string) => void) {
  if (isExtendedWindow(window)) {
    // eslint-disable-next-line no-console
    console.warn('"onAddressChange" Was called, but the current browser does not support Ethereum');
    return () => {};
  }

  let previousAddress: string;

  // eslint-disable-next-line require-jsdoc
  const checkAddress = async () => {
    const newAddress = await getCurrentAddress();

    if (previousAddress !== newAddress) {
      previousAddress = newAddress;
      cb(newAddress, previousAddress);
    }
  };

  const interval = setInterval(checkAddress, 1000);

  // eslint-disable-next-line require-jsdoc
  const unsubscribe = () => {
    clearInterval(interval);
  };

  return unsubscribe;
}

/**
 * Runs the callback anytime the current network changes in the browser
 *
 * @param cb - callback that receives the new network id and the previous one
 *
 * @returns an unsubscribe function
 */
export function onNetworkChange(cb: (newNetwork: number, previousNetwork?: number) => void) {
  if (isExtendedWindow(window)) {
    // eslint-disable-next-line no-console
    console.warn('"onNetworkChange" Was called, but the current browser does not support Ethereum');
    return () => {};
  }

  let previousNetwork: number;

  // eslint-disable-next-line require-jsdoc
  const checkNetwork = async () => {
    const newNetwork = await getNetworkId();

    if (previousNetwork !== newNetwork) {
      previousNetwork = newNetwork!;
      cb(newNetwork!, previousNetwork);
    }
  };

  const interval = setInterval(checkNetwork, 1000);

  // eslint-disable-next-line require-jsdoc
  const unsubscribe = () => {
    clearInterval(interval);
  };

  return unsubscribe;
}
