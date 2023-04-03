import React, { createContext, useState } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Routes, Route } from 'react-router-dom';

// Import Components
import Layout from './components/layout/Layout';

// Import Pages
import Colors from './pages/Colors';
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
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Colors />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
