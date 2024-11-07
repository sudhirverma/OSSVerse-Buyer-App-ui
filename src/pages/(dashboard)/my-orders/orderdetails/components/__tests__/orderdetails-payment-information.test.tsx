import { render, screen } from "@testing-library/react";
import OrderDetailsPaymentBillingInfo from "../orderdetails-payment-information";
import type { OrderDetails } from "@/services/myorders-service";

describe("OrderDetailsPaymentBillingInfo", () => {
  const mockPaymentInfo = {
    payment_method: "Credit Card",
    status: "Paid",
    amount: "5000",
  };

  const mockBillingInfo = {
    first_name: "John",
    last_name: "Doe",
    work_mail: "john.doe@example.com",
    phone: "1234567890",
  };

  const mockOrder: OrderDetails = {
    quote: { price: { value: "5000" } },
    // Add other necessary fields from OrderDetails as per your type definition
  };

  it("renders Payment Info section correctly", () => {
    render(
      <OrderDetailsPaymentBillingInfo
        payment_info={mockPaymentInfo}
        billing_info={mockBillingInfo}
        order={mockOrder}
      />,
    );

    expect(screen.getByText("Payment Info")).toBeInTheDocument();
    expect(screen.getByText("Payment Method")).toBeInTheDocument();
    expect(
      screen.getByText(mockPaymentInfo.payment_method),
    ).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText(mockPaymentInfo.status)).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(
      screen.getByText(`₹${mockOrder.quote.price.value}`),
    ).toBeInTheDocument();
  });

  it("renders Billing Info section correctly", () => {
    render(
      <OrderDetailsPaymentBillingInfo
        payment_info={mockPaymentInfo}
        billing_info={mockBillingInfo}
        order={mockOrder}
      />,
    );

    expect(screen.getByText("Billing Info")).toBeInTheDocument();
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText(mockBillingInfo.first_name)).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
    expect(screen.getByText(mockBillingInfo.last_name)).toBeInTheDocument();
    expect(screen.getByText("Work Mail")).toBeInTheDocument();
    expect(screen.getByText(mockBillingInfo.work_mail)).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText(mockBillingInfo.phone)).toBeInTheDocument();
  });

  it("renders the Edit Billing Info button and disclaimer text", () => {
    render(
      <OrderDetailsPaymentBillingInfo
        payment_info={mockPaymentInfo}
        billing_info={mockBillingInfo}
        order={mockOrder}
      />,
    );

    const editButton = screen.getByRole("button", {
      name: /Edit Billing Info/i,
    });
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveTextContent("Edit Billing Info");

    const disclaimerText = screen.getByText(
      /Billing information can only be changed/i,
    );
    expect(disclaimerText).toBeInTheDocument();
  });
});
