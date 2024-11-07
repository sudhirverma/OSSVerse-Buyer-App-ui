import { render, screen } from "@testing-library/react";
import PlaceorderHeader from "../placeorder-header";

describe("PlaceorderHeader", () => {
  const title = "Sample Title";
  const description = "This is a sample description.";

  it("renders with project type and displays title and description", () => {
    render(
      <PlaceorderHeader
        type="PROJECT"
        title={title}
        description={description}
      />,
    );

    expect(screen.getByText(/sample title/i)).toBeInTheDocument();
    expect(
      screen.getByText(/this is a sample description/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/didn't find oss arifact available in the listing/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /place an on-demand request for one or more solution from the below list/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /request/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /projecticon/i }),
    ).toBeInTheDocument();
  });

  it("renders with ML model type and displays title and description", () => {
    render(
      <PlaceorderHeader
        type="ML_MODEL"
        title={title}
        description={description}
      />,
    );

    expect(screen.getByText(/sample title/i)).toBeInTheDocument();
    expect(
      screen.getByText(/this is a sample description/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /mlmodelicon/i }),
    ).toBeInTheDocument();
  });

  it("displays request info message", () => {
    render(
      <PlaceorderHeader
        type="PROJECT"
        title={title}
        description={description}
      />,
    );

    expect(
      screen.getByText(/didn't find oss arifact available in the listing/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /place an on-demand request for one or more solution from the below list/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders the request button", () => {
    render(
      <PlaceorderHeader
        type="PROJECT"
        title={title}
        description={description}
      />,
    );

    expect(
      screen.getByRole("button", { name: /request/i }),
    ).toBeInTheDocument();
  });
});
