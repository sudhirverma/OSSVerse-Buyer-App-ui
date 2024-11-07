import type { User } from "@/store/auth-store";
import { AUTH_STORAGE_KEY } from "./constant";
const storage = {
  getItem: (key: string) => {
    return localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};

export const setIsAuthenticated = (user: User) => {
  storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
};

export const getIsAuthenticated = () => {
  const user = storage.getItem(AUTH_STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

export default storage;

export const removeIsAuthenticated = () => {
  storage.removeItem(AUTH_STORAGE_KEY);
};
