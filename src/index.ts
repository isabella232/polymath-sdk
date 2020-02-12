export * from './types';
export * from './entities';
export { Polymath } from './base/Polymath';
export { PolymathError } from './base/PolymathError';
export { BigNumber } from '@polymathnetwork/contract-wrappers';

const isNode = typeof window === 'undefined';

const browserUtils = isNode ? null : require('./base/browserUtils');

export { browserUtils };
