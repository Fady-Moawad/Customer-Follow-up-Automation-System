require('dotenv').config();
const express = require('express');
const app = express();
const emailQueue = require('../src/queues/email.queue.js');
const aiQueue = require('../src/queues/ai.queue.js');
app.use(express.json());

// Add a new Job
app.post('/customers/process', async (req, res) => {
    try {
        const { customerName, email, message } = req.body;

        if (!customerName || !email || !message) {
            return res.status(400).json({
                message: 'Customer name, email and message are required',
            });
        }


        const job =await emailQueue.add('send-email', {
            customerName,
            email,
            message
        },{
            attempts:3,
          delay:10*1000,
            backoff:{
                type:'exponential',
                delay:2000
            },
            removeOnComplete:100,
            removeOnFail:500
        }
        
    )

    console.log(job.id);
    
        return res.status(202).json({
            message: 'Email job has been queued',
            jobId: job.id,
            // delay:'10 second',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to add job',
        });
    }
});

app.post('/ai/analyze', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                message: 'Message is required',
            });
        }

        const job = await aiQueue.add(
            'analyze-message',
            { message },
            {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 2000,
                },
                removeOnComplete: 100,
                removeOnFail: 500,
            }
        );

        return res.status(202).json({
            message: 'AI analysis job has been queued',
            jobId: job.id,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to queue AI job',
        });
    }
});

// Get Job Status
app.get('/jobs/:jobId', async (req, res) => {
    try {
        const job = await callQueue.getJob(req.params.jobId);


        if (!job) {
            return res.status(404).json({
                message: 'Job not found',
            });
        }

        const state = await job.getState();

        return res.status(200).json({
            jobId: job.id,
            name: job.name,
            state,
            data: job.data,
            result: job.returnvalue,
            failedReason: job.failedReason,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Failed to get job status',
        });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000');
});