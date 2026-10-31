# Customer Follow-up Queue System

A background job processing system built with Node.js, Express, BullMQ, Redis, and Nodemailer, designed to automate customer follow-ups and prepare for AI-powered message analysis.

## Project Structure

```text
customer-followup-queue/
│
├── src/
│   ├── config/
│   │   └── redis.js               # Redis database connection configuration
│   │
│   ├── queues/
│   │   └── customer.queue.js       # Core queue definition & job producers
│   │
│   ├── workers/
│   │   └── customer.worker.js      # Background consumer to process queue jobs
│   │
│   ├── services/
│   │   └── email.service.js        # Direct integration with SMTP/Email providers
│   │
│   ├── routes/
│   │   └── customer.routes.js      # REST API route declarations
│   │
│   ├── controllers/
│   │   └── customer.controller.js  # Request handlers pushing jobs to the queue
│   │
│   └── app.js                      # Express application entrypoint
│
├── .env.example                    # Sample environment variables template
├── .gitignore                      # Git ignored files configuration
├── package.json                    # Project dependencies and script runner
├── package-lock.json               # Locked dependency tree specification
└── README.md                       # Project documentation
```

## Architecture Flow

```text
[ Client ] ──( HTTP POST )──> [ Controller ] ──( Add Job )──> [ Redis Queue ]
                                                                     │
                                                               ( Polls Job )
                                                                     ▼
[ Client ] <──( 202 Accepted )─ [ Response ]                  [ Worker Process ]
                                                                     │
                                                              ( Triggers Mail )
                                                                     ▼
                                                              [ Email Service ]
```

## Features

- REST API using Express.js
- Background job processing using BullMQ
- Redis integration
- Email notifications using Nodemailer
- Automatic retries with exponential backoff
- Job status tracking
- Job retention configuration

## Tech Stack

- Node.js
- Express.js
- BullMQ
- Redis
- ioredis
- Nodemailer

## Architecture

The Express API acts as a Producer and adds jobs
to a BullMQ queue.

Redis stores job data and state.

A separate Worker consumes jobs and executes
the required background tasks.

## Getting Started

### 1. Install dependencies

npm install

### 2. Configure environment variables

Copy .env.example to .env and update the values.

### 3. Start Redis

Run a local Redis instance.

### 4. Start the API

npm start

### 5. Start the Worker

npm run worker

## Future Improvements

- Delayed jobs
- Worker concurrency
- Multiple queues
- AI-powered customer message analysis
- LangChain integration
- Automated customer follow-up recommendations