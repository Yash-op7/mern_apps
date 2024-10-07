# Requirements
- `$ npm init -y;`
- `$ npm i express cors helmet morgan jsonwebtoken bcrypt express-rate-limit joi cookie-parser mongoose`

# Mistakes made:
- Think long and hard about the data schemas
- Mistakenly used .find() instead of .findOne() for checking if a user exists.
- forgot `.select("+password");` in User.findOne() in `/signin`
- memorize this:
```js
import {rateLimit as rateLimitFunction} from 'express-rate-limit';

const rateLimit = rateLimitFunction({
  windowMs: 10 * 1000,
  max: 1,
  message: "Too many login attempts. Please try later.",
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimit;
```
- using res.send(500) instead of res.status(500)
- remember: `res.clearCookie('key').status(200)...`
- remember: `res.cookie('key', value, {httpOnly: true}).status(200)...`