// modal-store.test.ts
import { renderHook, act } from "@testing-library/react";
import { useModal } from "@/store/modal-store";

describe("Modal Store", () => {
  it("should open modal with specified type and data", () => {
    const { result } = renderHook(() => useModal());

    const modalData = {
      confirmationDialog: {
        title: "Confirm Delete",
        content: "Are you sure you want to delete this item?",
        onConfirm: vi.fn(),
      },
    };

    act(() => {
      result.current.onOpen("confirmationDialog", modalData);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.type).toBe("confirmationDialog");
    expect(result.current.data).toEqual(modalData);
  });

  it("should close modal and reset state", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.onOpen("infoDialog");
      result.current.onClose();
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.type).toBe(null);
    expect(result.current.data).toEqual({});
  });

  it("should set loading state correctly", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.setLoading(false);
    });

    expect(result.current.isLoading).toBe(false);
  });
});
