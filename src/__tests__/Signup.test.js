import { render, screen } from "@testing-library/react";
import Signup from "../pages/Signup";
import { MemoryRouter } from "react-router-dom";

test("renders signup form inputs", () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
});
