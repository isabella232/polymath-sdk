export * from './types';
export * from './entities';
export { Polymath } from './Polymath';
export { PolymathError } from './PolymathError';
export { BigNumber } from '@polymathnetwork/contract-wrappers';

const isNode = typeof window === 'undefined';

const browserUtils = isNode ? null : require('./browserUtils');

export { browserUtils };
