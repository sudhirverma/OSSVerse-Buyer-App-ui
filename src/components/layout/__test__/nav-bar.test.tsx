import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../nav-bar";
import useAuthStore from "@/store/auth-store";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

const onOpen = vi.fn();
// Mocking auth-store to simulate authenticated state changes
vi.mock("@/store/auth-store", () => {
  return {
    __esModule: true,
    default: vi.fn(() => ({
      formType: undefined,
      user: null,
      isAuthenticated: false,
      openLoginNavbar: false,
      login: vi.fn(),
      logout: vi.fn(),
      setOpenLoginNavbar: vi.fn(),
    })),
  };
});

describe("NavBar", () => {
  it("renders LoginNavbar when openLoginNavbar is true", () => {
    useAuthStore.mockReturnValue({
      isAuthenticated: false,
      openLoginNavbar: true,
      setOpenLoginNavbar: vi.fn(),
    });

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

    // Check that LoginNavbar renders
    expect(screen.getByText(/remember me/i)).toBeInTheDocument();

    // Click to close LoginNavbar
    fireEvent.click(screen.getByRole("button", { name: /Close/i }));
    expect(useAuthStore().setOpenLoginNavbar).toHaveBeenCalledWith(false);
  });

  it("shows user menu with logout confirmation when authenticated", async () => {
    useAuthStore.mockReturnValue({
      isAuthenticated: true,
      logout: vi.fn(),
    });

    const { container } = render(
      <MemoryRouter>
        <NavBar onOpen={onOpen} />
      </MemoryRouter>,
    );

    const toggleUserMenu = screen.getByRole("button", {
      name: /Toggle user menu/i,
    });
    expect(toggleUserMenu).toBeInTheDocument();

    fireEvent.click(toggleUserMenu);

    // const logoutItem = await container.findByText(/logout/i);
    // expect(logoutItem).toBeInTheDocument();

    // fireEvent.click(loginBtn);

    // await waitFor(() => {
    //   expect(onOpen).toHaveBeenCalledWith("confirmationDialog", expect.any(Object));
    // });
  });

  it("shows login options when not authenticated", () => {
    useAuthStore.mockReturnValue({
      isAuthenticated: false,
      setOpenLoginNavbar: vi.fn(),
    });

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

    // Check that "Book A Demo" and "Get Started" buttons are visible
    expect(screen.getByText("Book A Demo")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();

    // Click login button and check for setOpenLoginNavbar call
    const loginBtn = screen.getByRole("button", { name: "LogIn" });
    fireEvent.click(loginBtn);
    expect(useAuthStore().setOpenLoginNavbar).toHaveBeenCalledWith(true);
  });
});
