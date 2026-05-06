import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'acetate_user';

function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUser(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = loadUser();
    return {

      username: saved.username || null,
      selectedCatId: saved.selectedCatId || null,
      catNickname: saved.catNickname || null,
      isOnboarded: saved.isOnboarded || false,
      catFood: saved.catFood || 0,
      satiety: saved.satiety ?? 100,
      intimacy: saved.intimacy ?? 10,
      quizProgress: saved.quizProgress || {},
      favoriteWords: saved.favoriteWords || [],
    };
  });

  const update = useCallback((patch) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      saveUser(next);
      return next;
    });
  }, []);


  const setUsername = useCallback((username) => update({ username }), [update]);
  const selectCat = useCallback((selectedCatId) => update({ selectedCatId }), [update]);
  const nameCat = useCallback((catNickname) => update({ catNickname, isOnboarded: true }), [update]);

  const addCatFood = useCallback((amount = 1) => {
    setState((prev) => {
      const next = { ...prev, catFood: prev.catFood + amount };
      saveUser(next);
      return next;
    });
  }, []);

  const feedCat = useCallback(() => {
    let didFeed = false;
    setState((prev) => {
      if (prev.catFood < 3 || prev.satiety >= 100) return prev;
      didFeed = true;
      const next = {
        ...prev,
        catFood: prev.catFood - 3,
        satiety: Math.min(100, prev.satiety + 1),
      };
      saveUser(next);
      return next;
    });
    return didFeed;
  }, []);

  const petCat = useCallback(() => {
    const success = Math.floor(Math.random() * 15) === 0;
    if (success) {
      setState((prev) => {
        const next = { ...prev, intimacy: prev.intimacy + 1 };
        saveUser(next);
        return next;
      });
    }
    return success;
  }, []);

  const saveQuizProgress = useCallback((progressKey, progress) => {
    setState((prev) => {
      const next = {
        ...prev,
        quizProgress: {
          ...prev.quizProgress,
          [progressKey]: progress,
        },
      };
      saveUser(next);
      return next;
    });
  }, []);

  const clearQuizProgress = useCallback((progressKey) => {
    setState((prev) => {
      const nextProgress = { ...prev.quizProgress };
      delete nextProgress[progressKey];
      const next = { ...prev, quizProgress: nextProgress };
      saveUser(next);
      return next;
    });
  }, []);

  const addFavoriteWord = useCallback((word) => {
    setState((prev) => {
      if (prev.favoriteWords.some((item) => item.id === word.id)) return prev;
      const next = { ...prev, favoriteWords: [...prev.favoriteWords, word] };
      saveUser(next);
      return next;
    });
  }, []);

  const removeFavoriteWord = useCallback((wordId) => {
    setState((prev) => {
      const next = {
        ...prev,
        favoriteWords: prev.favoriteWords.filter((word) => word.id !== wordId),
      };
      saveUser(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({

      username: null,
      selectedCatId: null,
      catNickname: null,
      isOnboarded: false,
      catFood: 0,
      satiety: 100,
      intimacy: 10,
      quizProgress: {},
      favoriteWords: [],
    });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setState((prev) => {
        const nextSatiety = Math.max(0, prev.satiety - 1);
        const next = {
          ...prev,
          satiety: nextSatiety,
          intimacy: nextSatiety >= 60 ? prev.intimacy + 1 : prev.intimacy,
        };
        saveUser(next);
        return next;
      });
    }, 180000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,

        setUsername,
        selectCat,
        nameCat,
        addCatFood,
        feedCat,
        petCat,
        saveQuizProgress,
        clearQuizProgress,
        addFavoriteWord,
        removeFavoriteWord,
        resetAll,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
