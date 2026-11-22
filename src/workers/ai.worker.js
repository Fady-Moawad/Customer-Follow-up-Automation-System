require('dotenv').config();

const { Worker } = require('bullmq');
const connection = require('../config/redis');

const aiWorker = new Worker(
    'customer-ai',
    async (job) => {
        console.log(`Started AI Job: ${job.id}`);

        const { message } = job.data;

        // Simulate AI processing
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const result = {
            status: 'AI analysis completed',
            originalMessage: message,
            sentiment: 'positive', // Temporary mock result
        };

        console.log(`Finished AI Job: ${job.id}`);

        return result;
    },
    {
        connection,
        concurrency: 2,
    }
);

aiWorker.on('completed', (job) => {
    console.log('AI Job completed:', job.id);
});

aiWorker.on('failed', (job, error) => {
    console.log('AI Job failed:', job?.id, error.message);
});

aiWorker.on('error', (error) => {
    console.error('AI Worker error:', error);
});