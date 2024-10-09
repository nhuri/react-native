import React from "react";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const url = "https://fakestoreapi.com/products";

// ReRender => function => setState => render => function => setState => render;
// result => useEffect
function Products() {

  const { state } = useLocation();
  
  const [products,setProducts] = useState(state ? state : []);

  async function getProducts(){
    try {
    const { data } = await axios.get(url)
     setProducts(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
   if(!state) getProducts();
  },[])
  
  return (
    <div className="flex justify-between flex-wrap">
      {products?.map((product,i) => (
        <ProductCard key={product.id} index={i} products={products} />
      ))}
    </div>
  );
}

export default Products;
