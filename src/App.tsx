import { GameProvider, useGame } from './store/gameContext';
import { GameShell } from './components/layout/GameShell';
import { HomeScreen } from './components/screens/HomeScreen';
import TreeExploreScreen from './components/screens/TreeExploreScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';

function GameRouter() {
  const { gameState } = useGame();

  return (
    <GameShell>
      {gameState.scene === 'home' && <HomeScreen />}
      {gameState.scene === 'explore' && <TreeExploreScreen />}
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
