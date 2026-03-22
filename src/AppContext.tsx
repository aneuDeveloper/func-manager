import { createContext, useContext } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  logout: () => void;
};

const AppContext = createContext<AuthContextType | null>(null);
export default AppContext;

export const useAppContext = () => useContext(AppContext);
