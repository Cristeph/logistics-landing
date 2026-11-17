import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api, onUnauthorized } from '@/lib/api';

const AuthContext = createContext(null);

// The session itself lives in an httpOnly cookie set by the API. We only keep the
// (non-sensitive) profile in memory, and ask the API who we are on load.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | authenticated | anonymous

  const refresh = useCallback(async () => {
    try {
      const me = await api.get('/users/profile', { auth: false });
      setUser(me);
      setStatus('authenticated');
      return me;
    } catch {
      setUser(null);
      setStatus('anonymous');
      return null;
    }
  }, []);

  useEffect(() => {
    // Clean up the token/user that older versions of the site kept in localStorage.
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch {
      /* storage unavailable */
    }
    refresh();
  }, [refresh]);

  useEffect(
    () =>
      onUnauthorized(() => {
        setUser(null);
        setStatus('anonymous');
      }),
    []
  );

  const login = useCallback(async (email, password) => {
    const { user: u } = await api.post('/users/login', { email, password }, { auth: false });
    setUser(u);
    setStatus('authenticated');
    return u;
  }, []);

  const register = useCallback(async (payload) => {
    const { user: u } = await api.post('/users/register', payload, { auth: false });
    setUser(u);
    setStatus('authenticated');
    return u;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/users/logout', undefined, { auth: false });
    } finally {
      setUser(null);
      setStatus('anonymous');
    }
  }, []);

  const value = useMemo(
    () => ({ user, status, isAdmin: user?.role === 'admin', login, register, logout, refresh, setUser }),
    [user, status, login, register, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
