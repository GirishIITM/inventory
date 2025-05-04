import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { trans } from '../utils/translations';

function Settings() {
  const { i18n, t } = useTranslation();
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setCurrentTheme(savedTheme);
  }, []);

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
    localStorage.setItem('language', event.target.value);
  };

  const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newTheme = event.target.value;
    
    // Remove all theme classes
    document.body.classList.remove('dark', 'nature-light', 'nature-dark', 'vibrant-light', 'vibrant-dark', 'mono-light', 'mono-dark');
    
    // Add selected theme class
    if (newTheme !== 'light') {
      document.body.classList.add(newTheme);
    }
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
    setCurrentTheme(newTheme);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>{t(trans.settings)}</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <label htmlFor="language-select" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>{i18n.t('selectLanguage')}</label>
        <select 
          id="language-select" 
          onChange={handleLanguageChange} 
          value={i18n.language}
          style={{ padding: '8px', borderRadius: '4px', width: '100%', maxWidth: '300px' }}
        >
          <option value="en">{t('English')}</option>
          <option value="kn">{t('Kannada')}</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="theme-select" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>{t('Theme')}</label>
        <select 
          id="theme-select" 
          onChange={handleThemeChange} 
          value={currentTheme}
          style={{ padding: '8px', borderRadius: '4px', width: '100%', maxWidth: '300px' }}
        >
          <option value="light">{t('Light')}</option>
          <option value="dark">{t('Dark')}</option>
          <option value="nature-light">{t('Nature Light')}</option>
          <option value="nature-dark">{t('Nature Dark')}</option>
          <option value="vibrant-light">{t('Vibrant Light')}</option>
          <option value="vibrant-dark">{t('Vibrant Dark')}</option>
          <option value="mono-light">{t('Mono Light')}</option>
          <option value="mono-dark">{t('Mono Dark')}</option>
        </select>
      </div>
    </div>
  );
}

export default Settings;