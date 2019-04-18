import { isAddress } from '../LowLevel/utils';
import { Pojo, isPojo } from '../types';
import { join, keys } from 'lodash';

/**
 * Returns a string hash of a POJO for comparison
 *
 * @param args arguments to hash
 */
function hashObj(args: any): string {
  const sortedKeyArray = keys(args).sort();

  return join(
    sortedKeyArray.map(key => {
      const val = args[key];
      let result;

      if (isPojo(val)) {
        result = hashObj(val);
      } else {
        result = `${args[key]}`;
      }

      return `${key}:${result}`;
    }),
    ','
  );
}

export const delay = async (amount: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, amount);
  });
};

export function serialize(entityType: string, pojo: Pojo) {
  const hashed = hashObj(pojo);
  return `${entityType}:${Buffer.from(hashed).toString('base64')}`;
}

export function isValidAddress(address: string) {
  return isAddress(address);
}
