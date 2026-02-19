import { GameProvider } from './store/gameContext';
import { HomeScreen } from './components/screens/HomeScreen';

function App() {
  return (
    <GameProvider>
      <HomeScreen />
    </GameProvider>
  );
}

export default App;
