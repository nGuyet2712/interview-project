import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AppLayout from "../../layouts/AppLayout";

describe("AppLayout", () => {
  it("renders the static text", () => {
    render(
      <AppLayout>
        <div>Test Child</div>
      </AppLayout>
    );

    expect(screen.getByText(/An Official Website of the/i)).toBeInTheDocument();
    expect(screen.getByText(/Singapore Government/i)).toBeInTheDocument();
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
