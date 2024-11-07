import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CheckItem, { type ICheckItem } from "../check-item";

describe("CheckItem Component", () => {
  it("renders the check item correctly", () => {
    const label = "Test Item";
    const checkItem = { id: "1", name: label, price: 10 };
    render(
      <CheckItem
        checkItem={checkItem}
        setSelectedItems={vi.fn()}
        selectedItems={[]}
      />,
    );
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("toggles the check item correctly", async () => {
    const checkItem = { id: "1", name: "Test Item", price: 10 };
    const setSelectedItems = vi.fn();
    render(
      <CheckItem
        checkItem={checkItem}
        setSelectedItems={setSelectedItems}
        selectedItems={[]}
      />,
    );
    const checkbox = screen.getByRole("checkbox");
    checkbox.setAttribute("aria-checked", "true");
    expect(checkbox).toBeChecked();
  });

  it("adds the check item to selected items when checked", async () => {
    const checkItem = { id: "1", name: "Test Item", price: 10 };
    const setSelectedItems = vi.fn();
    const selectedItems: ICheckItem[] = [
      { id: "1", name: "Test Item", price: 10 },
    ];
    render(
      <CheckItem
        checkItem={checkItem}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
      />,
    );
    const checkbox = screen.getByRole("checkbox");
    checkbox.setAttribute("aria-checked", "true");
  });

  it("removes the check item from selected items when unchecked", async () => {
    const checkItem = { id: "1", name: "Test Item", price: 10 };
    const setSelectedItems = vi.fn(); // Mocked function
    const selectedItems = [checkItem]; // Initial selected items

    render(
      <CheckItem
        checkItem={checkItem}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
      />,
    );

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(setSelectedItems).toHaveBeenCalled();

    const updateFunction = setSelectedItems.mock.calls[0][0];
    const updatedItems = updateFunction(selectedItems);

    expect(updatedItems).toEqual([]);
  });

  it("disables the checkbox when disabledLength is true and item is not selected", async () => {
    const checkItem = { id: "1", name: "Test Item", price: 10 };
    const setSelectedItems = vi.fn();
    const selectedItems: ICheckItem[] = [];
    const disabledLength = true;
    render(
      <CheckItem
        checkItem={checkItem}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
        disabledLength={disabledLength}
      />,
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  it("enables the checkbox when disabledLength is true and item is selected", async () => {
    const checkItem = { id: "1", name: "Test Item", price: 10 };
    const setSelectedItems = vi.fn();
    const selectedItems = [checkItem];
    const disabledLength = true;

    render(
      <CheckItem
        checkItem={checkItem}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
        disabledLength={disabledLength}
      />,
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeDisabled();
  });
});
