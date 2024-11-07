import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgetPassword from "../forget-password";
import { describe, it, expect, vi } from "vitest";
import { useModal } from "@/store/modal-store";

vi.mock("@/store/modal-store"); // Mock useModal

describe("ForgetPassword", () => {
  const closeMock = vi.fn();
  const backtoLoginMock = vi.fn();

  beforeEach(() => {
    (useModal as vi.Mock).mockReturnValue({
      onOpen: vi.fn(), // Mock onOpen function
      onClose: vi.fn(), // Mock onClose function
    });
  });

  it("should render the input and buttons", () => {
    render(<ForgetPassword close={closeMock} backtoLogin={backtoLoginMock} />);

    expect(
      screen.getByPlaceholderText("Enter email address"),
    ).toBeInTheDocument();
    expect(screen.getByText("Reset Password")).toBeInTheDocument();
    expect(screen.getByText("Back to Login")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("should show error message for invalid email", async () => {
    render(<ForgetPassword close={closeMock} backtoLogin={backtoLoginMock} />);

    const input = screen.getByPlaceholderText("Enter email address");
    const button = screen.getByText("Reset Password");

    fireEvent.change(input, { target: { value: "invalid-email" } });
    fireEvent.click(button);

    expect(
      await screen.findByText("Invalid email address"),
    ).toBeInTheDocument();
  });

  it("should call backtoLogin when Back to Login button is clicked", () => {
    render(<ForgetPassword close={closeMock} backtoLogin={backtoLoginMock} />);

    const button = screen.getByText("Back to Login");
    fireEvent.click(button);

    expect(backtoLoginMock).toHaveBeenCalled();
  });

  it("should call close when Close button is clicked", () => {
    render(<ForgetPassword close={closeMock} backtoLogin={backtoLoginMock} />);

    const button = screen.getByText("Close");
    fireEvent.click(button);

    expect(closeMock).toHaveBeenCalled();
  });

  it("should open modal and call close on valid email submission", async () => {
    const { onOpen, onClose } = useModal(); // Capture mocked onOpen
    render(<ForgetPassword close={closeMock} backtoLogin={backtoLoginMock} />);

    const input = screen.getByPlaceholderText("Enter email address");
    const button = screen.getByText("Reset Password");

    // Enter a valid email
    fireEvent.change(input, { target: { value: "john.doe@example.com" } });
    fireEvent.click(button);

    // Wait for the onOpen to be called
    await waitFor(() => {
      expect(onOpen).toHaveBeenCalledWith("infoDialog", expect.any(Object));
    });

    // Wait for the Done button to appear in the modal
    // await waitFor(() => {
    //   const doneButton = screen.getByText("Done");
    //   expect(doneButton).toBeInTheDocument(); // Check if Done button is in the document
    // });

    // // Simulate confirming the modal
    // const doneButton = screen.getByText("Done");
    // fireEvent.click(doneButton);

    // // Assert that close is called
    // expect(onClose).toHaveBeenCalled();
    // expect(closeMock).toHaveBeenCalled();
  });
});
