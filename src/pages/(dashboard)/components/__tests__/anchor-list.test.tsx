import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AnchorLists from "../anchor-list";

describe("AnchorLists Component", () => {
  const mockSetCurrentAnchor = vi.fn();
  const anchroLists = [
    "Description Details",
    "Assessment Service Pricing",
    "Payment",
  ];

  it("renders all anchor list items", () => {
    render(
      <AnchorLists
        currentAnchor={0}
        setCurrentAnchor={mockSetCurrentAnchor}
        anchroLists={anchroLists}
      />,
    );

    anchroLists.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("sets current anchor when a button is clicked", () => {
    render(
      <AnchorLists
        currentAnchor={0}
        setCurrentAnchor={mockSetCurrentAnchor}
        anchroLists={anchroLists}
      />,
    );

    const button = screen.getByText("Assessment Service Pricing");
    fireEvent.click(button);

    expect(mockSetCurrentAnchor).toHaveBeenCalledWith(1);
  });

  it("highlights the current anchor button", () => {
    render(
      <AnchorLists
        currentAnchor={1}
        setCurrentAnchor={mockSetCurrentAnchor}
        anchroLists={anchroLists}
      />,
    );

    const currentButton = screen.getByText("Assessment Service Pricing");
    expect(currentButton).toHaveClass("bg-neutral-300"); // The class should match the one applied for selected items
  });
});
