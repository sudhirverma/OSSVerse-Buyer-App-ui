import { describe, expect, it, vi, beforeEach } from "vitest"
import useAuthStore, { type User } from "@/store/auth-store"
import { getIsAuthenticated, setIsAuthenticated, removeIsAuthenticated } from "@/lib/storage-helper"

// Mock the storage helper functions
vi.mock("@/lib/storage-helper", () => ({
    getIsAuthenticated: vi.fn(),
    setIsAuthenticated: vi.fn(),
    removeIsAuthenticated: vi.fn(),
}))

describe("useAuthStore", () => {
    // Reset state and mocks before each test
    beforeEach(() => {
        vi.resetAllMocks()
        const store = useAuthStore.getState()
        store.logout() // Ensure the store is reset for each test
    })

    it("should initialize with the correct default state", () => {
        // Mock getIsAuthenticated to return null for initial state
        (getIsAuthenticated as vi.Mock).mockReturnValueOnce(null)

        const store = useAuthStore.getState()
        expect(store.user).toBeNull()
        expect(store.isAuthenticated).toBe(false)
        expect(store.openLoginNavbar).toBe(false)
        expect(store.formType).toBeUndefined()
    })

    it("should log in a user correctly", () => {
        const mockUser = {
            id: "1",
            name: "John Doe",
            email: "johndoe@example.com",

        } as User

        // Mock getIsAuthenticated to return the mockUser after login
        (getIsAuthenticated as vi.Mock).mockReturnValueOnce(mockUser)

        const store = useAuthStore.getState()
        store.login(mockUser)

        const store2 = useAuthStore.getState()
        // Assert user is set and authenticated
        expect(store2.user).toEqual(mockUser)
        expect(store2.isAuthenticated).toBe(true)

        // Assert setIsAuthenticated was called with the user
        expect(setIsAuthenticated).toHaveBeenCalledWith(mockUser)
    })

    it("should log out a user correctly", () => {
        const store = useAuthStore.getState()
        store.logout()

        // Assert user is null and not authenticated
        expect(store.user).toBeNull()
        expect(store.isAuthenticated).toBe(false)

        // Assert removeIsAuthenticated was called
        expect(removeIsAuthenticated).toHaveBeenCalled()
    })

    it("should set openLoginNavbar correctly", () => {

        const newStore = useAuthStore.getState()
        newStore.setOpenLoginNavbar(true)

        // Assert the openLoginNavbar is set to true
        const newStore2 = useAuthStore.getState()
        expect(newStore2.openLoginNavbar).toBe(true)


    })
})
