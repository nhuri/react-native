import { render, screen } from "@testing-library/react";
import ProductCard from "../pages/product/ProductCard";
import { MemoryRouter , Router} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

const product = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120,
  },
};

describe("test Prodcut Card Component", () => {
  test("test Product Props visible in the Component", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} products={[]} />
      </MemoryRouter>
    );

    const element = screen.getByRole("heading", { name: product.title });

    expect(element).toBeInTheDocument();
  });
  test("Test ProductCard Component when clicked",async () => {

   const history = createMemoryHistory({initialEntries: ["/"]});

   const { container } = render(
        <Router location={history.location} navigator={history}>
          <ProductCard product={product} products={[]} />
        </Router>
      );

    const link = container.querySelector(".product_card");

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href',"/1")

    await userEvent.click(link);


    expect(history.location.pathname).toBe("/1")
  })
});
