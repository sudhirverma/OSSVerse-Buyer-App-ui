import { render, screen } from "@testing-library/react";
import PyamentMethod from "../payment-method";

describe("PyamentMethod Component", () => {
  it("renders payment method and credit card information when card details are provided", () => {
    render(
      <PyamentMethod
        number="**** **** **** 1234"
        date="12/23"
        total_payment_amount={""}
      />,
    );

    expect(screen.getByText("Payment Method")).toBeInTheDocument();
    expect(screen.getByText("Credit Card")).toBeInTheDocument();
    expect(screen.getByText("**** **** **** 1234")).toBeInTheDocument();
    expect(screen.getByText("12/23")).toBeInTheDocument();
  });

  it("renders the total payment amount when provided", () => {
    render(<PyamentMethod number="" date="" total_payment_amount={5000} />);

    expect(screen.getByText("Total Payment Amount")).toBeInTheDocument();
    expect(screen.getByText("₹5000")).toBeInTheDocument();
  });

  it("handles empty credit card and payment amount gracefully", () => {
    render(<PyamentMethod number="" date="" total_payment_amount={0} />);

    expect(screen.getByText("Payment Method")).toBeInTheDocument();
    expect(screen.queryByText("Credit Card")).not.toBeInTheDocument();
    expect(screen.queryByText("Total Payment Amount")).toBeInTheDocument();
    expect(screen.getByText("₹0")).toBeInTheDocument();
  });
});
