import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ 
  children, 
  defaultTheme = 'system',
  storageKey = 'app-theme'
}) {
  // Lấy theme từ localStorage hoặc dùng default
  const [theme, setThemeState] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored || defaultTheme;
  });

  const [effectiveTheme, setEffectiveTheme] = useState('light');

  // Xác định theme thực tế (xử lý 'system')
  useEffect(() => {
    const getEffectiveTheme = () => {
      if (theme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches 
          ? 'dark' 
          : 'light';
      }
      return theme;
    };

    const updateEffectiveTheme = () => {
      const newTheme = getEffectiveTheme();
      setEffectiveTheme(newTheme);
      
      // Apply theme to document
      document.documentElement.setAttribute('data-theme', newTheme);
    };

    updateEffectiveTheme();

    // Lắng nghe system theme changes
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => updateEffectiveTheme();
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  const toggleTheme = () => {
    if (theme === 'system') {
      // Nếu đang ở system mode, toggle sang theme ngược lại
      setTheme(effectiveTheme === 'light' ? 'dark' : 'light');
    } else {
      // Toggle giữa light và dark
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  const value = {
    theme,           // 'light' | 'dark' | 'system'
    effectiveTheme,  // 'light' | 'dark' (theme thực tế đang hiển thị)
    setTheme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}