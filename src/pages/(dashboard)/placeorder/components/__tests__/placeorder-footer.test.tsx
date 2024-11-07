import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Footer from "../placeorder-footer";
import { useModal } from "@/store/modal-store";
import { usePlaceOrderInit } from "@/services/placeorder-init-service";
import { usePlaceOrderConfirm } from "@/services/placeorder-confirm-service";

// Mock the necessary hooks and components
vi.mock("@/store/modal-store", () => ({
  useModal: vi.fn(),
}));

vi.mock("@/services/placeorder-init-service", () => ({
  usePlaceOrderInit: vi.fn(),
}));

vi.mock("@/services/placeorder-confirm-service", () => ({
  usePlaceOrderConfirm: vi.fn(),
}));

vi.mock("@/hooks/use-toast", () => ({
  toast: vi.fn(),
}));

const mockOpen = vi.fn();
const mockClose = vi.fn();
const mockSetLoading = vi.fn();
const mockMutateAsync = vi.fn();
const mockConfirmMutateAsync = vi.fn();

beforeEach(() => {
  (useModal as vi.Mock).mockReturnValue({
    onOpen: mockOpen,
    onClose: mockClose,
    setLoading: mockSetLoading,
  });

  (usePlaceOrderInit as vi.Mock).mockReturnValue({
    isPending: false,
    mutateAsync: mockMutateAsync,
  });

  (usePlaceOrderConfirm as vi.Mock).mockReturnValue({
    mutateAsync: mockConfirmMutateAsync,
    isPending: false,
  });

  // Clear mock calls before each test
  vi.clearAllMocks();
});

describe("Footer Component", () => {
  const mockProps = {
    title: "Test Service",
    id: "test-id",
    items: [{ id: "item-1" }, { id: "item-2" }],
    selectedServices: [{ id: "service-1", name: "Service A" }],
    total_payment_amount: 100,
    isGetQuotePending: false,
  };

  it("opens confirmation modal on button click", async () => {
    mockMutateAsync.mockResolvedValue([
      {
        message: {
          catalogs: { responses: [{ message: { order: { billing: {} } } }] },
        },
      },
    ]);

    render(
      <MemoryRouter>
        <Footer {...mockProps} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText("Place Order"));

    await waitFor(() => {
      expect(mockOpen).toHaveBeenCalledWith(
        "confirmationDialog",
        expect.any(Object),
      );
    });
  });

  it("disables the button when isPending or isGetQuotePending is true", () => {
    (usePlaceOrderInit as vi.Mock).mockReturnValue({
      isPending: true,
      mutateAsync: mockMutateAsync,
    });

    render(
      <MemoryRouter>
        <Footer {...mockProps} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
