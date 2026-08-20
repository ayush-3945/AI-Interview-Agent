import Header from '../components/Header.jsx';
import InterviewResult from '../components/InterviewResult.jsx';

export default function ResultsPage({ summary, onTryAgain, onBackToRoles, onViewHistory, onNavigate, onOpenHistory, onOpenProgress }) {
  return (
    <div>
      <Header mode="home" onNavigate={onNavigate} onOpenHistory={onOpenHistory} onOpenProgress={onOpenProgress} />
      <InterviewResult
        summary={summary}
        onTryAgain={onTryAgain}
        onBackToRoles={onBackToRoles}
        onViewHistory={onViewHistory}
      />
    </div>
  );
}
