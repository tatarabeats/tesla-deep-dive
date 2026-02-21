import { GameProvider } from './store/gameContext';
import { TreeExplorer } from './components/tree/TreeExplorer';

function App() {
  return (
    <GameProvider>
      <TreeExplorer />
    </GameProvider>
  );
}

export default App;
