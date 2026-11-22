require('dotenv').config();
const IORedis = require('ioredis');

const connectionOptions = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME || 'default',
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
};

if (process.env.REDIS_TLS === 'true') {
    connectionOptions.tls = {};
}

const connection = new IORedis(connectionOptions);

module.exports = connection;