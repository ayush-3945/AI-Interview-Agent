# AI Usage Log — Interview Agent

## AI Tools Used

- ChatGPT
- GitHub Copilot

## How AI Was Used

AI was used during development for:
- Debugging frontend and backend issues
- Designing the interview flow
- Integrating the AI question-generation API
- Integrating answer evaluation
- Implementing browser speech features
- Improving the interview UI
- Deployment troubleshooting
- Documentation

## Development Prompts

### Interview Generation

I asked AI for help building an API flow where the user selects:
- Role
- Difficulty
- Interview type
- Number of questions

and the backend generates interview questions.

### API Integration

I asked AI to help connect the React frontend with the Express backend using:

`POST /api/interview/generate`

and

`POST /api/interview/evaluate`

### Voice Interviewer

I asked AI how to modify the interview experience so that the interviewer speaks the question aloud using browser speech synthesis instead of requiring the candidate to read the question.

### Speech Recognition

I asked AI for help implementing voice input so candidates can answer interview questions using their microphone.

### AI Evaluation

I asked AI to help structure the evaluation of candidate answers using metrics such as:
- Technical accuracy
- Communication
- Relevance
- Depth
- Completeness
- Overall score

### Deployment

I used AI assistance to troubleshoot deployment issues involving:
- Vercel
- Render
- Environment variables
- API URL configuration
- Groq API configuration

### Debugging

AI was also used to identify and fix bugs involving interview generation, answer submission, API communication, and role-specific interview behavior.

## Note

AI was used as a development assistant. The project was implemented, tested, configured, and deployed by the project developer.
