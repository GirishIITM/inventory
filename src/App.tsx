import { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import AllRoutes from './pages/AllRoutes';
import Calculator from './components/Calculator';
import i18n from './utils/i18n';

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme !== 'light') {
      document.body.classList.add(savedTheme);
    }

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  return (
    <div className="App">
      <NavBar />
      <AllRoutes />
      <Calculator />
    </div>
  );
}

export default App;
