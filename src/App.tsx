import './App.css';
import Calculator from './components/Calculator';
import AllRoutes from './pages/AllRoutes';
import { Toaster } from 'react-hot-toast';

function App() {


  return (
    <div>
      <AllRoutes />
      <Calculator />
      <Toaster />

    </div>
  );
}

export default App;
