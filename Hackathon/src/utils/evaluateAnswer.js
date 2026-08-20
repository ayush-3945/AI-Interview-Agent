const normalize = (value = '') => value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');

const countMatches = (answer, keywords) => {
  const text = normalize(answer);
  return keywords.reduce((count, keyword) => (text.includes(normalize(keyword)) ? count + 1 : count), 0);
};

export default function evaluateAnswer({ answer, question, role, difficulty, expectedKeywords = [], topic = '' }) {
  const normalizedAnswer = normalize(answer);
  const words = normalizedAnswer.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const keywords = Array.from(new Set([...expectedKeywords, ...(role.skills || []), ...(role.questionTopics || [])]));
  const keywordMatches = countMatches(answer, keywords);
  const topicMatches = [topic, question.topic, question.question]
    .filter(Boolean)
    .reduce((count, item) => (normalizedAnswer.includes(normalize(item)) ? count + 1 : count), 0);

  const relevance = Math.min(100, Math.round(35 + topicMatches * 18 + keywordMatches * 5));
  const accuracy = Math.min(100, Math.round(30 + keywordMatches * 12 + (difficulty === 'Advanced' ? 6 : difficulty === 'Intermediate' ? 3 : 0)));
  const completeness = Math.min(100, Math.round(20 + wordCount * 1.8 + (normalizedAnswer.includes('for example') ? 10 : 0) + (normalizedAnswer.includes('first') ? 6 : 0)));
  const communication = Math.min(100, Math.round(28 + (answer.includes('.') ? 10 : 0) + (answer.includes('because') ? 12 : 0) + (answer.includes('example') ? 8 : 0) + Math.min(20, wordCount)));

  const score = Math.round((relevance * 0.3) + (accuracy * 0.3) + (completeness * 0.2) + (communication * 0.2));

  const strengths = [];
  const improvements = [];

  if (keywordMatches >= 3) strengths.push('Uses role-specific concepts clearly');
  else improvements.push('Include more role-specific terminology');

  if (completeness >= 70) strengths.push('Provides enough detail to feel complete');
  else improvements.push('Add a little more depth and structure');

  if (communication >= 70) strengths.push('Communicates the answer in a clear way');
  else improvements.push('Make the answer easier to follow');

  if (relevance >= 70) strengths.push('Stays on topic and answers the question directly');
  else improvements.push('Tie the answer more explicitly to the prompt');

  const feedback = score >= 80
    ? 'Strong answer with clear structure and good role alignment.'
    : score >= 60
      ? 'Solid foundation, but the response would benefit from more detail and sharper examples.'
      : 'The answer needs more role-specific depth, clearer structure, and stronger examples.';

  return {
    score,
    relevance,
    accuracy,
    completeness,
    communication,
    strengths,
    improvements,
    feedback,
    answerQuality: score,
    technicalAccuracy: accuracy,
    confidence: Math.max(40, Math.min(100, communication + (answer.includes('I would') ? 8 : 0))),
    notes: [
      wordCount >= 40 ? 'Good answer length' : 'Could use more detail',
      keywordMatches > 1 ? 'Relevant keywords detected' : 'Add more role-specific keywords',
      answer.includes('for example') ? 'Includes an example' : 'Would benefit from an example',
    ],
  };
}
