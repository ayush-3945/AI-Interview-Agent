const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('VITE_API_URL is not configured.');
}

/**
 * Generate interview questions.
 */
export async function generateQuestions({
  role,
  difficulty,
  interviewType,
  questionCount,
}) {
  // Normalize role whether the caller passes:
  // "Product Manager"
  // or { title: "Product Manager", ... }
  const roleName =
    typeof role === 'string'
      ? role
      : role?.title || role?.name || '';

  if (!roleName) {
    throw new Error('Interview role is missing.');
  }

  const response = await fetch(
    `${API_URL}/api/interview/generate`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        role: roleName,
        difficulty,
        interviewType,
        questionCount,
      }),
    }
  );

  let payload = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message =
      payload?.error ||
      payload?.message ||
      'Unable to generate a new interview right now.';

    throw new Error(message);
  }

  if (
    !payload ||
    !Array.isArray(payload.questions)
  ) {
    throw new Error(
      'Unable to generate a new interview right now.'
    );
  }

  return payload.questions;
}

/**
 * Evaluate the candidate's answer using the backend.
 */
export async function evaluateAnswer({
  role,
  difficulty,
  question,
  answer,
}) {
  if (!question || !question.trim()) {
    throw new Error(
      'Interview question is missing.'
    );
  }

  if (!answer || !answer.trim()) {
    throw new Error(
      'Please provide an answer before submitting.'
    );
  }

  const roleName =
    typeof role === 'string'
      ? role
      : role?.title || role?.name || '';

  if (!roleName) {
    throw new Error('Interview role is missing.');
  }

  const response = await fetch(
    `${API_URL}/api/interview/evaluate`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        role: roleName,
        difficulty,
        question,
        answer,
      }),
    }
  );

  let payload = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message =
      payload?.error ||
      payload?.message ||
      'Unable to evaluate your answer right now.';

    throw new Error(message);
  }

  if (!payload?.evaluation) {
    throw new Error(
      'The interview evaluation response was invalid.'
    );
  }

  return payload.evaluation;
}

/**
 * Calculate the final interview summary
 * from all individual evaluations.
 */
export function calculateFinalSummary({
  role,
  difficulty,
  questions,
  evaluations,
}) {
  const totalQuestions = questions.length;

  const completed = evaluations.filter(Boolean);

  const divisor = Math.max(
    1,
    completed.length
  );

  const average = (key) =>
    Math.round(
      completed.reduce(
        (sum, item) =>
          sum + (Number(item?.[key]) || 0),
        0
      ) / divisor
    );

  const breakdown = {
    technicalKnowledge:
      average('technicalAccuracy'),

    communication:
      average('communication'),

    problemSolving:
      average('depth'),

    answerRelevance:
      average('relevance'),

    completeness:
      average('completeness'),
  };

  const overallScore =
    completed.length > 0
      ? Math.round(
          completed.reduce(
            (sum, item) =>
              sum + (Number(item?.score) || 0),
            0
          ) / completed.length
        )
      : 0;

  const strengths = Array.from(
    new Set(
      completed
        .flatMap((item) =>
          Array.isArray(item?.strengths)
            ? item.strengths
            : []
        )
        .filter(Boolean)
    )
  ).slice(0, 5);

  const improvements = Array.from(
    new Set(
      completed
        .flatMap((item) =>
          Array.isArray(item?.improvements)
            ? item.improvements
            : []
        )
        .filter(Boolean)
    )
  ).slice(0, 5);

  const suggestions = completed
    .map((item) => item?.suggestion)
    .filter(Boolean);

  const roleName =
    typeof role === 'string'
      ? role
      : role?.title ||
        role?.name ||
        'Interview';

  return {
    role: roleName,

    difficulty,

    totalQuestions,

    overallScore: Math.max(
      0,
      Math.min(100, overallScore)
    ),

    breakdown,

    strengths:
      strengths.length > 0
        ? strengths
        : [
            'Good technical fundamentals',
            'Clear explanations',
            'Strong problem-solving approach',
          ],

    areasToImprove:
      improvements.length > 0
        ? improvements
        : [
            'Add more detail',
            'Tighten answer structure',
            'Use stronger examples',
          ],

    recommendation:
      suggestions[0] ||
      (overallScore >= 80
        ? 'Keep pushing on advanced scenarios and practice concise, high-signal answers.'
        : 'Focus on clearer structure and more role-specific detail in your answers.'),
  };
}