export * from './types';
export * from './entities';
export * from './utils';
export { Polymath } from './Polymath';
export { PolymathError } from './PolymathError';

const isNode = typeof window === 'undefined';

const browserUtils = isNode ? null : require('./browserUtils');

export { browserUtils };
