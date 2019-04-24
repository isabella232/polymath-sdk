import { serialize, unserialize } from '../index';

describe('serialize and unserialize', () => {
  const entityType = 'someEntity';

  const pojo1 = {
    foo: 'Foo',
    bar: 'Bar',
  };

  const inversePojo1 = {
    bar: 'Bar',
    foo: 'Foo',
  };

  const pojo2 = {
    baz: 'baz',
  };

  test('serialize prefixes the unique id with the provided entity type', () => {
    expect(serialize(entityType, pojo1)).toMatch(new RegExp(`^${entityType}:`));
  });

  test('serialize returns the same unique id for the same pojo', () => {
    expect(serialize('', pojo1)).toBe(serialize('', pojo1));
    expect(serialize('', pojo1)).toBe(serialize('', inversePojo1));
  });

  test('serialize returns a different unique id for different pojos', () => {
    expect(serialize('', pojo1)).not.toBe(serialize('', pojo2));
  });

  test('unserialize recovers the serialized object', () => {
    expect(unserialize(serialize('', pojo1))).toEqual(pojo1);
    expect(unserialize(serialize('', inversePojo1))).toEqual(pojo1);
  });
});
