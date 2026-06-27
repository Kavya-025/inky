import './App.css';
import Board from './components/Board';
import Toolbar from './components/toolbar';
import Toolbox from './components/toolbox';
import BoardProvider from './store/boardProvider';
import ToolboxProvider from './store/toolbox-context-provider';

function App() {
  return (
    <BoardProvider>
      <ToolboxProvider>
        <Toolbar/>
        <Board/>
        <Toolbox/>
      </ToolboxProvider>
    </BoardProvider>
    
  );
}

export default App;
