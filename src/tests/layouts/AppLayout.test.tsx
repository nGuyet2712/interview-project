import { render, screen } from "@testing-library/react";
import AppLayout from "../../layouts/AppLayout";

describe("AppLayout", () => {
  it("renders the logo", () => {
    render(
      <AppLayout>
        <div>Test Child</div>
      </AppLayout>
    );

    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", expect.stringContaining("logo.svg"));
  });

  it("renders the static text", () => {
    render(
      <AppLayout>
        <div>Test Child</div>
      </AppLayout>
    );

    expect(screen.getByText("An Official Website of the")).toBeInTheDocument();
    expect(
      screen.getByText("Singapore Government", { exact: false })
    ).toBeInTheDocument();
  });

  it("renders children passed to the component", () => {
    render(
      <AppLayout>
        <div>Test Child</div>
      </AppLayout>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
