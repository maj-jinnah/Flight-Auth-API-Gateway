const cron = require('node-cron');

function startCronJob() {
    cron.schedule('*/15 * * * *', () => { // Runs every 15 minutes
    console.log('Running cron job...');
});
}

module.exports = startCronJob;