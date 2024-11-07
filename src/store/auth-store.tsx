import {
  getIsAuthenticated,
  removeIsAuthenticated,
  setIsAuthenticated,
} from "@/lib/storage-helper";
import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
}
enum AuthFormType {
  LOGIN = "login",
  REGISTER = "register",
  FORGOT_PASSWORD = "forgot-password",
  RESET_PASSWORD = "reset-password",
}

interface AuthState {
  formType?: AuthFormType;
  user: User | null;
  isAuthenticated: boolean;
  openLoginNavbar: boolean;
  login: (user: User) => void;
  logout: () => void;
  setOpenLoginNavbar: (open: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  formType: undefined,
  user: getIsAuthenticated(),
  isAuthenticated: !!getIsAuthenticated(),
  openLoginNavbar: false,
  login: (user: User) => {
    setIsAuthenticated(user);
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    removeIsAuthenticated();
    set({ user: null, isAuthenticated: false });
  },
  setOpenLoginNavbar: (open: boolean) => {
    set({ openLoginNavbar: open });
  },
}));

export default useAuthStore;
