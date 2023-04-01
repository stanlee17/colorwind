import React, { createContext, useState, useEffect } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Routes, Route } from 'react-router-dom';

// Import Components
import Sidebar from './components/layout/Sidebar';

// Import Pages
import GeneratePalette from './pages/GeneratePalette';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(null);

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
    saveUserSettings();
  };

  if (!theme) {
    loadUserSettings();
  }

  function loadUserSettings() {
    let userSettings = localStorage.getItem('userSettings');
    if (userSettings) {
      userSettings = JSON.parse(userSettings);
      setTheme(userSettings.theme);
    } else {
      defaultSettings();
    }
  }

  function defaultSettings() {
    setTheme('light');
  }

  function saveUserSettings() {
    let toggleTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem(
      'userSettings',
      JSON.stringify({ theme: toggleTheme })
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="App" id={theme}>
          <Sidebar />
          <div style={{ marginLeft: '20%' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generate-palette" element={<GeneratePalette />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
