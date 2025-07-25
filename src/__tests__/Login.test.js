import { render, screen } from "@testing-library/react";
import Login from "../pages/Login";
import { MemoryRouter } from "react-router-dom";

test("renders login form inputs", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
});
