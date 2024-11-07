import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { expect, describe, it, vi, beforeEach } from "vitest";
import { FeatureCard } from "../feature-card";
import useAuthStore from "@/store/auth-store";
import { useModal } from "@/store/modal-store";
import type { Item } from "@/services/marketplace-service";

// Mocking the zustand stores
vi.mock("@/store/auth-store");
vi.mock("@/store/modal-store");

// Sample product data
const mockProduct: Item = {
  id: "1",
  price: {
    value: "100",
    currency: "USD",
    maximum_value: "100",
  },
  code: "123",
  category_id: "1",
  sub_category_id: "1",
  description: "This is a sample project description",
  longDescription: "This is a sample project description",
  totalPrice: 100,
  descriptor: {
    name: "Sample Project",
    short_desc: "This is a sample project description",
    images: [],
  },
  services: [],

  provider: {
    id: "1",
    images: [],
    long_desc: "",
    short_desc: "",
    name: "Sample Provider",
  },
  type: "PROJECT",
};

describe("FeatureCard Component", () => {
  const mockOpenModal = vi.fn();
  const mockCloseModal = vi.fn();
  const mockSetOpenLoginNavbar = vi.fn();

  beforeEach(() => {
    // Mocking the zustand modal store
    // @ts-ignore
    (useModal as vi.Mock).mockReturnValue({
      onOpen: mockOpenModal,
      onClose: mockCloseModal,
    });

    // Mocking the zustand auth store
    // @ts-ignore

    (useAuthStore as vi.Mock).mockReturnValue({
      isAuthenticated: false,
      setOpenLoginNavbar: mockSetOpenLoginNavbar,
    });
  });

  it("renders the product details correctly", () => {
    render(
      <Router>
        <FeatureCard product={mockProduct} />
      </Router>,
    );

    // Check that the product name, provider, and short description are rendered
    expect(screen.getByText("Sample Project")).toBeInTheDocument();
    expect(screen.getByText("by Sample Provider")).toBeInTheDocument();
    expect(
      screen.getByText("This is a sample project description"),
    ).toBeInTheDocument();
  });

  it("opens the sign-in modal if not authenticated", () => {
    render(
      <Router>
        <FeatureCard product={mockProduct} />
      </Router>,
    );

    // Simulate clicking the card when the user is not authenticated
    fireEvent.click(screen.getByTestId("feature-card"));

    expect(mockOpenModal).toHaveBeenCalledWith("infoDialog", {
      infoDialog: {
        isLoading: false,
        title: "You Need to Sign in First",
        content:
          "Before viewing the details, please Sign In to your account. If you don't have an account yet, select Sign Up.",
        onConfirm: expect.any(Function),
        footerContent: expect.any(Object),
      },
    });
  });

  it("redirects to the product page if authenticated", () => {
    // Mock authenticated state
    // @ts-ignore
    (useAuthStore as vi.Mock).mockReturnValue({
      isAuthenticated: true,
      setOpenLoginNavbar: mockSetOpenLoginNavbar,
    });

    render(
      <Router>
        <FeatureCard product={mockProduct} />
      </Router>,
    );

    const link = screen.getByTestId("feature-card");
    expect(link).toHaveAttribute(
      "href",
      "/dashboard/placeorder/Sample Project",
    );
  });

  it("opens the sign-in modal if not authenticated", () => {
    render(
      <Router>
        <FeatureCard product={mockProduct} />
      </Router>,
    );

    // Simulate clicking the card when the user is not authenticated
    fireEvent.click(screen.getByTestId("feature-card"));

    expect(mockOpenModal).toHaveBeenCalledWith("infoDialog", {
      infoDialog: {
        isLoading: false,
        title: "You Need to Sign in First",
        content:
          "Before viewing the details, please Sign In to your account. If you don't have an account yet, select Sign Up.",
        onConfirm: expect.any(Function),
        footerContent: expect.any(Object),
      },
    });

    // Extract and invoke the onConfirm function from the modal payload to test the onClose callback
    const modalPayload = mockOpenModal.mock.calls[0][1];
    modalPayload.infoDialog.onConfirm();
    expect(mockCloseModal).toHaveBeenCalled();

    // Render footerContent and simulate button clicks to test setOpenLoginNavbar and onClose behaviors
    render(modalPayload.infoDialog.footerContent);
    const signInButton = screen.getByText("Sign In");
    fireEvent.click(signInButton);

    expect(mockSetOpenLoginNavbar).toHaveBeenCalledWith(true);
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("redirects to the product page if authenticated", () => {
    // Mock authenticated state
    (useAuthStore as vi.Mock).mockReturnValue({
      isAuthenticated: true,
      setOpenLoginNavbar: mockSetOpenLoginNavbar,
    });

    render(
      <Router>
        <FeatureCard product={mockProduct} />
      </Router>,
    );

    const link = screen.getByTestId("feature-card");
    expect(link).toHaveAttribute(
      "href",
      "/dashboard/placeorder/Sample Project",
    );
  });
});
