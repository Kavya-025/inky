import './App.css';
import Board from './components/Board';
import Toolbar from './components/toolbar';
import BoardProvider from './store/boardProvider';

function App() {
  return (
    <BoardProvider>
      <Toolbar/>
      <Board/>
    </BoardProvider>
  );
}

export default App;
