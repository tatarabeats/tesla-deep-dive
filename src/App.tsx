import { GameProvider } from './store/gameContext';
import CosmosCanvas from './components/cosmos/CosmosCanvas';

function App() {
  return (
    <GameProvider>
      <CosmosCanvas />
    </GameProvider>
  );
}

export default App;
