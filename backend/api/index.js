import { createApp } from "../src/app.js";

// Export the Express app as a serverless function for Vercel
const app = createApp();

export default app;
