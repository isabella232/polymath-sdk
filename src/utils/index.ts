import { isAddress } from '~/LowLevel/utils';
import { Pojo } from '~/types';
import stringify from 'json-stable-stringify';

export const delay = async (amount: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, amount);
  });
};

export function serialize(entityType: string, pojo: Pojo) {
  return `${entityType}:${Buffer.from(stringify(pojo)).toString('base64')}`;
}

export function unserialize(id: string) {
  const matched = id.match(/^.*:(.*)/);

  if (!matched) {
    throw new Error('Wrong ID format.');
  }

  const [, serialized] = matched;

  const jsonString = Buffer.from(serialized, 'base64').toString('utf8');

  return JSON.parse(jsonString);
}

export function isValidAddress(address: string) {
  return isAddress(address);
}
