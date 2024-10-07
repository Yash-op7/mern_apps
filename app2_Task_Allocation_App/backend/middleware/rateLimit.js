import {rateLimit as rateLimitFunction} from 'express-rate-limit';

const rateLimit = rateLimitFunction({
  windowMs: 2 * 1000,
  max: 1,
  message: "Too many login attempts. Please try later.",
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimit;
