import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginNavbar from "../login-navbar";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useAuthStore from "@/store/auth-store";

// Mocking the zustand auth store
vi.mock("@/store/auth-store");

describe("LoginNavbar", () => {
  const closeMock = vi.fn();

  beforeEach(() => {
    // Mocking the zustand auth store
    (useAuthStore as vi.Mock).mockReturnValue({
      login: vi.fn(), // Mock login function to track calls
    });
  });

  it("should render the input fields and buttons", () => {
    render(<LoginNavbar close={closeMock} />);

    expect(
      screen.getByPlaceholderText("Username or Email"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Remember me")).toBeInTheDocument();
    expect(screen.getByText("Forgot Password")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("should show error message for empty username", async () => {
    render(<LoginNavbar close={closeMock} />);

    const button = screen.getByText("Login");
    fireEvent.click(button);

    expect(
      await screen.findByText("Username or Email is required"),
    ).toBeInTheDocument();
  });

  it("should show error message for empty password", async () => {
    render(<LoginNavbar close={closeMock} />);

    const usernameInput = screen.getByPlaceholderText("Username or Email");
    fireEvent.change(usernameInput, {
      target: { value: "john.doe@example.com" },
    });

    const button = screen.getByText("Login");
    fireEvent.click(button);

    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  it("should call login and close on valid form submission", async () => {
    const loginMock = useAuthStore().login; // Capture mocked login function
    render(<LoginNavbar close={closeMock} />);

    // Enter valid username and password
    fireEvent.change(screen.getByPlaceholderText("Username or Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Login"));

    // Check that login was called with expected user data and close was called
    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
      });
    });

    expect(closeMock).toHaveBeenCalled();
  });

  it("should show ForgetPassword component when Forgot Password button is clicked", () => {
    render(<LoginNavbar close={closeMock} />);

    const forgotPasswordButton = screen.getByText("Forgot Password");
    fireEvent.click(forgotPasswordButton);

    // Check if ForgetPassword component renders
    expect(
      screen.getByPlaceholderText("Enter email address"),
    ).toBeInTheDocument();

    // Click the back button within ForgetPassword component to trigger backtoLogin
    fireEvent.click(screen.getByText("Back to Login"));

    // Verify that ForgetPassword is removed and LoginNavbar displays
    expect(
      screen.queryByPlaceholderText("Enter email address"),
    ).not.toBeInTheDocument();
  });

  it("should call close when Close button is clicked", () => {
    render(<LoginNavbar close={closeMock} />);

    const button = screen.getByText("Close");
    fireEvent.click(button);

    expect(closeMock).toHaveBeenCalled();
  });
});
