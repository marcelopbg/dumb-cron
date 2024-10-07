import { get } from 'axios';
import { schedule } from 'node-cron';

require('dotenv').config();

const BASE_URL = process.env.BASE_URL;
const CRON_SCHEDULE = process.env.CRON_SCHEDULE || '*/5 * * * *'; // Default to every 5 minutes


// Function to hit the /health endpoint
const hitHealthEndpoint = async () => {
  try {
    const response = await get(`${BASE_URL}/health`);
    console.log(`Health check successful: ${response.data}`);
  } catch (error) {
    console.error(`Error hitting health endpoint: ${error.message}`);
  }
};

// Schedule the job using cron
schedule(CRON_SCHEDULE, () => {
  console.log(`Running scheduled health check at ${new Date().toISOString()}`);
  hitHealthEndpoint();
});