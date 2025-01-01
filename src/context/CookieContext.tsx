'use client';
import { createContext, useContext, useState, useEffect } from 'react';

interface CookieContextType {
  cookiesAccepted: boolean;
  acceptCookies: () => void;
  declineCookies: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export function CookieProvider({ children }: { children: React.ReactNode }) {
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    setCookiesAccepted(accepted === 'true');
    setIsLoaded(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setCookiesAccepted(true);
  };

  const declineCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setCookiesAccepted(false);
  };

  // Don't render children until we've loaded the cookie preference
  if (!isLoaded) {
    return null;
  }

  return (
    <CookieContext.Provider value={{ cookiesAccepted, acceptCookies, declineCookies }}>
      {children}
    </CookieContext.Provider>
  );
}

export function useCookies() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookies must be used within a CookieProvider');
  }
  return context;
} 