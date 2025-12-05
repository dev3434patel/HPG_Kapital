import { useState, useEffect } from 'react';

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/api/csrf-token', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          // If server is not available, allow form to work without CSRF in dev
          if (import.meta.env.DEV) {
            console.warn('CSRF token endpoint not available, continuing without CSRF protection');
            setCsrfToken('dev-bypass');
            setIsLoading(false);
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.csrfToken) {
          setCsrfToken(data.csrfToken);
        }
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
        // In development, allow form to work without CSRF
        if (import.meta.env.DEV) {
          console.warn('CSRF token fetch failed, using dev bypass');
          setCsrfToken('dev-bypass');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCsrfToken();
  }, []);

  return csrfToken;
};

