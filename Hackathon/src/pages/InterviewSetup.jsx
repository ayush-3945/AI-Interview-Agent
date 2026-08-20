import InterviewSetupPanel from '../components/InterviewSetup.jsx';
import Header from '../components/Header.jsx';

export default function InterviewSetupPage({
  role,
  difficulty,
  config,
  onChangeConfig,
  onStartInterview,
  onBack,
  onNavigate,
  onOpenHistory,
  onOpenProgress,
  error,
  hasQuestions,
  isGenerating,
}) {
  return (
    <div>
      <Header mode="home" onNavigate={onNavigate} onOpenHistory={onOpenHistory} onOpenProgress={onOpenProgress} />
      <InterviewSetupPanel
        role={role}
        difficulty={difficulty}
        config={config}
        onChangeConfig={onChangeConfig}
        onStartInterview={onStartInterview}
        onBack={onBack}
        error={error}
        hasQuestions={hasQuestions}
        isGenerating={isGenerating}
      />
    </div>
  );
}
