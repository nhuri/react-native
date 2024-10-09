import { render, screen } from "@testing-library/react";
import ProductPage from "../pages/product/ProductPage";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// CI / CD

const mockUseLocationValue = {
  pathname: "/testroute",
  search: "",
  hash: "",
  state: { products: [] },
};

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn().mockImplementation(() => mockUseLocationValue),
  useNavigate: () => mockedNavigate,
}));

test("Test Prodcut Page Component", async () => {
  render(
    <MemoryRouter>
      <ProductPage />
    </MemoryRouter>
  );

  const element = screen.getByTestId("icon-element");

  await userEvent.click(element);

  expect(mockedNavigate).toHaveBeenCalled();
  expect(mockedNavigate).toHaveBeenCalledWith("/products", {
    state: { products: [] },
  });
});
