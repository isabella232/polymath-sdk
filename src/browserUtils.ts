import { Web3Wrapper, Provider } from '@polymathnetwork/contract-wrappers';
import { PolymathError } from './PolymathError';
import { ErrorCode } from './types';
import { delay } from './utils';

export enum BrowserSupport {
  NoMetamask = 'NoMetamask',
  MetamaskLegacy = 'MetamaskLegacy',
  MetamaskModern = 'MetamaskModern',
  None = 'None',
}

interface Ethereum extends Provider {
  networkVersion: string;
  _metamask?: {
    isApproved: () => Promise<boolean>;
  };
  enable(): Promise<any>;
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
interface WindowWithWeb3 extends ExtendedWindow {
  web3: InjectedWeb3;
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
    return BrowserSupport.MetamaskModern;
  }
  if (win.web3) {
    return BrowserSupport.MetamaskLegacy;
  }
  return BrowserSupport.NoMetamask;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
function isModern(obj: any): obj is WindowWithEthereum {
  return getBrowserSupport() === BrowserSupport.MetamaskModern;
}

function isLegacy(obj: any): obj is WindowWithWeb3 {
  return getBrowserSupport() === BrowserSupport.MetamaskLegacy;
}

function isUnsupported(obj: any): obj is ExtendedWindow {
  return getBrowserSupport() === BrowserSupport.NoMetamask;
}
/* eslint-enable @typescript-eslint/no-unused-vars */

export async function getInjectedProvider(): Promise<Provider | undefined> {
  const isClient = typeof window !== 'undefined';

  if (!isClient) {
    return undefined;
  }

  const win = (window as any) as ExtendedWindow;

  if (isModern(win)) {
    const injectedProvider = win.ethereum;
    try {
      await injectedProvider.enable();
      return injectedProvider;
    } catch (err) {
      throw new PolymathError({ code: ErrorCode.UserDeniedAccess });
    }
  } else if (isLegacy(win)) {
    const injectedWeb3 = win.web3;
    const web3Provider = injectedWeb3.currentProvider;
    return web3Provider;
  } else {
    throw new PolymathError({ code: ErrorCode.MetamaskNotInstalled });
  }
}

export async function getWeb3() {
  const provider = await getInjectedProvider();
  if (!provider) {
    throw new PolymathError({ code: ErrorCode.NonBrowserEnvironment });
  }
  return new Web3Wrapper(provider);
}

/**
 * Returns the current networkId provided by the browser
 */
export async function getNetworkId(): Promise<number | null> {
  const win: ExtendedWindow = window as ExtendedWindow;
  if (!win) {
    throw new PolymathError({ code: ErrorCode.NonBrowserEnvironment });
  }

  let rawNetworkId: string | undefined;

  if (isModern(win)) {
    rawNetworkId = win.ethereum.networkVersion;
  } else if (isLegacy(win)) {
    rawNetworkId = win.web3.version.network;
  } else {
    return null;
  }

  if (rawNetworkId === 'loading' || !rawNetworkId) {
    await delay(50);
    return getNetworkId();
  }

  return parseInt(rawNetworkId, 10);
}

export async function getCurrentAddress() {
  const win = window as ExtendedWindow;
  const web3 = await getWeb3();
  const accounts = await web3.getAvailableAddressesAsync();

  if (!win) {
    throw new PolymathError({ code: ErrorCode.NonBrowserEnvironment });
  }

  if (isModern(win)) {
    // Special check for Metamask to know if it is locked or not
    const metamask = win.ethereum._metamask;
    if (metamask) {
      const isApproved = await metamask.isApproved();
      if (isApproved && !accounts.length) {
        throw new PolymathError({ code: ErrorCode.WalletIsLocked });
      }
    }
  } else if (isUnsupported(win)) {
    throw new PolymathError({ code: ErrorCode.IncompatibleBrowser });
  }

  return accounts[0];
}

/**
 * Runs the callback anytime the wallet address changes in the browser
 *
 * @param cb callback that receives the new address and the previous one
 *
 * @returns an unsubscribe function
 */
export function onAddressChange(cb: (newAddress: string, previousAddress?: string) => void) {
  if (isUnsupported(window as ExtendedWindow)) {
    // eslint-disable-next-line no-console
    console.warn(
      '"onAddressChange" Was called, but the current browser does not support Ethereum.'
    );
    return () => {};
  }

  let previousAddress: string;

  const checkAddress = async () => {
    const newAddress = await getCurrentAddress();

    if (previousAddress !== newAddress) {
      previousAddress = newAddress;
      cb(newAddress, previousAddress);
    }
  };

  const interval = setInterval(checkAddress, 1000);

  const unsubscribe = () => {
    clearInterval(interval);
  };

  return unsubscribe;
}

/**
 * Runs the callback anytime the current network changes in the browser
 *
 * @param cb callback that receives the new network id and the previous one
 *
 * @returns an unsubscribe function
 */
export function onNetworkChange(cb: (newNetwork: number, previousNetwork?: number) => void) {
  if (isUnsupported(window as ExtendedWindow)) {
    // eslint-disable-next-line no-console
    console.warn(
      '"onNetworkChange" Was called, but the current browser does not support Ethereum.'
    );
    return () => {};
  }

  let previousNetwork: number;

  const checkNetwork = async () => {
    const newNetwork = await getNetworkId();

    if (previousNetwork !== newNetwork) {
      previousNetwork = newNetwork!;
      cb(newNetwork!, previousNetwork);
    }
  };

  const interval = setInterval(checkNetwork, 1000);

  const unsubscribe = () => {
    clearInterval(interval);
  };

  return unsubscribe;
}
