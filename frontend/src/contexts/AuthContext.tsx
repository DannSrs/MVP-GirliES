import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api, type Usuario } from '../services/api';

interface AuthContextType {
  currentUser: Usuario | null;
  login: (email: string, token: string) => Promise<void>;
  logout: () => void;
  updateProfile: (user: Usuario) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('@GirliES:user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Failed to parse stored user', err);
        localStorage.removeItem('@GirliES:user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, token: string) => {
    const response = await api.login(email, token);
    setCurrentUser(response.usuario);
    localStorage.setItem('@GirliES:user', JSON.stringify(response.usuario));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('@GirliES:user');
  };

  const updateProfile = (user: Usuario) => {
    setCurrentUser(user);
    localStorage.setItem('@GirliES:user', JSON.stringify(user));
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
