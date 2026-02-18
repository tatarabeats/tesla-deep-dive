import { GameProvider, useGame } from './store/gameContext';
import { GameShell } from './components/layout/GameShell';
import { HomeScreen } from './components/screens/HomeScreen';
import { ModuleSelectScreen } from './components/screens/ModuleSelectScreen';
import { QuizRoundScreen } from './components/screens/QuizRoundScreen';
import { RoundResultScreen } from './components/screens/RoundResultScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';

function GameRouter() {
  const { gameState } = useGame();

  return (
    <GameShell>
      {gameState.scene === 'home' && <HomeScreen />}
      {gameState.scene === 'module_select' && <ModuleSelectScreen />}
      {gameState.scene === 'round_active' && <QuizRoundScreen />}
      {gameState.scene === 'round_result' && <RoundResultScreen />}
      {gameState.scene === 'profile' && <ProfileScreen />}
    </GameShell>
  );
}

function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}

export default App;
