"use client";
import React, { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const PRODUCTS_PER_PAGE = 10;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/product?page=${page}&limit=${PRODUCTS_PER_PAGE}`);
      const data = await response.json();
      if (data.success) {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setHasMore(data.products.length === PRODUCTS_PER_PAGE);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const loadMoreProducts = () => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{product.productName}</h2>
            <p>{product.productDes}</p>
            <p>Price: ${product.productPrice}</p>
            <p>Selling Price: ${product.sellingPrice}</p>
            <p>Discount: {product.discount}%</p>
            {product.productImages.length > 0 && (
              <div>
                {product.productImages.map((image, index) => (
                  <img
                    key={index}
                    src={`data:${image.contentType};base64,${image.data}`}
                    alt={product.productName}
                    className="w-full h-auto my-2 lazyload"
                    loading="lazy" // Lazy load images
                  />
                ))}
              </div>
            )}
          </div>
        ))}
        {loading && (
          Array(PRODUCTS_PER_PAGE).fill(0).map((_, index) => (
            <div key={index} className="border p-4 rounded animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
              <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
            </div>
          ))
        )}
      </div>
      {hasMore && !loading && (
        <button onClick={loadMoreProducts} className="mt-6 p-2 bg-blue-500 text-white rounded">
          Load More
        </button>
      )}
    </div>
  );
};

export default ProductsPage;
