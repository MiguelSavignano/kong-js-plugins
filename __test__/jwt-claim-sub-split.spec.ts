import * as plugin from '../js-plugins/jwt-claim-sub-split';

describe('Test', () => {
  let kong = {
    log: { info: () => {} },
    request: {
      getHeader: () => `Bearer `,
    },
    response: { exit: () => {} },
    service: { request: { setHeaders: () => {} } },
  };

  it('#buildHeaders', () => {
    // @ts-ignore
    const subject = new plugin.Plugin({
      split: ':',
      names: 'user-id:organization-id',
    });

    expect(subject.buildHeaders('12345:6789')).toEqual({
      'x-jwt-claim-user-id': '12345',
      'x-jwt-claim-organization-id': '6789',
    });
  });
});
