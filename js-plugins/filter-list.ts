import kong from 'kong-pdk/kong';

class KongPlugin {
  constructor(public config: { filter_list: string }) {}

  async response(kong: kong) {
    if ((await kong.response.getSource()) == 'service') {
      let body = await kong.service.response.getRawBody();
      let parsedBody: any = null;
      try {
        parsedBody = JSON.parse(body);
      } catch (e) {
        return;
      }
      await kong.response.exit(
        await kong.response.getStatus(),
        JSON.stringify(this.filterList(parsedBody), null, 2),
      );
    }
  }

  filterList(parsedBody: any) {
    const list = this.config.filter_list.split(',');
    return parsedBody.map((item: any) => {
      const memo: any = {};
      list.forEach((key: any) => (memo[key] = item[key]));
      return memo;
    });
  }
}

module.exports = {
  Plugin: KongPlugin,
  Schema: [
    {
      filter_list: {
        type: 'string',
      },
    },
  ],
  Version: '0.1.0',
  Priority: 0,
};
