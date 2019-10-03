import { Context } from '~/Context';
import { SecurityToken } from '../SecurityToken';
import { Shareholders } from '~/entities/SecurityToken/Shareholders';
import { SubModule } from '~/entities/SecurityToken/SubModule';
import { CreateCheckpoint } from '../../procedures/CreateCheckpoint';
import { PolymathBase } from '~/PolymathBase';
import * as TypeMoq from 'typemoq';
import { IMock } from 'typemoq';
import { IGlobalMock } from 'typemoq/Api/IGlobalMock';
import { Web3ProviderEngine } from '@0x/subproviders';

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  address: '0x1',
  owner: '0x3',
};

describe('Shareholders', () => {
  let target: Shareholders;
  let mockSecurityToken: IMock<SecurityToken>;
  let mockCreateCheckpoint: IGlobalMock<CreateCheckpoint>;

  beforeAll(() => {
    // This mock must be prefixed with "mock" to work, i.e. mockName
    /*
    const mockPrepare = jest.fn();
    jest.mock('../../procedures/CreateCheckpoint', () => ({
      CreateCheckpoint: jest.fn(() => ({
        prepare: mockPrepare,
      })),
    }));
    */
    mockCreateCheckpoint = TypeMoq.GlobalMock.ofType2<CreateCheckpoint>('CreateCheckpoint', global);

    const provider = new Web3ProviderEngine();
    provider.start();
    const mockProvider: TypeMoq.IMock<Web3ProviderEngine> = TypeMoq.Mock.ofInstance(provider);
    const polymathBase = new PolymathBase({ provider: mockProvider.object });
    const mockPolymathBase: TypeMoq.IMock<PolymathBase> = TypeMoq.Mock.ofInstance(polymathBase);
    const context = new Context({ contractWrappers: mockPolymathBase.object });
    const mockContext: TypeMoq.IMock<Context> = TypeMoq.Mock.ofInstance(context);
    const st1 = new SecurityToken(params1, mockContext.object);

    // const SecurityTokenMock = mock(SecurityToken);
    mockSecurityToken = TypeMoq.Mock.ofInstance(st1);
    // when(SecurityTokenMock.uid).thenReturn('12345');
    mockSecurityToken.setup(x => x.uid).returns((key: string) => '12345');
    // when(SecurityTokenMock.symbol).thenReturn(params1.symbol);
    mockSecurityToken.setup(x => x.uid).returns((key: string) => params1.symbol);

    // Instantiate Shareholders
    target = new Shareholders(mockSecurityToken.object, mockContext.object);
  });

  describe('Types', () => {
    test('should extend Submodule', async () => {
      expect(target instanceof SubModule).toBe(true);
    });
  });

  describe('createCheckpoint', () => {
    test('should send the transaction to createCheckpoint', async () => {
      // Real call
      await target.createCheckpoint();

      // Verifications
      spyOn(target, 'createCheckpoint').wasCalled;
      TypeMoq.GlobalScope.using(mockCreateCheckpoint).with(() => {
        expect(mockCreateCheckpoint.object.prepare()).toHaveBeenCalledTimes(1);
      });
    });
  });

  /*
  // Original test we created here, saving it as a comment as it is useful to test
  // use of wrappers in procedures afterwards.
  describe('createCheckpoint', () => {
    beforeAll(() => {
      MockPolymathBase = mock(PolymathBase);
      polymathBase = instance(MockPolymathBase);

      MockedSecurityTokenContract = mock(SecurityToken_3_0_0);
      myContractPromise = Promise.resolve(
        instance(MockedSecurityTokenContract)
      );
      MockedTokenFactory = mock(MockedTokenFactory);

      const context = new Context({
        contractWrappers: polymathBase,
      });
      target = new SecurityToken(params1, context);
    });

    test('should send the transaction to createCheckpoint', async () => {
      when(MockPolymathBase.tokenFactory).thenReturn(
        instance(MockedTokenFactory)
      );
      when(
        MockedTokenFactory.getSecurityTokenInstanceFromTicker(params1.symbol)
      ).thenReturn(myContractPromise);

      // Stub the method

      when(MockedSecurityTokenContract.createCheckpoint).thenReturn(
        getMockedPolyResponse
      );

      // Real call
      const result = await target.shareholders.createCheckpoint();

      // Result expectation
      // Expect needs a mock of transaction queue
      //expect(result).toBe();
      // Verifications
      verify(MockPolymathBase.tokenFactory).once();
      verify(
        MockedTokenFactory.getSecurityTokenInstanceFromTicker(params1.symbol)
      ).once();
      verify(MockedSecurityTokenContract.createCheckpoint).once();
    });
  });
  */
});
