require('dotenv').config();

const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const connectionOptions = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME || 'default',
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
};

const connection = new IORedis(connectionOptions);
const callQueue = new Queue('customer-followup', {connection});
  
module.exports = { callQueue, connection };