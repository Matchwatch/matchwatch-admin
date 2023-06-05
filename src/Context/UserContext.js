import { createContext } from "react";

export const AuthContext = createContext({
  isLogged: false,
  userId: null,
  email: null,

  login: () => {},
  logout: () => {},
});
