import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const url = "https://fakestoreapi.com/products";

function ProductPage() {
  //  const { id } = useParams();
  //  const [product,setProduct] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state.product;
  const products = state.products;

  //  async function getProductById() {
  //   try {
  //    const { data } = await axios.get(`${url}/${id}`);
  //    setProduct(data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  //  }

  //  useEffect(() => {
  //   getProductById();
  //  },[])

  return (
    <div className="mx-auto w-[80%]">
      <FaArrowLeft
        data-testid="icon-element"
        onClick={() => navigate("/products", { state: products })}
        size={30}
      />
      <div className="w-[30%] text-center mx-auto">
        {product && <ProductCard {...product} id={null} />}
      </div>
    </div>
  );
}

export default ProductPage;
