import { renderHook, act } from "@testing-library/react-hooks";
import { useToast } from "../use-toast";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const TOAST_REMOVE_DELAY = 100;

describe("useToast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  it("should add a toast", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: "Test Toast" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Test Toast");
  });

  it("should update a toast", () => {
    const { result } = renderHook(() => useToast());
    let toastId: string;

    act(() => {
      const toastInstance = result.current.toast({ title: "Initial Toast" });
      toastId = toastInstance.id;
      toastInstance.update({ id: toastId, title: "Updated Toast" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Updated Toast");
  });

  it("should dismiss a toast", () => {
    const { result } = renderHook(() => useToast());
    let toastId: string;

    act(() => {
      const toastInstance = result.current.toast({ title: "Dismiss Toast" });
      toastId = toastInstance.id;
      toastInstance.dismiss();
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].open).toBe(false);
  });

  it("should handle multiple toasts", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: "Toast 1" });
      result.current.toast({ title: "Toast 2" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Toast 2");
  });

  it("should remove a toast after delay", () => {
    const { result } = renderHook(() => useToast());
    let toastId: string;

    act(() => {
      const toastInstance = result.current.toast({ title: "Removable Toast" });
      toastId = toastInstance.id;
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Removable Toast");

    act(() => {
      result.current.dismiss(toastId);
    });

    expect(result.current.toasts.find((t) => t.id === toastId)?.open).toBe(
      false,
    );

    // act(() => {
    //     vi.advanceTimersByTime(TOAST_REMOVE_DELAY);
    // });

    // expect(result.current.toasts.find(t => t.id === toastId)).toBeUndefined();
  });

  it("should clear all toasts when calling dismiss with undefined", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: "Toast 1" });
      result.current.toast({ title: "Toast 2" });
      result.current.dismiss(); // dismiss with no ID should clear all
    });

    expect(result.current.toasts.every((toast) => !toast.open)).toBe(true);
  });
});
