require('dotenv').config();
const sendEmail = require('./emailService')

const { Worker } = require('bullmq');
const IORedis = require('ioredis');

const connectionOptions = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME || 'default',
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
};
const connection = new IORedis(connectionOptions);

const worker = new Worker('customer-followup', async (job) => {
    console.log('Processing Job:', job.id);
    const { customerName, email, message } = job.data;
    const messageId = await sendEmail(email,
        `Hello ${customerName}`,
        message)
    return {
        customerName,
        email,
        status: 'email sent',
        messageId,
    };
},
    { connection }
);

// console.log('-----------------------');
// console.log('Processing Job:', job.id);

// // 
// console.log('attempt',job.attemptsMade+1);
// if (job.attemptsMade > 2) {
//     throw new Error('Temporary processing failure');
// }
//  throw new Error('fail');

// const { customerName, message } = job.data;

// console.log('Customer:', customerName);
// console.log('Message:', message);
// // Simulate background processing
// await new Promise((resolve) => setTimeout(resolve, 3000));

// const result = {
//     customerName,
//     status: 'processed',
//     messageLength: message.length,
// };

// console.log('Job Completed:', result);

// return result;
worker.on('active', (job) => {
    console.log('Job is active:', job.id);
});

worker.on('completed', (job) => {
    console.log('Job completed:', job.id);
});

worker.on('failed', (job, error) => {
    console.log('Job failed:', job.id);
    console.log('Reason:', error.message);
});

worker.on('error', (error) => {
    console.error('Worker error:', error);
});