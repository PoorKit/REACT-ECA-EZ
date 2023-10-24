// UserContext.js
import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from "../interfaces/UserInterface";

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
  }
  
  export const UserContext = createContext<UserContextType | undefined>(undefined);
  
  export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  }
  
  export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
  }