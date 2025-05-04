import React, { useEffect, useState } from 'react'
import '../styles/nav.css'
import { Link } from 'react-router-dom'
import { navBtn } from '../assets/index'
import { plusIcon } from '../assets/index'
import { useTranslation } from 'react-i18next'
import DarkLightToogle from './DarkLightToogle'

export default function NavBar() {

  const [navOpen, setNavOpen] = React.useState(false)
  const handleClick = () => setNavOpen(!navOpen);
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const isDark = currentTheme.includes('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    let newTheme;

    if (currentTheme === 'light') newTheme = 'dark';
    else if (currentTheme === 'dark') newTheme = 'light';
    else if (currentTheme === 'nature-light') newTheme = 'nature-dark';
    else if (currentTheme === 'nature-dark') newTheme = 'nature-light';
    else if (currentTheme === 'vibrant-light') newTheme = 'vibrant-dark';
    else if (currentTheme === 'vibrant-dark') newTheme = 'vibrant-light';
    else if (currentTheme === 'mono-light') newTheme = 'mono-dark';
    else if (currentTheme === 'mono-dark') newTheme = 'mono-light';
    else newTheme = isDarkMode ? 'light' : 'dark';

    document.body.classList.remove('dark', 'nature-light', 'nature-dark', 'vibrant-light', 'vibrant-dark', 'mono-light', 'mono-dark');

    if (newTheme !== 'light') {
      document.body.classList.add(newTheme);
    }

    localStorage.setItem('theme', newTheme);
    setIsDarkMode(newTheme.includes('dark'));
  };

  return (
    <header style={{
      backdropFilter: navOpen ? "blur(15px)" : "none",
      height: navOpen ? '100vh' : '60px',
    }}>
      <div className='header_flex'>
        <Link to='/' className='home_logo'>Iventory</Link>
        <nav>
          <ul>
            <li><Link to="/products">{t('products')}</Link></li>
            <li><Link to="/reports">{t('reports')}</Link></li>
            <li><Link to="/billing">{t('billing')}</Link></li>
            <li><Link to="/settings">{t('settings')}</Link></li>
          </ul>
        </nav>
        <DarkLightToogle toogleTheme={toggleTheme} key={1} />
        <img alt='' onClick={handleClick} src={plusIcon} className='rotate_plus' style={{
          opacity: navOpen ? 1 : 0,
          width: navOpen ? '30px' : '0px',
        }} />
        <img onClick={handleClick} className='nav_btn' src={navBtn} alt="" style={{
          opacity: navOpen ? 0 : 1,
          width: navOpen ? '0px' : '30px',
        }} />
      </div>
      <div className='nav_wrapper_links'
        style={{
          height: navOpen ? '100vh' : '0px',
          opacity: navOpen ? 1 : 0,
          zIndex: navOpen ? 1 : -1,
          top: navOpen ? '0' : '-100px',
        }}
      >
        <ul style={{
          height: navOpen ? '100vh' : '0px',
          opacity: navOpen ? 1 : 0,
          zIndex: navOpen ? 1 : -1,
          top: navOpen ? '0' : '-100px',
        }}>
          <li><Link onClick={() => setNavOpen(false)} to="/products">{t('products')}</Link></li>
          <li><Link onClick={() => setNavOpen(false)} to="/reports">{t('reports')}</Link></li>
          <li><Link onClick={() => setNavOpen(false)} to="/sales">{t('billing')}</Link></li>
          <li><Link onClick={() => setNavOpen(false)} to="/settings">{t('settings')}</Link></li>
        </ul>
      </div>
    </header >
  )
}
