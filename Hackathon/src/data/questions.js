import { roles } from './roles.js';

const difficultyOrder = ['Beginner', 'Intermediate', 'Advanced'];

const roleQuestionTopics = {
  'software-engineer': {
    technical: ['algorithms', 'debugging', 'system design', 'testing'],
    behavioral: ['learning new systems', 'team collaboration', 'ownership'],
  },
  'frontend-developer': {
    technical: ['React state management', 'component architecture', 'accessibility', 'performance tuning'],
    behavioral: ['working with designers', 'balancing polish and deadlines', 'feedback handling'],
  },
  'backend-developer': {
    technical: ['REST APIs', 'authentication', 'database modeling', 'scalability'],
    behavioral: ['incident handling', 'cross-team communication', 'prioritization'],
  },
  'fullstack-developer': {
    technical: ['API integration', 'state management', 'deployment flow', 'system tradeoffs'],
    behavioral: ['switching contexts', 'end-to-end ownership', 'working with product teams'],
  },
  'data-analyst': {
    technical: ['SQL queries', 'dashboards', 'trend analysis', 'data quality'],
    behavioral: ['stakeholder communication', 'managing ambiguity', 'influencing decisions'],
  },
  'data-scientist': {
    technical: ['statistics', 'feature engineering', 'model evaluation', 'experimentation'],
    behavioral: ['explaining tradeoffs', 'working with product teams', 'setting expectations'],
  },
  'machine-learning-engineer': {
    technical: ['model deployment', 'monitoring', 'feature pipelines', 'model optimization'],
    behavioral: ['working with research teams', 'balancing speed and reliability', 'debugging failures'],
  },
  'devops-engineer': {
    technical: ['CI/CD pipelines', 'container orchestration', 'observability', 'automation'],
    behavioral: ['incident response', 'cross-team coordination', 'prioritizing reliability work'],
  },
  'qa-engineer': {
    technical: ['test strategy', 'automation', 'regression testing', 'edge cases'],
    behavioral: ['advocating for quality', 'working with engineers', 'communicating defects clearly'],
  },
  'cybersecurity-analyst': {
    technical: ['threat modeling', 'incident response', 'risk mitigation', 'security controls'],
    behavioral: ['staying calm under pressure', 'communicating risk', 'working with multiple teams'],
  },
  'ui-ux-designer': {
    behavioral: ['user research', 'interaction design', 'design systems', 'prototyping'],
  },
  'graphic-designer': {
    behavioral: ['visual hierarchy', 'brand consistency', 'creative direction', 'typography'],
  },
  'product-manager': {
    behavioral: ['product strategy', 'prioritization', 'stakeholder alignment', 'metrics'],
  },
  'business-analyst': {
    behavioral: ['requirements gathering', 'process mapping', 'gap analysis', 'documentation'],
  },
  hr: {
    behavioral: ['behavioral interviewing', 'employee experience', 'policy', 'conflict resolution'],
  },
};

