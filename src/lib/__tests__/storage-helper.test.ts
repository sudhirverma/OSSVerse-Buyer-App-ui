import {
  setIsAuthenticated,
  getIsAuthenticated,
  removeIsAuthenticated,
} from "@/lib/storage-helper";
import { AUTH_STORAGE_KEY } from "@/lib/constant";
import type { User } from "@/store/auth-store";

const mockUser: User = {
  id: "123",
  name: "Test User",
  email: "test@example.com",
};

describe("storage-helper", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("sets user data in localStorage when calling setIsAuthenticated", () => {
    setIsAuthenticated(mockUser);

    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    expect(storedUser).toBe(JSON.stringify(mockUser));
  });

  it("gets user data from localStorage when calling getIsAuthenticated", () => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));

    const user = getIsAuthenticated();
    expect(user).toEqual(mockUser);
  });

  it("returns null if there is no user data in localStorage", () => {
    const user = getIsAuthenticated();
    expect(user).toBeNull();
  });

  it("removes user data from localStorage when calling removeIsAuthenticated", () => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));

    removeIsAuthenticated();
    expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
  });
});
