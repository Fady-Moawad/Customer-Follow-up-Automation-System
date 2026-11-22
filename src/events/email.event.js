const { QueueEvents } = require('bullmq');
const connection = require('../config/redis.js');

if (process.env.REDIS_TLS === 'true') {
    connection.options.tls = {};
}

const emailEvents = new QueueEvents('customer-email', {
    connection,
});

emailEvents.on('waiting', ({ jobId }) => {
    console.log(`Email Job waiting: ${jobId}`);
});

emailEvents.on('active', ({ jobId }) => {
    console.log(`Email Job active: ${jobId}`);
});

emailEvents.on('completed', ({ jobId, returnvalue }) => {
    console.log(`Email Job completed: ${jobId}`);
    console.log('Result:', returnvalue);
});

emailEvents.on('failed', ({ jobId, failedReason }) => {
    console.log(`Email Job failed: ${jobId}`);
    console.log('Reason:', failedReason);
});

emailEvents.on('delayed', ({ jobId }) => {
    console.log(`Email Job delayed: ${jobId}`);
});

emailEvents.on('error', (error) => {
    console.error('Queue Events error:', error);
});