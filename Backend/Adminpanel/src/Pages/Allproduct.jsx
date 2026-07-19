import { useEffect, useState } from "react";
import { API_URL } from "./Api";

export default function AllProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Products fetch nahi hue");
        }

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message || "Backend se connect nahi ho pa raha");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    const numericPrice = Number(price);
    return Number.isFinite(numericPrice) ? `$${numericPrice.toFixed(2)}` : "-";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && <p>Loading products...</p>}
      {error && <p className="form-message error">{error}</p>}

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th>Product name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Image</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id || product._id}
              className="border-t border-gray-300"
            >
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.category || "-"}</td>
              <td className="px-4 py-2">{formatPrice(product.price)}</td>
              <td className="px-4 py-2">{product.stock}</td>
              <td className="px-4 py-2">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}

          {!loading && !error && products.length === 0 && (
            <tr>
              <td className="px-4 py-2" colSpan="5">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
