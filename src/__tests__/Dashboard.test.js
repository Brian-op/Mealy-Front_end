import { render, screen } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";
import { MemoryRouter } from "react-router-dom";

test("renders dashboard header", () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
  expect(screen.getByText(/Today's Menu/i)).toBeInTheDocument();
});
