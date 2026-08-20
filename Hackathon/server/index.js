import "dotenv/config";

console.log(
  "Gemini key loaded:",
  Boolean(process.env.GEMINI_API_KEY)
);


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import interviewRouter from './routes/interview.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api/interview', interviewRouter);

app.use((error, _request, response, _next) => {
  const status = error.status || 500;
  response.status(status).json({
    error: error.message || 'Server error',
  });
});

app.listen(port, () => {
  console.log(`Interview Agent server listening on http://localhost:${port}`);
});