const keywordMap = {
  algorithms: ['algorithm', 'complexity', 'efficiency', 'data structure'],
  debugging: ['debug', 'root cause', 'log', 'trace'],
  'system design': ['scalable', 'architecture', 'service', 'tradeoff'],
  testing: ['test', 'coverage', 'case', 'validation'],
  'React state management': ['state', 'props', 'render', 'component'],
  'component architecture': ['component', 'composition', 'reusable', 'modular'],
  accessibility: ['accessibility', 'keyboard', 'aria', 'contrast'],
  'performance tuning': ['performance', 'memo', 'render', 'bundle'],
  'REST APIs': ['rest', 'endpoint', 'request', 'response'],
  authentication: ['auth', 'token', 'session', 'authorization'],
  'database modeling': ['schema', 'table', 'relationship', 'query'],
  scalability: ['scale', 'load', 'latency', 'throughput'],
  'API integration': ['api', 'integration', 'response', 'contract'],
  'state management': ['state', 'store', 'flow', 'update'],
  'deployment flow': ['deploy', 'ci', 'release', 'pipeline'],
  'system tradeoffs': ['tradeoff', 'latency', 'cost', 'complexity'],
  'SQL queries': ['sql', 'join', 'query', 'filter'],
  dashboards: ['dashboard', 'visualization', 'report', 'metric'],
  'trend analysis': ['trend', 'pattern', 'analysis', 'insight'],
  'data quality': ['quality', 'clean', 'accuracy', 'validation'],
  statistics: ['statistic', 'distribution', 'probability', 'hypothesis'],
  'feature engineering': ['feature', 'encoding', 'transform', 'signal'],
  'model evaluation': ['precision', 'recall', 'metric', 'validation'],
  experimentation: ['experiment', 'a/b', 'hypothesis', 'control'],
  'model deployment': ['deploy', 'serving', 'latency', 'monitor'],
  monitoring: ['monitor', 'drift', 'alert', 'metrics'],
  'feature pipelines': ['pipeline', 'feature', 'orchestration', 'data flow'],
  'model optimization': ['optimize', 'latency', 'accuracy', 'compression'],
  'CI/CD pipelines': ['ci', 'cd', 'pipeline', 'automation'],
  'container orchestration': ['container', 'kubernetes', 'pod', 'orchestration'],
  observability: ['logs', 'metrics', 'tracing', 'alert'],
  automation: ['automate', 'script', 'repeatable', 'pipeline'],
  'test strategy': ['strategy', 'test', 'coverage', 'risk'],
  automation: ['automation', 'script', 'framework', 'repeatable'],
  'regression testing': ['regression', 'suite', 'verify', 'coverage'],
  'edge cases': ['edge', 'boundary', 'scenario', 'failure'],
  'threat modeling': ['threat', 'risk', 'attack', 'vector'],
  'incident response': ['incident', 'contain', 'triage', 'response'],
  'risk mitigation': ['risk', 'control', 'mitigate', 'impact'],
  'security controls': ['control', 'policy', 'encryption', 'access'],
  'user research': ['research', 'user', 'interview', 'insight'],
  'interaction design': ['interaction', 'flow', 'experience', 'prototype'],
  'design systems': ['design system', 'consistency', 'tokens', 'components'],
  prototyping: ['prototype', 'wireframe', 'iteration', 'test'],
  'visual hierarchy': ['hierarchy', 'layout', 'contrast', 'typography'],
  'brand consistency': ['brand', 'consistency', 'guideline', 'identity'],
  'creative direction': ['creative', 'direction', 'concept', 'art'],
  typography: ['type', 'font', 'spacing', 'hierarchy'],
  'product strategy': ['strategy', 'outcome', 'roadmap', 'vision'],
  prioritization: ['prioritize', 'impact', 'effort', 'tradeoff'],
  'stakeholder alignment': ['stakeholder', 'alignment', 'communication', 'buy-in'],
  metrics: ['metric', 'measure', 'success', 'data'],
  'requirements gathering': ['requirement', 'scope', 'stakeholder', 'clarify'],
  'process mapping': ['process', 'workflow', 'step', 'diagram'],
  'gap analysis': ['gap', 'current', 'future', 'analysis'],
  documentation: ['document', 'clarity', 'spec', 'detail'],
  'behavioral interviewing': ['behavioral', 'example', 'story', 'competency'],
  'employee experience': ['employee', 'experience', 'engagement', 'culture'],
  policy: ['policy', 'process', 'compliance', 'guideline'],
  'conflict resolution': ['conflict', 'resolve', 'mediation', 'balance'],
};

const technicalTemplates = {
  Beginner: (role, topic) => `What is ${topic} and why does it matter for a ${role.title} role?`,
  Intermediate: (role, topic) => `How would you apply ${topic} in a production ${role.title} scenario?`,
  Advanced: (role, topic) => `How would you scale or optimize ${topic} for a high-traffic ${role.title} system?`,
};

const behavioralTemplates = {
  Beginner: (role, topic) => `How would you describe strong ${topic} in the context of a ${role.title} role?`,
  Intermediate: (role, topic) => `Tell me about a time you used ${topic} to improve a project outcome in a ${role.title} setting.`,
  Advanced: (role, topic) => `How would you use ${topic} to lead a difficult cross-functional decision as a ${role.title}?`,
};

const typeByDifficulty = {
  Beginner: ['technical', 'behavioral', 'mixed'],
  Intermediate: ['technical', 'mixed', 'behavioral'],
  Advanced: ['technical', 'mixed', 'behavioral'],
};

const createExpectedKeywords = (topic, role) => {
  const topicKeywords = keywordMap[topic] || topic.toLowerCase().split(/\s+/);
  const roleKeywords = role.skills.flatMap((skill) => skill.toLowerCase().split(/\s+/));
  return Array.from(new Set([...topicKeywords, ...roleKeywords]));
};

const createQuestionsForRole = (role) => {
  const topics = role.questionTopics;
  const categories = roleQuestionTopics[role.id] || {};
  const roleQuestions = [];

  difficultyOrder.forEach((difficulty) => {
    const templateSet = role.category === 'technical' ? technicalTemplates : behavioralTemplates;
    const typePattern = typeByDifficulty[difficulty];
    const availableTopics = categories.technical || categories.behavioral || topics;

    for (let index = 0; index < 3; index += 1) {
      const topic = availableTopics[(index + difficultyOrder.indexOf(difficulty)) % availableTopics.length];
      const questionText = templateSet[difficulty](role, topic);
      const questionType = typePattern[index % typePattern.length];
      roleQuestions.push({
        id: `${role.id}-${difficulty.toLowerCase()}-${index + 1}`,
        roleId: role.id,
        difficulty,
        type: questionType,
        question: questionText,
        topic,
        expectedKeywords: createExpectedKeywords(topic, role),
      });
    }
  });

  return roleQuestions;
};

export const questions = roles.flatMap(createQuestionsForRole);
