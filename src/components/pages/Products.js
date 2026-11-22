
import { useState } from "react";
import "../../assets/css/Products.css";

function Products() {
  const [products, setProducts] = useState([
    { id: 1, type: "T-SHIRT", category: "TOPS", price: 150, stocks: 100, sold: 80 },
    { id: 2, type: "JACKET", category: "TOPS", price: 150, stocks: 100, sold: 100 },
    { id: 3, type: "HOODIE", category: "TOPS", price: 350, stocks: 60, sold: 25 },
    { id: 4, type: "POLO SHIRT", category: "TOPS", price: 220, stocks: 80, sold: 45 },
    { id: 5, type: "JEANS", category: "BOTTOMS", price: 400, stocks: 70, sold: 66 },
    { id: 6, type: "SHORTS", category: "BOTTOMS", price: 180, stocks: 90, sold: 40 },
    { id: 7, type: "TROUSERS", category: "BOTTOMS", price: 320, stocks: 50, sold: 50 },
  ]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL PRODUCT");
  const [status, setStatus] = useState("ALL");

  const filteredProducts = products.filter((product) => {
    const remaining = product.stocks - product.sold;
    const productStatus = remaining === 0 ? "OUT OF STOCK" : "IN-STOCK";

    const matchesSearch =
      product.type.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "ALL PRODUCT" || product.category === category;

    const matchesStatus =
      status === "ALL" || productStatus === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  const handleView = (product) => {
    alert(
      `Product: ${product.type}\nCategory: ${product.category}\nPrice: ₱${product.price}\nStocks: ${product.stocks}\nSold: ${product.sold}`
    );
  };

  const handleEdit = (product) => {
    const newPrice = window.prompt(
      "Enter new product price:",
      product.price
    );

    if (newPrice === null) return;

    const parsedPrice = Number(newPrice);

    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      alert("Please enter a valid price.");
      return;
    }

    setProducts((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? { ...item, price: parsedPrice }
          : item
      )
    );
  };

  return (
    <section className="products-page">

      <header className="products-header">
        <div className="header-bar">
          <h1>PRODUCT MANAGEMENT</h1>
        </div>
      </header>

      <div className="products-content">

        <div className="products-top">
          <div>
            <h2>
              Category Type Name:{" "}
              <span>
                {category}
              </span>
            </h2>
            <p>{filteredProducts.length} products displayed</p>
          </div>

          <div className="category-actions">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="ALL PRODUCT">ALL PRODUCT</option>
              <option value="TOPS">TOPS</option>
              <option value="BOTTOMS">BOTTOMS</option>
            </select>

            <button
              className="add-category"
              onClick={() => alert("Add Category Type feature coming soon.")}
            >
              + Add Category Type
            </button>
          </div>
        </div>

        <div className="products-filters">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="IN-STOCK">In-Stock</option>
            <option value="OUT OF STOCK">Out of Stock</option>
          </select>

        </div>

        <div className="products-table-container">
          <table className="products-table">

            <thead>
              <tr>
                <th>#</th>
                <th>TYPE</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>STOCKS</th>
                <th>SOLD</th>
                <th>REMAINING STOCKS</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => {
                  const remaining = product.stocks - product.sold;
                  const isOutOfStock = remaining === 0;

                  return (
                    <tr key={product.id}>
                      <td>{index + 1}</td>

                      <td className="product-name">
                        {product.type}
                      </td>

                      <td>
                        <span className={`category-badge ${product.category.toLowerCase()}`}>
                          {product.category}
                        </span>
                      </td>

                      <td>₱{product.price.toLocaleString("en-PH")}</td>

                      <td>{product.stocks}</td>

                      <td>{product.sold}</td>

                      <td className={isOutOfStock ? "zero-stock" : ""}>
                        {remaining}
                      </td>

                      <td>
                        <span className={`status-badge ${isOutOfStock ? "out-stock" : "in-stock"}`}>
                          {isOutOfStock ? "OUT OF STOCK" : "IN-STOCK"}
                        </span>
                      </td>

                      <td className="product-actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>

                        <button
                          className="view-btn"
                          onClick={() => handleView(product)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="no-products">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </section>
  );
}

export default Products;
