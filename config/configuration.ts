export default () => ({
  port: parseInt(process.env.PORT, 8080) || 3000,
  database: {
    management: process.env.DB_URL_MANAGEMENT,
    client: process.env.DB_URL_CLIENT,
  }
});