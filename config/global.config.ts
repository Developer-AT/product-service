import { registerAs } from "@nestjs/config";

export default registerAs('global', () => ({
  redis: process.env.REDIS_URL || 'redis://localhost:6379',
}));