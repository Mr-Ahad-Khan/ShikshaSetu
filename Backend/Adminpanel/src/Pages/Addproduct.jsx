import { useState } from "react";
import { API_URL } from "./Api";

const initialForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "",
  image: "",
};

function Addproduct() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Product add nahi hua");
      }

      setMessage("Product successfully add ho gaya");
      setFormData(initialForm);
    } catch (err) {
      setError(err.message || "Backend se connect nahi ho pa raha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-page">
      <section className="product-shell">
        <div className="page-heading">
          <p>Admin Panel</p>
          <h1>Add Product</h1>
        </div>

        <form className="product-form" onSubmit={handleSubmit}>
          <label>
            Product Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </label>

          <label>
            Category
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
            />
          </label>

          <label>
            Price
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0"
              step="0.01"
              required
            />
          </label>

          <label>
            Stock
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock"
              min="0"
              required
            />
          </label>

          <label className="full-width">
            Image URL
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/product.jpg"
            />
          </label>

          <label className="full-width">
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="5"
              required
            />
          </label>

          {message && <p className="form-message success">{message}</p>}
          {error && <p className="form-message error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Addproduct;
