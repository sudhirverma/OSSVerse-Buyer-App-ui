// myOrdersStore.test.ts
import { describe, it, expect } from "vitest";
import { act } from "@testing-library/react";
import { useMyOrdersStore } from "../my-orders-store";

describe("useMyOrdersStore Store", () => {
  it("should update filters with new sort and toggle order correctly using setFilters", () => {
    const { setFilters } = useMyOrdersStore.getState();

    // First call to setFilters with new sort
    act(() => {
      setFilters({ sort: "Oldest" });
    });

    let state = useMyOrdersStore.getState();
    expect(state.filters.sort).toBe("Oldest");
    expect(state.filters.order).toBe(-1); // Default order after new sort

    // Second call to toggle order
    act(() => {
      setFilters({ sort: "Oldest" });
    });

    state = useMyOrdersStore.getState();
    expect(state.filters.order).toBe(1);

    // Third call to toggle order back
    act(() => {
      setFilters({ sort: "Oldest" });
    });

    state = useMyOrdersStore.getState();
    expect(state.filters.order).toBe(0);
  });

  it("should update filters with other properties correctly", () => {
    const { setFilters } = useMyOrdersStore.getState();

    act(() => {
      setFilters({ search: "test search", page: 2, limit: 20 });
    });

    const state = useMyOrdersStore.getState();
    expect(state.filters.search).toBe("test search");
    expect(state.filters.page).toBe(2);
    expect(state.filters.limit).toBe(20);
  });
});
