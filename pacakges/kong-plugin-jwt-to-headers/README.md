## KongPlugin JWT to headers

Convert JWT claims to request http haders.

## Usage

```typescript
// js-plugins/jwt-to-headers.ts
import { Plugin, Schema, Version } from 'kong-plugin-jwt-to-headers'

module.exports = {
  Plugin,
  Schema,
  Version,
  Priority: 10,
};
```

Example:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

Request:
```
headers:
  Authorization: Bearer $ENCODED_JWT
```

decoded JWT payload:

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

The Kong plugin decode de JWT and add request headers:
```
x-jwt-claim-sub: "1234567890"
x-jwt-claim-name: "John Doe"
x-jwt-claim-iat: "1516239022"
```

**Note** All header values will be converted to string.

**Waring**
This plugin it does not serve to validate a JWT, but if the JWT have bad formatted it will return
```
Status: 400
Body: Invalid JWT token $ENCODED_JWT
```
