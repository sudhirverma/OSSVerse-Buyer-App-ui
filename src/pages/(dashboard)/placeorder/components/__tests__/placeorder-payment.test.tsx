import { render, screen } from "@testing-library/react";
import Payment from "../placeorder-payment";

describe("Payment Component", () => {
  it("renders Payment Information heading and description", () => {
    render(<Payment />);

    expect(screen.getByText(/Payment Information/i)).toBeInTheDocument();

    expect(
      screen.getByText(/Payment will be processed upon order confirmation/i),
    ).toBeInTheDocument();
  });

  it("renders payment method select with default value", () => {
    render(<Payment />);

    expect(screen.getByLabelText("Payment Method")).toBeInTheDocument();
    expect(screen.getByText("Credit Card")).toBeInTheDocument();
  });

  it("renders input fields with correct placeholders", () => {
    render(<Payment />);

    expect(
      screen.getByPlaceholderText("Full name on card"),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("1234 1234 1234 1234"),
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText("MM/YY")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("CVV")).toBeInTheDocument();
  });

  it("renders payment icons", () => {
    render(<Payment />);

    expect(screen.getByRole("img", { name: /Visa Icon/i })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Master Icon/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /American Express Icon/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Discover Icon/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("img", { name: /CVV Icon/i })).toBeInTheDocument();
  });
});
