const roleProfiles = {
  'Software Engineer': {
    category: 'technical',
    topics: [
      'algorithms',
      'debugging',
      'system design',
      'testing',
      'APIs',
      'architecture',
      'scalability',
    ],
  },

  'Frontend Developer': {
    category: 'technical',
    topics: [
      'React state management',
      'component architecture',
      'accessibility',
      'performance',
      'UX',
      'rendering',
    ],
  },

  'Backend Developer': {
    category: 'technical',
    topics: [
      'REST APIs',
      'authentication',
      'databases',
      'caching',
      'concurrency',
      'security',
      'performance',
    ],
  },

  'Full Stack Developer': {
    category: 'technical',
    topics: [
      'API integration',
      'state management',
      'deployment',
      'authentication',
      'databases',
      'scalability',
    ],
  },

  'Data Analyst': {
    category: 'technical',
    topics: [
      'SQL',
      'dashboards',
      'trend analysis',
      'data quality',
      'visualization',
      'stakeholders',
    ],
  },

  'Data Scientist': {
    category: 'technical',
    topics: [
      'statistics',
      'feature engineering',
      'model evaluation',
      'experimentation',
      'Python',
      'metrics',
    ],
  },

  'Machine Learning Engineer': {
    category: 'technical',
    topics: [
      'model deployment',
      'monitoring',
      'feature pipelines',
      'ML ops',
      'latency',
      'optimization',
    ],
  },

  'DevOps Engineer': {
    category: 'technical',
    topics: [
      'CI/CD',
      'containers',
      'observability',
      'automation',
      'cloud',
      'reliability',
    ],
  },

  'QA Engineer': {
    category: 'technical',
    topics: [
      'test strategy',
      'automation',
      'regression testing',
      'edge cases',
      'quality',
      'coverage',
    ],
  },

  'Cybersecurity Analyst': {
    category: 'technical',
    topics: [
      'threat modeling',
      'incident response',
      'security controls',
      'risk mitigation',
      'authentication',
      'logging',
    ],
  },

  'UI/UX Designer': {
    category: 'non-technical',
    topics: [
      'user research',
      'interaction design',
      'design systems',
      'prototyping',
      'feedback',
      'accessibility',
    ],
  },

  'Graphic Designer': {
    category: 'non-technical',
    topics: [
      'visual hierarchy',
      'brand consistency',
      'creative direction',
      'typography',
      'layout',
      'identity',
    ],
  },

  'Product Manager': {
    category: 'non-technical',
    topics: [
      'strategy',
      'prioritization',
      'stakeholders',
      'metrics',
      'tradeoffs',
      'roadmaps',
    ],
  },

  'Business Analyst': {
    category: 'non-technical',
    topics: [
      'requirements gathering',
      'process mapping',
      'gap analysis',
      'documentation',
      'stakeholders',
      'workflows',
    ],
  },

  HR: {
    category: 'non-technical',
    topics: [
      'behavioral interviewing',
      'employee experience',
      'policy',
      'conflict resolution',
      'people ops',
      'communication',
    ],
  },
};

const difficultyGuidance = {
  Beginner:
    'Focus on fundamentals, clear definitions, and simple examples.',

  Intermediate:
    'Focus on practical scenarios, implementation tradeoffs, and applied judgment.',

  Advanced:
    'Focus on architecture, scale, tradeoffs, risk, and production-level thinking.',
};

const interviewTypeGuidance = {
  Technical:
    'Ask mostly technical questions, with practical depth where appropriate.',

  Behavioral:
    'Ask questions that explore collaboration, communication, ownership, and decision making.',

  Mixed:
    'Mix conceptual, practical, scenario-based, and behavioral questions so the interview feels realistic.',
};

const stripCodeFences = (value) =>
  String(value)
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

const clampScore = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(100, Math.round(number))
  );
};

const normalizeStringList = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) =>
      String(item || '').trim()
    )
    .filter(Boolean)
    .slice(0, 5);
};

/*
|--------------------------------------------------------------------------
| GROQ HELPER
|--------------------------------------------------------------------------
*/

async function callGroq(prompt, systemMessage) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Groq API key is missing.'
    );
  }

  const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },

      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',

        messages: [
          {
            role: 'system',
            content: systemMessage,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],

        temperature: 0.4,

        max_completion_tokens: 3000,

        response_format: {
          type: 'json_object',
        },
      }),
    }
  );

  const raw = await response.text();

  console.log(
    'Groq status:',
    response.status
  );

  if (!response.ok) {
    console.error(
      'Groq API error:',
      raw
    );

    throw new Error(
      `Groq API error (${response.status}): ${raw}`
    );
  }

  let payload;

  try {
    payload = JSON.parse(raw);
  } catch {
    throw new Error(
      'Groq returned invalid API JSON.'
    );
  }

  const text =
    payload?.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error(
      'Groq returned an empty response.'
    );
  }

  try {
    return JSON.parse(
      stripCodeFences(text)
    );
  } catch {
    console.error(
      'Invalid JSON from Groq:',
      text
    );

    throw new Error(
      'Groq returned invalid JSON.'
    );
  }
}

/*
|--------------------------------------------------------------------------
| QUESTION GENERATION
|--------------------------------------------------------------------------
*/

