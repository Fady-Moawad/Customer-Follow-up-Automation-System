const { Queue } = require('bullmq');
const connection = require('../config/redis.js')

const emailQueue = new Queue('customer-email',{connection})

module.exports = emailQueue