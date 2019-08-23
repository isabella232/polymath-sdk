const { Polymath } = require('./dist/index.js');

const client = new Polymath();

(async () => {
  await client.connect({
    polymathRegistryAddress: '0x9FBDa871d559710256a2502A2517b794B482Db40'.toLowerCase(),
    privateKey: '0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1',
    providerUrl: 'http://127.0.0.1:8545',
  });

  const address = await client.getCurrentAddress();
  console.log('ADDRESS', address);
  try {
    const queue = await client.reserveSecurityToken({ symbol: 'jeaeccosc' });
    console.log('RESERVATION FEES', queue.fees.toNumber());
    queue.onStatusChange(q => {
      console.log('QUEUE STATUS CHANGE', q.status);
    });
    queue.onTransactionStatusChange(transaction => {
      console.log('TX STATUS CHANGED:', transaction.status);
    });
    const reservation = await queue.run();

    console.log('ST reservation complete, expires at: ', reservation.expiry);

    const launchQueue = await reservation.createSecurityToken({
      name: 'jereacoccc',
      divisible: false,
    });

    console.log('LAUNCH FEES', launchQueue.fees.toNumber());

    const token = await launchQueue.run();

    console.log('ADDRESS: ', token.address);

    const tokens = await client.getSecurityTokens({ owner: address });
    const token2 = await client.getSecurityToken({ address: 'A0T0' });

    console.log('token2 address', token2.address);

    console.log(
      `OWNER OF ${tokens.length} TOKENS, SYMBOLS: ${tokens.map(tk => tk.symbol).join(', ')}`
    );
  } catch (err) {
    console.log(err);
  }
})();
