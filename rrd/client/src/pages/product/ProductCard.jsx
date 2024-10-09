import React from "react";
import { Link } from "react-router-dom";

function ProductCard(props) {
  const { products , index } = props;
  const { id, image, title, description, price} = products[index]

  return (
    <Link
      to={id && `${id}`}
      state={{ product: props, products: products }}
      className="product_card mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"
    >
      <img
        className="h-56 w-full object-cover object-center"
        src={image}
        alt="Product Image"
      />
      <div className="p-4">
        <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
          {title}
        </h2>
        <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
          {description}
        </p>
        <div className="flex items-center">
          <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
            {(price * 0.8).toFixed(2)}$
          </p>
          <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
            {price}$
          </p>
          <p className="ml-auto text-base font-medium text-green-500">
            20% off
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
