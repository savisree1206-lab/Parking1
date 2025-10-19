import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
  ];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
  };

  return (
    <div className="language-switcher">
      <button className="language-btn">
        <Globe size={20} />
        <span className="current-lang">
          {languages.find(lang => lang.code === i18n.language)?.flag || '🇬🇧'}
        </span>
      </button>
      <div className="language-dropdown">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`language-option ${i18n.language === lang.code ? 'active' : ''}`}
          >
            <span className="flag">{lang.flag}</span>
            <span className="lang-name">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
