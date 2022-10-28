import * as plugin from './jwt-to-headers';

describe('Test', () => {
  let kong = {
    log: { info: () => {} },
    request: {
      getHeader: () => `Bearer `,
    },
    response: { exit: () => {} },
    service: { request: { setHeaders: () => {} } },
  };

  // @ts-ignore
  const subject = new plugin.Plugin();

  it('JWT decode error', async () => {
    let jwtToken = 'JWT_ERROR';
    const spy = jest.spyOn(kong.response, 'exit');
    kong.request.getHeader = () => `Bearer ${jwtToken}`;
    await subject.access(kong);
    expect(spy).toHaveBeenCalledWith(400, `Invalid JWT token ${jwtToken}`);
  });

  it('Transfor all jwt claims to heaers', async () => {
    let jwtToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    const spy = jest.spyOn(kong.service.request, 'setHeaders');
    kong.request.getHeader = () => `Bearer ${jwtToken}`;
    await subject.access(kong);
    expect(spy).toHaveBeenCalledWith({
      'x-jwt-claim-iat': '1516239022',
      'x-jwt-claim-name': 'John Doe',
      'x-jwt-claim-sub': '1234567890',
    });
  });
});
