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
  // INITIAL: Theme state
  const [theme, setTheme] = useState(null);

  // FUNCTION: Toggles theme between light/dark
  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
    saveUserSettings();
  };

  if (!theme) {
    loadUserSettings();
  }

  // FUNCTION: Load user settings if not it's not on default
  function loadUserSettings() {
    let userSettings = localStorage.getItem('userSettings');
    if (userSettings) {
      userSettings = JSON.parse(userSettings);
      setTheme(userSettings.theme);
    } else {
      defaultSettings();
    }
  }

  // FUNCTION: Default theme setting
  function defaultSettings() {
    setTheme('light');
  }

  // FUNCTION: Saves user settings
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
