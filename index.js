const axios = require('axios');
const cron = require('node-cron');
const express = require('express');
require('dotenv').config();

const app = express();


const BASE_URL = process.env.BASE_URL;
const CRON_SCHEDULE = process.env.CRON_SCHEDULE || '*/5 * * * *'; // Default to every 5 minutes

// Function to hit the /health endpoint
const hitHealthEndpoint = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/health`);
    console.log(`Health check successful: ${response.data}`);
  } catch (error) {
    console.error(`Error hitting health endpoint: ${error.message}`);
  }
};

// Schedule the job using cron
cron.schedule(CRON_SCHEDULE, () => {
  console.log(`Running scheduled health check at ${new Date().toISOString()}`);
  hitHealthEndpoint();
});


app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000, () => {
    console.log(`Server running on port 3000. Scheduled to hit ${BASE_URL}/health every 5 seconds.`);
  });