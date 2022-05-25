import kong from 'kong-pdk/kong';

class KongPlugin {
  config: { split: string; names: string };
  constructor(config: { split: string; names: string }) {
    this.config = config;
  }

  buildHeaders(sub: string) {
    const { split, names } = this.config;
    const headers: any = {};
    const subSplit = sub.split(split);
    const namesSplit = names.split(split);
    namesSplit.forEach((name, index) => {
      headers[`x-jwt-claim-${name}`] = subSplit[index];
    });

    return headers;
  }

  async access(kong: kong) {
    const header = await kong.request.getHeader('x-jwt-claim-sub');
    if (header && this.config.split && this.config.names) {
      await kong.service.request.setHeaders(this.buildHeaders(header));
    }
  }
}

module.exports = {
  Plugin: KongPlugin,
  Schema: [{ split: { type: 'string' } }, { names: { type: 'string' } }],
  Version: '0.1.0',
  Priority: 0,
};
