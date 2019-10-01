import { SecurityToken } from '../SecurityToken';
import { Context } from '../../Context';

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  address: '0x1',
  owner: '0x3',
};

const params2 = {
  symbol: 'TEST2',
  name: 'Test Token 2',
  address: '0x2',
  owner: '0x4',
};

const context = {} as Context;

describe('SecurityToken', () => {
  let st1: SecurityToken = {} as SecurityToken;
  let st2: SecurityToken = {} as SecurityToken;
  let st1Copy: SecurityToken = {} as SecurityToken;

  beforeEach(() => {
    st1 = new SecurityToken(params1, context);
    st2 = new SecurityToken(params2, context);
    st1Copy = new SecurityToken(params1, context);
  });

  describe('constructor', () => {
    test('instantiates correctly', () => {
      expect(st1).toBeDefined();
      expect(st1.name).toBeDefined();
      expect(st1.symbol).toBeDefined();
    });

    test('generates the same uid for two instances with the same address', () => {
      expect(st1.uid).toBe(st1Copy.uid);
    });

    test('generates different uids for two instances with differen addresses', () => {
      expect(st1.uid).not.toBe(st2.uid);
    });
  });
});
