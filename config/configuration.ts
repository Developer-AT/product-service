export default () => ({
    port: parseInt(process.env.PORT, 8080) || 3000,
	redis: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		url: process.env.REDIS_URL
	}
});
