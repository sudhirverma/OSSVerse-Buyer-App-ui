global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SortMenu, { SortOrder, sortMenus } from "../sort-menu";
import type { Filters } from "@/store/my-orders-store";

describe("SortMenu Component", () => {
  const mockSetFilters = vi.fn();
  const filters: Filters = {
    sort: "Newest",
    order: SortOrder.Descending,
  };

  const setup = () => {
    render(<SortMenu setFilters={mockSetFilters} filters={filters} />);
  };

  it("renders correctly", () => {
    setup();
    const triggerButton = screen.getByRole("button", { name: /newest/i });
    expect(triggerButton).toBeInTheDocument();
  });

  it("displays all sort menu options", () => {
    setup();
    const sortedText = "Newest";
    fireEvent.click(screen.getByRole("button", { name: /newest/i }));

    sortMenus.forEach((menu) => {
      if (menu === sortedText) {
        expect(screen.getAllByText(menu)).toHaveLength(2);
      } else {
        expect(screen.getByText(menu)).toBeInTheDocument();
      }
    });
  });

  it("calls setFilters with correct sort option", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /newest/i }));

    const dueDateOption = screen.getByText("Due Date");
    fireEvent.click(dueDateOption);

    expect(mockSetFilters).toHaveBeenCalledWith({ sort: "Due Date" });
  });

  it("displays correct arrow icon next to selected sort option", async () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /newest/i }));

    const newestOptions = await screen.findAllByText("Newest");
    const newestInMenu = newestOptions[1];
    const arrowDownIcon =
      newestInMenu.parentElement?.querySelector(".lucide-arrow-down");
    const arrowUpIcon =
      newestInMenu.parentElement?.querySelector(".lucide-arrow-up");

    expect(arrowDownIcon).toBeInTheDocument();
    expect(arrowUpIcon).not.toBeInTheDocument();
  });
});
