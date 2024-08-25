import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

function Settings() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
    localStorage.setItem('language', event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <h1>{t('settings')}</h1>
      <div>
        <label htmlFor="language-select">{i18n.t('selectLanguage')}</label>
        <select id="language-select" onChange={handleLanguageChange} value={i18n.language}>
          <option value="en">{t('English')}</option>
          <option value="kn">{t('Kannada')}</option>
        </select>
      </div>
    </div>
  );
}

export default Settings;