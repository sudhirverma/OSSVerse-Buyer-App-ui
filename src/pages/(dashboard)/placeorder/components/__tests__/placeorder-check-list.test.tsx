import { render, screen, fireEvent } from "@testing-library/react";
import PlaceOrderCheckList from "../placeorder-check-list";
import { vi } from "vitest";

// Mock data for items
const mockItems = [
  { id: "1", name: "Item 1", price: 100 },
  { id: "2", name: "Item 2", price: 200 },
  { id: "3", name: "Item 3", price: 300 },
  { id: "4", name: "Item 4", price: 400 },
];

describe("PlaceOrderCheckList Component", () => {
  let selectedItems = [];
  const setSelectedItems = vi.fn((updater) => {
    selectedItems = updater(selectedItems);
  });

  it("renders the correct number of CheckItems", () => {
    render(
      <PlaceOrderCheckList
        items={mockItems}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
      />,
    );

    // Check if the CheckItems are rendered
    const checkItems = screen.getAllByTestId("check-item"); // Assuming you added data-testid to CheckItem
    expect(checkItems).toHaveLength(mockItems.length);
  });

  it("calls setSelectedItems when a CheckItem is clicked", () => {
    render(
      <PlaceOrderCheckList
        items={mockItems}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
      />,
    );

    // Simulate clicking on the first CheckItem's checkbox
    fireEvent.click(screen.getByRole("checkbox", { name: /Item 1/i })); // Replace with the appropriate selector if necessary

    // Check if setSelectedItems was called with the correct arguments
    expect(setSelectedItems).toHaveBeenCalled();
    expect(setSelectedItems).toHaveBeenCalledWith(expect.any(Function)); // Check that it receives a function
  });

  it("disables CheckItem checkboxes when selectedOasps has 2 or more items", () => {
    const selectedOasps = [
      { id: "1", name: "Item 1", price: 100 },
      { id: "2", name: "Item 2", price: 200 },
    ]; // 2 items selected

    render(
      <PlaceOrderCheckList
        items={mockItems}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedOasps}
        disabledLength={selectedOasps.length >= 2}
      />,
    );

    const firstCheckBox = screen.getByRole("checkbox", { name: /Item 1/i });
    const secondCheckBox = screen.getByRole("checkbox", { name: /Item 2/i });
    const thirdCheckBox = screen.getByRole("checkbox", { name: /Item 3/i });
    const fourthCheckBox = screen.getByRole("checkbox", { name: /Item 4/i });

    // Both checkboxes should be disabled
    expect(firstCheckBox).toHaveAttribute("aria-checked", "true");
    expect(secondCheckBox).toHaveAttribute("aria-checked", "true");
    expect(thirdCheckBox).toHaveAttribute("aria-checked", "false");
    expect(fourthCheckBox).toHaveAttribute("aria-checked", "false");
  });
});
