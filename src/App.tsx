import { GameProvider } from './store/gameContext';
import { MindmapScreen } from './components/screens/MindmapScreen';

function App() {
  return (
    <GameProvider>
      <MindmapScreen />
    </GameProvider>
  );
}

export default App;
