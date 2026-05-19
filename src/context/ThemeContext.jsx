import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => localStorage.getItem('app-mode') || 'light');
  const [color, setColor] = useState(() => localStorage.getItem('app-color') || 'blue');
  const [customColor, setCustomColor] = useState(() => localStorage.getItem('app-custom-color') || '#2196f3');
  
  // Global Font State
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('app-font-size') || '14px');
  const [fontFamily, setFontFamily] = useState(() => localStorage.getItem('app-font-family') || "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif");

  useEffect(() => {
    localStorage.setItem('app-mode', mode);
    localStorage.setItem('app-color', color);
    localStorage.setItem('app-custom-color', customColor);
    localStorage.setItem('app-font-size', fontSize);
    localStorage.setItem('app-font-family', fontFamily);
    
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.setAttribute('data-color', color);
    
    // Apply global fonts
    document.documentElement.style.setProperty('--global-font-size', fontSize);
    document.documentElement.style.setProperty('--global-font-family', fontFamily);

    if (color === 'custom') {
      const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      };

      const rgb = hexToRgb(customColor);
      if (rgb) {
        document.documentElement.style.setProperty('--accent', customColor);
        document.documentElement.style.setProperty('--accent-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
        document.documentElement.style.setProperty('--accent-light', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
        document.documentElement.style.setProperty('--accent-2', customColor); // Simplification
      }
    } else {
      // Clear inline styles when not in custom mode
      document.documentElement.style.removeProperty('--accent');
      document.documentElement.style.removeProperty('--accent-rgb');
      document.documentElement.style.removeProperty('--accent-light');
      document.documentElement.style.removeProperty('--accent-2');
    }
  }, [mode, color, customColor, fontSize, fontFamily]);

  return (
    <ThemeContext.Provider value={{ 
      mode, setMode, 
      color, setColor, 
      customColor, setCustomColor,
      fontSize, setFontSize,
      fontFamily, setFontFamily
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
