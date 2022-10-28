import kong from 'kong-pdk/kong';
import jwt_decode from 'jwt-decode';

class KongPlugin {
  async access(kong: kong) {
    const header = await kong.request.getHeader('Authorization');
    const split_hader = header.split(' ');
    const jwtToken = split_hader[split_hader.length - 1];
    let decoded: any = null;
    try {
      decoded = jwt_decode(jwtToken);
    } catch (error) {
      return await kong.response.exit(400, `Invalid JWT token ${jwtToken}`);
    }

    const headers: any = {};
    // @ts-ignore
    Object.entries(decoded).map(([key, value]: [string, any]) => {
      headers[`x-jwt-claim-${key}`] = value && value.toString();
    });
    await kong.service.request.setHeaders(headers);
  }
}

module.exports = {
  Plugin: KongPlugin,
  Schema: [{ message: { type: 'string' } }],
  Version: '0.1.0',
  Priority: 10,
};
