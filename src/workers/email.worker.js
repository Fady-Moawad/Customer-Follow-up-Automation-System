const { Worker } = require('bullmq');
const connection = require('../config/redis');
const sendEmail = require('../services/emailService');
                                // name queue
const emailWorker = new Worker('customer-email',
    async (job) => {
        console.log(`Started Email Job: ${job.id}`);

        const { customerName, email, message } = job.data;

        const messageId = await sendEmail(
            email,
            `Hello ${customerName}`,
            message
        );

        console.log(`Finished Email Job: ${job.id}`);

        return {
            customerName,
            email,
            status: 'email sent',
            messageId,
        };
    },{
        connection,
        concurrency:3
    }
)

emailWorker.on('active', (job) => {
    console.log('Email Job active:', job.id);
});

emailWorker.on('completed', (job) => {
    console.log('Email Job completed:', job.id);
});

emailWorker.on('failed', (job, error) => {
    console.log('Email Job failed:', job?.id);
    console.log('Reason:', error.message);
});

emailWorker.on('error', (error) => {
    console.error('Email Worker error:', error);
});