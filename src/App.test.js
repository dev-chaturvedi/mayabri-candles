import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders immersive collections page heading", () => {
  render(<App />);
  const heading = screen.getByRole("heading", {
    name: /collections/i,
  });
  expect(heading).toBeInTheDocument();
});
