import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders MayAbri heading", () => {
  render(<App />);
  const heading = screen.getByRole("heading", {
    name: /handcrafted candles for modern gifting and cozy homes/i,
  });
  expect(heading).toBeInTheDocument();
});
