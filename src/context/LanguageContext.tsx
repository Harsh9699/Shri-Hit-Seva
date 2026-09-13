import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Very basic dictionary for core UI elements
const translations = {
  en: {
    'nav.home': 'Home',
    'nav.vaanis': 'Vaanis',
    'nav.calendar': 'Calendar',
    'nav.philosophy': 'Philosophy',
    'nav.naamJap': 'Naam Jap',
    'nav.sanidhya': 'Guru Sanidhya',
    'nav.community': 'Community',
    'nav.satsang': 'Satsang',
    'nav.admin': 'Admin',
    'nav.explore': 'Explore',
    
    'jap.title': 'Naam Jap',
    'jap.subtitle': 'Sadhana Tool',
    'jap.path': 'The Path of Nitya Vihar',
    'jap.tap': 'Tap to Chant',
    'jap.total': 'Total Malas',
    'jap.daily': 'Daily Sadhana',
    'jap.niyam': 'Nitya Niyam',
    'jap.desc': 'Track, save, and visualize your spiritual progress over time.',
    'jap.target': 'Target',
    'jap.today': "Today's Progress",
    'jap.save': 'Save Progress',
    'jap.saved': 'Saved!',
    'jap.analytics': 'Sadhana Analytics',
    'jap.last28': 'Last 28 Days (Monthly Overview)',
    'jap.missed': 'Missed',
    'jap.perfect': 'Perfect',

    'home.explore': 'Explore Vaanis',
    'home.ask': 'Ask Harivanshi',

    'radhashtami.greeting': 'Celebrating the Appearance of our Swamini',
    'radhashtami.subtitle': 'Brahma Muhurta (4:00 AM) · The Dawn of Divine Love',
    'radhashtami.tag': 'RADHASHTAMI SPECIAL',
    'radhashtami.badhai': 'Radhashtami ki Anant Badhai!',
    'radhashtami.special_text': 'On this sacred day, the Supreme Queen of Vrindavan descended to bless the world with the purest divine love. She is the very soul of Nitya Vihar.'
  },
  hi: {
    'nav.home': 'मुख्य पृष्ठ',
    'nav.vaanis': 'वाणियाँ',
    'nav.calendar': 'उत्सव कैलेंडर',
    'nav.philosophy': 'दर्शन',
    'nav.naamJap': 'नाम जप',
    'nav.sanidhya': 'गुरु सानिध्य',
    'nav.community': 'समुदाय',
    'nav.satsang': 'सत्संग',
    'nav.admin': 'व्यवस्थापक',
    'nav.explore': 'खोजें',
    
    'jap.title': 'नाम जप',
    'jap.subtitle': 'साधना उपकरण',
    'jap.path': 'नित्य विहार का मार्ग',
    'jap.tap': 'जप के लिए छुएं',
    'jap.total': 'कुल मालाएँ',
    'jap.daily': 'दैनिक साधना',
    'jap.niyam': 'नित्य नियम',
    'jap.desc': 'अपनी आध्यात्मिक प्रगति को ट्रैक करें और सहेजें।',
    'jap.target': 'लक्ष्य',
    'jap.today': "आज की प्रगति",
    'jap.save': 'प्रगति सहेजें',
    'jap.saved': 'सहेजा गया!',
    'jap.analytics': 'साधना विश्लेषण',
    'jap.last28': 'पिछले 28 दिन (मासिक अवलोकन)',
    'jap.missed': 'चूक गए',
    'jap.perfect': 'संपूर्ण',

    'home.explore': 'वाणियाँ खोजें',
    'home.ask': 'हरिवंशी से पूछें',

    'radhashtami.greeting': 'हमारी स्वामिनी के प्राकट्योत्सव का आनंद',
    'radhashtami.subtitle': 'ब्रह्म मुहूर्त (प्रातः 4:00) · दिव्य प्रेम का उदय',
    'radhashtami.tag': 'राधाष्टमी विशेष',
    'radhashtami.badhai': 'राधाष्टमी की अनंत बधाई!',
    'radhashtami.special_text': 'इस पावन दिवस पर, वृन्दावन की अधीश्वरी ने विश्व को सर्वोच्च दिव्य प्रेम का आशीर्वाद देने के लिए अवतार लिया। वे ही नित्य विहार की आत्मा हैं।'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('app_language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'hi')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (key: string): string => {
    const dict = translations[language];
    return (dict as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
