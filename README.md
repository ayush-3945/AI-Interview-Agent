# AI Interview Agent

An AI-powered mock interview platform that simulates a real interview experience. Users can choose a job role and difficulty, receive AI-generated interview questions, answer them using text or voice input, and receive AI-powered feedback and a final performance summary.

**Live Demo:** https://interview-agent-lrak.vercel.app/

## Preview

### Home


<img width="1908" height="852" alt="home" src="https://github.com/user-attachments/assets/682b7178-b1a9-4565-af6b-441d421dc7a9" />

### Role Selection

<img width="1917" height="847" alt="Screenshot 2026-08-09 105753" src="https://github.com/user-attachments/assets/a2572a2e-1ef8-4df2-890c-4aa4b6cc56d9" />



### AI Interviewer

<img width="1701" height="772" alt="Screenshot 2026-08-09 111452" src="https://github.com/user-attachments/assets/7ad2c094-9712-4e38-a908-9a2d51dc3e8d" />


### Answer Evaluation

<img width="1542" height="748" alt="Screenshot 2026-08-09 111626" src="https://github.com/user-attachments/assets/4344a4b1-32d1-44b4-b884-ea7d4a012021" />


### Difficulty Selection
<img width="1898" height="850" alt="Screenshot 2026-08-09 105828" src="https://github.com/user-attachments/assets/edf34491-ff3a-4f73-8d75-fe32055160f6" />
## Features



- Role-based interviews for technical and non-technical roles
- Difficulty selection
- AI-generated, role-specific interview questions
- Voice-based AI interviewer using browser speech synthesis
- Hidden question mode with an animated AI interviewer indicator
- Text and voice answers
- AI-powered answer evaluation
- Per-question feedback
- Final interview score and performance summary
- Interview timer and progress tracking
- Previous/Next question navigation
- Interview history
- Responsive UI
- Vercel + Render deployment

## How It Works

```text
User selects Role + Difficulty
            |
            v
    React + Vite Frontend
            |
            | POST /api/interview/generate
            v
     Express Backend (Render)
            |
            v
         Groq API
            |
            v
    Generated Questions
            |
            v
       AI Interviewer
       /            \
  Speaks question   Candidate answers
                         |
                         v
                 POST /api/interview/evaluate
                         |
                         v
                    AI Feedback
                         |
                         v
                 Final Summary
```

### Interview Flow

1. Select a role.
2. Select difficulty.
3. Configure the interview.
4. Generate interview questions.
5. The AI interviewer speaks each question.
6. The candidate answers using text or voice.
7. Submit the answer.
8. The backend evaluates the response.
9. Continue through the interview.
10. Receive a final performance summary.

## Supported Roles

### Technical

- Software Engineer
- Frontend Developer
- Backend Developer
- Full Stack Developer
- Data Analyst
- Data Scientist
- Machine Learning Engineer
- DevOps Engineer
- QA Engineer
- Cybersecurity Analyst

### Non-Technical

- UI/UX Designer
- Graphic Designer
- Product Manager
- Business Analyst
- HR

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Browser Web Speech APIs

### Backend

- Node.js
- Express.js
- Groq API

### Deployment

- Vercel — frontend
- Render — backend

## Project Structure

```text
Interview-Agent/
|
├── Hackathon/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── data/
│   │   └── App.jsx
│   └── ...
|
└── README.md
```

## Environment Variables

### Frontend

Create `Hackathon/.env`:

```env
VITE_API_URL=http://localhost:5000
```

For production:

```env
VITE_API_URL=https://your-render-backend.onrender.com
```

### Backend

Configure the Groq API key on the backend:

```env
GROQ_API_KEY=your_groq_api_key
```

**Never expose or commit the Groq API key to GitHub.** The key should remain on the backend.

## Local Development

### 1. Clone the repository

```bash
git clone <(https://github.com/Anjali56-creator/Interview-Agent.git)>
cd Interview-Agent
```

### 2. Install frontend dependencies

```bash
cd Hackathon
npm install
```

### 3. Configure the frontend

Create:

```text
Hackathon/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Start the frontend

```bash
npm run dev
```

### 5. Start the backend

Open another terminal, navigate to the backend directory, install dependencies, configure `GROQ_API_KEY`, and run the backend using the start script defined in its `package.json`.

## API Flow

### Generate Interview Questions

```http
POST /api/interview/generate
```

Example request:

```json
{
  "role": "Software Engineer",
  "difficulty": "Intermediate",
  "interviewType": "Mixed",
  "questionCount": 10
}
```

### Evaluate an Answer

```http
POST /api/interview/evaluate
```

Example request:

```json
{
  "role": "Software Engineer",
  "difficulty": "Intermediate",
  "question": "Explain REST APIs.",
  "answer": "..."
}
```

## Voice Interview Experience

The application uses browser speech capabilities to make interviews more interactive.

### AI Interviewer

Generated questions are spoken using the browser's Speech Synthesis API.

The interface provides:

- Speaking state
- Animated interviewer indicator
- Replay control
- Stop control

### Candidate Voice Input

Candidates can also use speech recognition to provide answers where browser support is available.

> Voice functionality depends on browser and operating-system support for the Web Speech APIs.

## AI Evaluation

After an answer is submitted, the backend sends the response for AI evaluation.

The evaluation contributes to:

- Technical accuracy
- Communication
- Problem-solving depth
- Answer relevance
- Completeness
- Overall score
- Strengths
- Areas for improvement
- Recommendations

The final summary aggregates the available question-level evaluations.

## Deployment

### Frontend — Vercel

The React/Vite frontend is deployed on Vercel.

Production variable:

```env
VITE_API_URL=https://your-render-backend.onrender.com
```

### Backend — Render

The Express backend is deployed on Render.

Production secret:

```env
GROQ_API_KEY=your_groq_api_key
```

After changing backend environment variables, redeploy the Render service so the running process receives the updated configuration.

## Why This Project?

Traditional interview practice often relies on static question lists. This project makes practice more interactive by combining:

- Role-specific question generation
- AI-powered evaluation
- Voice interaction
- Interview timing
- Progress tracking
- Performance summaries

The goal is to simulate the structure of an actual interview rather than simply presenting a quiz.

## Future Improvements

- Real-time conversational follow-up questions
- More natural AI interviewer voices
- Interviewer personality selection
- Resume-based interview generation
- Company-specific interview modes
- Adaptive difficulty based on previous answers
- Real-time speaking analysis
- Interview analytics dashboard
- Authentication and user profiles
- Persistent cloud-based user data

## Security Notes

- Keep `GROQ_API_KEY` on the backend.
- Never commit `.env` files containing secrets.
- Use environment variables for production secrets.
- If an API key is accidentally exposed, revoke and rotate it immediately.
- Enable GitHub secret scanning and push protection where appropriate.

## Contributing

Contributions and improvements are welcome.

```bash
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

Then open a pull request.

## License

Add a license to the repository if you plan to distribute the project as open source.

## Author

**Anjali Kumari**

Built as an AI-powered interview practice platform combining modern frontend development, backend APIs, generative AI, and browser voice capabilities.
