## Setup

```
docker-compose up --build
```

```
curl http://localhost:8000/mock/request
```

### Js plugins

https://docs.konghq.com/gateway/latest/reference/external-plugins/#developing-javascript-plugins

Examples:
https://github.com/Kong/kong-js-pdk/blob/master/examples/js-transform.js

### Run test suite

```
cd __test__
npm install
```

```
npm run test
```
