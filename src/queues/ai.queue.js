const {Queue}  = require('bullmq')
const connection = require('../config/redis.js')

const aiQueue = new Queue('customer-ai',{connection})

module.exports = aiQueue