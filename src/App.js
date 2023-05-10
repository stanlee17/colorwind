import React, { createContext, useState } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import namer from 'color-namer';
import { Routes, Route } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';
import Modal from 'react-modal';

// Import Layout Components
import Layout from './components/layout/Layout';

// Import Pages
import Colors from './pages/Colors';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

// createContext
export const ThemeContext = createContext(null);
export const ColorsContext = createContext(null);
export const ModalsContext = createContext(null);

Modal.setAppElement('#root');

function App() {
  // INITIAL: Theme state
  const [theme, setTheme] = useState(null);

  // INITIAL: Colors state
  const [colors, setColors] = useState([
    { id: 1, color: '', isLocked: false, name: '' },
    { id: 2, color: '', isLocked: false, name: '' },
    { id: 3, color: '', isLocked: false, name: '' },
    { id: 4, color: '', isLocked: false, name: '' },
    { id: 5, color: '', isLocked: false, name: '' },
  ]);

  // INITIAL: Modals state
  const [modals, setModals] = useState({
    saveModal: false,
    exportModal: false,
    deleteModal: false,
    renameModal: false,
  });

  // INITIAL: Saved Color Id State
  const [savedColorId, setSavedColorId] = useState('');

  // INITIAL: Saved colors state
  const [savedColors, setSavedColors] = useState(() => {
    const saved = localStorage.getItem('savedColors');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  // FUNCTION: Toggles theme between light/dark
  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
    saveUserSettings();
  };

  if (!theme) {
    loadUserSettings();
  }

  // Load user settings if not it's not on default
  function loadUserSettings() {
    let userSettings = localStorage.getItem('userSettings');
    if (userSettings) {
      userSettings = JSON.parse(userSettings);
      setTheme(userSettings.theme);
    } else {
      defaultSettings();
    }
  }

  // Default theme setting
  function defaultSettings() {
    setTheme('light');
  }

  // Saves user settings
  function saveUserSettings() {
    let toggleTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem(
      'userSettings',
      JSON.stringify({ theme: toggleTheme })
    );
  }

  // Get color name using color-namer library
  function colorName(color) {
    return namer(color, { pick: ['ntc'] }).ntc[0].name;
  }

  const openModal = (modalName) => {
    return setModals({ ...modals, [modalName]: true });
  };

  const closeModal = (modalName) => {
    return setModals({ ...modals, [modalName]: false });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ColorsContext.Provider
          value={{
            colors,
            savedColors,
            savedColorId,
            setColors,
            setSavedColors,
            setSavedColorId,
            colorName,
          }}
        >
          <ModalsContext.Provider
            value={{
              modals,
              closeModal,
              openModal,
              setModals,
            }}
          >
            <SkeletonTheme
              baseColor={theme === 'light' ? '#E8E8E8' : '#262626'}
              highlightColor={theme === 'light' ? '#F8F8F8' : '#343434'}
            >
              <div className="App" id={theme}>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Colors />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </div>
            </SkeletonTheme>
          </ModalsContext.Provider>
        </ColorsContext.Provider>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
