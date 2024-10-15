import { render } from "@testing-library/react";
import Skeleton from "../../components/Skeleton";

describe("Skeleton", () => {
  it("renders a skeleton item", () => {
    const { container } = render(<Skeleton />);

    const skeleton = container.querySelector("li");
    expect(skeleton).toBeInTheDocument();

    expect(skeleton).toHaveClass(
      "w-full",
      "h-4",
      "bg-gray-300",
      "rounded",
      "animate-pulse",
      "my-6"
    );
  });
});
