import { render, screen, fireEvent } from "@testing-library/react";
import OrderDetailsCommunication from "../orderdetails-communication";

describe("OrderDetailsCommunication", () => {
  it("renders the main header and subtitle", () => {
    render(<OrderDetailsCommunication />);

    expect(screen.getByText("Communicate with OASP")).toBeInTheDocument();
    expect(
      screen.getByText(/Communications with the OASP/),
    ).toBeInTheDocument();
  });

  it("displays user and OASP messages correctly", () => {
    render(<OrderDetailsCommunication />);

    // Checking user message
    expect(
      screen.getByText("Hi I'm Adam ! How I can help you?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Adam - 1/3/2024 05:32 EST")).toBeInTheDocument();

    // Checking OASP message
    expect(
      screen.getByText(/I need to compare the two residential solar products/),
    ).toBeInTheDocument();
    expect(screen.getByText("OASP - 1/3/2024 05:33 EST")).toBeInTheDocument();
  });

  it("renders action buttons and input field", () => {
    render(<OrderDetailsCommunication />);

    // Check for icons/buttons in communication area
    expect(
      screen.getByRole("button", { name: /Frown Icon/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Users Icon/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /MessageCircle Icon/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /ShieldCheck Icon/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Paperclip Icon/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Flag Icon/i }),
    ).toBeInTheDocument();

    // Check for message input and send button
    expect(screen.getByPlaceholderText("Reply to message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Send Icon/i }),
    ).toBeInTheDocument();
  });

  it("simulates message input and sends action", () => {
    render(<OrderDetailsCommunication />);

    const inputField = screen.getByPlaceholderText("Reply to message");
    fireEvent.change(inputField, { target: { value: "Hello OASP!" } });
    expect(inputField).toHaveValue("Hello OASP!");

    // Simulate clicking the send button
    const sendButton = screen.getByRole("button", { name: /Send Icon/i });
    fireEvent.click(sendButton);

    // In a real app, you'd verify message sending here, but we're only testing UI rendering and actions.
  });
});
