// AssessmentServicePricing.test.tsx

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AssessmentServicePricing from "../placeorder-assessment-service-pricing";
import type { ICheckItem } from "@/components/common/check-item";
import type { Item } from "@/services/marketplace-service";

describe("AssessmentServicePricing", () => {
  const mockServices: ICheckItem[] = [
    { id: "1", name: "Service A", price: 100 },
    { id: "2", name: "Service B", price: 200 },
  ];

  const mockProducts: Item[] = [
    {
      provider: { name: "Provider 1" },
      services: mockServices,
    },
  ];

  const renderComponent = (overrides = {}) => {
    const defaultProps = {
      type: "PROJECT",
      pricing_overall_info: ["Info A", "Info B"],
      products: mockProducts,
      selectedServices: [],
      setSelectedServices: () => {},
      total_payment_amount: 300,
      ...overrides,
    };

    return render(<AssessmentServicePricing {...defaultProps} />);
  };

  it("renders the title and provider name", () => {
    renderComponent();

    expect(screen.getByText("Provider 1")).toBeInTheDocument();
    expect(
      screen.getByText("OASP and Service List Provided"),
    ).toBeInTheDocument();
  });

  it("displays pricing overall information", () => {
    renderComponent();

    expect(screen.getByText("Info A")).toBeInTheDocument();
    expect(screen.getByText("Info B")).toBeInTheDocument();
  });

  it("renders the selected services with their prices", () => {
    renderComponent({ selectedServices: mockServices });

    // Selected the checkbox, below total price will show them, so will be length 2
    const serviceAElements = screen.getAllByText("Service A");
    const serviceBElements = screen.getAllByText("Service B");
    const serviceApriceElements = screen.getAllByText("₹100");
    const serviceBpriceElements = screen.getAllByText("₹200");

    expect(serviceAElements.length).toBe(2);
    expect(serviceBElements.length).toBe(2);
    expect(serviceApriceElements.length).toBe(2);
    expect(serviceBpriceElements.length).toBe(2);
  });

  it("calculates and displays the total payment amount", () => {
    renderComponent({ selectedServices: mockServices });

    expect(screen.getByText("Total of Payment")).toBeInTheDocument();
    expect(screen.getByText("₹300")).toBeInTheDocument(); // Adjust according to your total logic
  });

  it("renders the search input", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("Search Service..")).toBeInTheDocument();
  });
});
