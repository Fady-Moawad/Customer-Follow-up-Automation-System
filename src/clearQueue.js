// const { callQueue, connection } = require('./queue');

async function clearQueue() {
    try {
        await callQueue.obliterate({ force: true });

        console.log('Queue cleared successfully');
    } catch (error) {
        console.error('Failed to clear queue:', error);
    } finally {
        await callQueue.close();
        await connection.quit();
    }
}

clearQueue();