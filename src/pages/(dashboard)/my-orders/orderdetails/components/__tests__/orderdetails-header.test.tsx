import { render, screen } from "@testing-library/react";
import OrderDetailsHeader from "../orderdetails-header";

describe("OrderDetailsHeader", () => {
  const defaultProps = {
    type: "PROJECT",
    title: "Sample Project",
    transactionID: "12345ABC",
  };

  it("renders the correct icon based on type", () => {
    render(<OrderDetailsHeader {...defaultProps} />);
    expect(
      screen.getByRole("img", { name: /projecticon/i }),
    ).toBeInTheDocument();
  });

  it("displays the title and transaction ID", () => {
    render(<OrderDetailsHeader {...defaultProps} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Sample Project",
    );
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      "Transaction ID 12345ABC",
    );
  });

  it("displays the status information", () => {
    render(<OrderDetailsHeader {...defaultProps} />);
    expect(screen.getByText("Select OASP")).toBeInTheDocument();
    expect(screen.getByText("(Pending Acceptance)")).toBeInTheDocument();
  });

  it("renders the cancel order button", () => {
    render(<OrderDetailsHeader {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: /cancel order/i }),
    ).toBeInTheDocument();
  });

  it("renders MLModelIcon when type is 'MODEL'", () => {
    render(<OrderDetailsHeader {...defaultProps} type="MODEL" />);
    expect(
      screen.getByRole("img", { name: /mlmodelicon/i }),
    ).toBeInTheDocument();
  });
});
