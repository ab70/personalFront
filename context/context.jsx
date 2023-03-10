import { createContext,useState } from "react";

export const defaultLocale = 'en'
export const locales = ['ar','pt','en','bn']
export const LanguageContext = createContext([])

export const LanguageProvider = ({ children }) => {
    const [locale, setLocale] = useState('en');
    return (
      <LanguageContext.Provider value={[locale, setLocale]}>
        {children}
        
      </LanguageContext.Provider>
    );
};