const buildQuestionPrompt = ({
  role,
  difficulty,
  interviewType,
  questionCount,
}) => {
  const profile =
    roleProfiles[role] || {
      category: 'technical',
      topics: [
        'core concepts',
        'practical scenarios',
        'tradeoffs',
      ],
    };

  return `
Generate exactly ${questionCount} unique interview questions for a ${role} interview.

Difficulty: ${difficulty}
Interview type: ${interviewType}
Role category: ${profile.category}

Relevant topic areas:
${profile.topics.join(', ')}

Difficulty guidance:
${
  difficultyGuidance[difficulty] ||
  difficultyGuidance.Intermediate
}

Interview guidance:
${
  interviewTypeGuidance[interviewType] ||
  interviewTypeGuidance.Mixed
}

Requirements:
- Questions must be relevant to ${role}.
- Match ${difficulty} difficulty.
- Cover different topic areas.
- Do not repeat questions.
- Do not simply reword another question.
- Avoid generic filler questions.
- Questions should resemble realistic interviews.
- Return exactly ${questionCount} questions.
- Return ONLY valid JSON.

Return:

{
  "questions": [
    {
      "id": "q1",
      "question": "...",
      "topic": "...",
      "type": "technical|behavioral|mixed",
      "difficulty": "${difficulty}"
    }
  ]
}
`;
};

const normalizeQuestion = (
  question,
  index,
  role,
  difficulty
) => {
  if (
    !question ||
    typeof question.question !== 'string' ||
    !question.question.trim()
  ) {
    throw new Error(
      'Groq returned an invalid question.'
    );
  }

  const type =
    String(
      question.type || 'mixed'
    ).toLowerCase();

  return {
    id:
      question.id ||
      `q${index + 1}`,

    question:
      question.question.trim(),

    topic:
      String(
        question.topic || 'General'
      ).trim(),

    type: [
      'technical',
      'behavioral',
      'mixed',
    ].includes(type)
      ? type
      : 'mixed',

    difficulty,
    role,
  };
};

const validateQuestions = ({
  questions,
  role,
  difficulty,
  questionCount,
}) => {
  if (!Array.isArray(questions)) {
    throw new Error(
      'Groq response did not contain a questions array.'
    );
  }

  if (
    questions.length !== questionCount
  ) {
    throw new Error(
      `Groq returned ${questions.length} questions instead of ${questionCount}.`
    );
  }

  const seen = new Set();

  return questions.map(
    (item, index) => {
      const normalized =
        normalizeQuestion(
          item,
          index,
          role,
          difficulty
        );

      const key =
        normalized.question
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .trim();

      if (seen.has(key)) {
        throw new Error(
          'Groq returned duplicate questions.'
        );
      }

      seen.add(key);

      return normalized;
    }
  );
};

export async function generateInterviewQuestions({
  role,
  difficulty,
  interviewType,
  questionCount,
}) {
  const prompt =
    buildQuestionPrompt({
      role,
      difficulty,
      interviewType,
      questionCount,
    });

  const parsed =
    await callGroq(
      prompt,
      'You are an expert interview-question generator. Return only valid JSON.'
    );

  return validateQuestions({
    questions:
      parsed.questions,
    role,
    difficulty,
    questionCount,
  });
};

/*
|--------------------------------------------------------------------------
| ANSWER EVALUATION
|--------------------------------------------------------------------------
*/

const buildEvaluationPrompt = ({
  role,
  difficulty,
  question,
  answer,
}) => `
Evaluate this candidate's interview answer.

Role:
${role}

Difficulty:
${difficulty}

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer fairly and realistically.

Consider:
- Technical correctness
- Relevance
- Clarity
- Depth
- Communication
- Completeness
- Problem solving

Return ONLY valid JSON in this exact structure:

{
  "score": 0,
  "technicalAccuracy": 0,
  "relevance": 0,
  "clarity": 0,
  "depth": 0,
  "communication": 0,
  "completeness": 0,
  "strengths": [],
  "improvements": [],
  "suggestion": "",
  "idealAnswer": ""
}

Rules:
- Every score must be an integer from 0 to 100.
- score is the overall answer score.
- strengths must contain 2-4 specific points.
- improvements must contain 2-4 actionable points.
- suggestion must be personalized to this answer.
- idealAnswer should be a strong example answer.
- Do not invent claims about the candidate.
- Return JSON only.
`;

export async function evaluateInterviewAnswer({
  role,
  difficulty,
  question,
  answer,
}) {
  if (!question?.trim()) {
    throw new Error(
      'Interview question is missing.'
    );
  }

  if (!answer?.trim()) {
    throw new Error(
      'Candidate answer is missing.'
    );
  }

  const prompt =
    buildEvaluationPrompt({
      role,
      difficulty,
      question,
      answer,
    });

  const evaluation =
    await callGroq(
      prompt,
      'You are an expert technical interviewer evaluating candidate answers. Return only valid JSON.'
    );

  return {
    score: clampScore(
      evaluation.score
    ),

    technicalAccuracy:
      clampScore(
        evaluation.technicalAccuracy
      ),

    relevance:
      clampScore(
        evaluation.relevance
      ),

    clarity:
      clampScore(
        evaluation.clarity
      ),

    depth:
      clampScore(
        evaluation.depth
      ),

    communication:
      clampScore(
        evaluation.communication
      ),

    completeness:
      clampScore(
        evaluation.completeness
      ),

    strengths:
      normalizeStringList(
        evaluation.strengths
      ),

    improvements:
      normalizeStringList(
        evaluation.improvements
      ),

    suggestion:
      String(
        evaluation.suggestion || ''
      ).trim(),

    idealAnswer:
      String(
        evaluation.idealAnswer || ''
      ).trim(),
  };
}