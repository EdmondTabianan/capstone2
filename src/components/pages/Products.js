
import { useState } from "react";
import {
  Package,
  Shirt,
  Layers,
  Boxes,
  ShoppingCart,
  Warehouse,
  Pencil,
  Trash2,
  Eye,
  Tags,
} from "lucide-react";

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

  // FILTER PRODUCTS
  const filteredProducts = products.filter((product) => {
    const remaining = product.stocks - product.sold;
    const productStatus = remaining === 0 ? "OUT OF STOCK" : "IN-STOCK";

    const matchesSearch = product.type
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "ALL PRODUCT" || product.category === category;

    const matchesStatus =
      status === "ALL" || productStatus === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // GROUP PRODUCTS BY CATEGORY
  const groupedProducts = filteredProducts.reduce((groups, product) => {
    if (!groups[product.category]) {
      groups[product.category] = [];
    }

    groups[product.category].push(product);

    return groups;
  }, {});

  // DELETE PRODUCT
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
    }
  };

  // VIEW PRODUCT
  const handleView = (product) => {
    const remaining = product.stocks - product.sold;

    alert(
      `Product: ${product.type}\n` +
      `Category: ${product.category}\n` +
      `Price: ₱${product.price}\n` +
      `Stocks: ${product.stocks}\n` +
      `Sold: ${product.sold}\n` +
      `Remaining Stocks: ${remaining}\n` +
      `Status: ${remaining === 0 ? "OUT OF STOCK" : "IN-STOCK"}`
    );
  };

  // EDIT PRODUCT
  const handleEdit = (product) => {
    const newPrice = window.prompt(
      "Enter new product price:",
      product.price
    );

    if (newPrice === null) return;

    if (newPrice.trim() === "") {
      alert("Price cannot be empty.");
      return;
    }

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

      {/* PAGE HEADER */}
      <header className="products-header">
        <div className="header-bar">
          <h1>
            <Package size={23} />
            PRODUCT MANAGEMENT
          </h1>
        </div>
      </header>

      <div className="products-content">

        {/* CATEGORY TITLE AND ACTIONS */}
        <div className="products-top">

          <div>
            <h2>
              Category Type Name:{" "}
              <span>{category}</span>
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
              onClick={() =>
                alert("Add Category Type feature coming soon.")
              }
            >
              + Add Category Type
            </button>

          </div>
        </div>

        {/* SEARCH AND STATUS FILTER */}
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

        {/* CATEGORY CARD GRID */}
        <div className="category-card-grid">

          {Object.keys(groupedProducts).length > 0 ? (

            Object.entries(groupedProducts).map(
              ([categoryName, categoryProducts]) => (

                <div
                  className="category-product-card"
                  key={categoryName}
                >

                  {/* CATEGORY HEADER */}
                  <div className="category-product-header">

                    <div className="category-title">

                      <div
                        className={`category-icon ${categoryName.toLowerCase()}`}
                      >
                        {categoryName === "TOPS" ? (
                          <Shirt size={22} />
                        ) : (
                          <Layers size={22} />
                        )}
                      </div>

                      <div>
                        <h3>{categoryName}</h3>
                        <p>
                          {categoryProducts.length} Products
                        </p>
                      </div>

                    </div>

                    <span
                      className={`category-badge ${categoryName.toLowerCase()}`}
                    >
                      <Tags size={13} />
                      {categoryName}
                    </span>

                  </div>

                  {/* PRODUCTS INSIDE CATEGORY */}
                  <div className="category-product-list">

                    {categoryProducts.map((product) => {

                      const remaining =
                        product.stocks - product.sold;

                      const isOutOfStock = remaining === 0;

                      return (

                        <div
                          className="individual-product-card"
                          key={product.id}
                        >

                          {/* PRODUCT NAME AND STATUS */}
                          <div className="individual-product-header">

                            <div className="product-name-icon">
                              <Package size={18} />
                              <h4>{product.type}</h4>
                            </div>

                            <span
                              className={`status-badge ${
                                isOutOfStock
                                  ? "out-stock"
                                  : "in-stock"
                              }`}
                            >
                              {isOutOfStock
                                ? "OUT OF STOCK"
                                : "IN-STOCK"}
                            </span>

                          </div>

                          {/* PRODUCT PRICE */}
                          <div className="product-price">
                            ₱{product.price.toLocaleString("en-PH")}
                          </div>

                          {/* STOCK INFORMATION */}
                          <div className="product-stock-grid">

                            <div>
                              <span>
                                <Boxes size={14} />
                                Stocks
                              </span>

                              <strong>{product.stocks}</strong>
                            </div>

                            <div>
                              <span>
                                <ShoppingCart size={14} />
                                Sold
                              </span>

                              <strong>{product.sold}</strong>
                            </div>

                            <div>
                              <span>
                                <Warehouse size={14} />
                                Remaining
                              </span>

                              <strong
                                className={
                                  isOutOfStock ? "zero-stock" : ""
                                }
                              >
                                {remaining}
                              </strong>
                            </div>

                          </div>

                          {/* PRODUCT ACTIONS */}
                          <div className="product-actions">

                            <button
                              className="edit-btn"
                              onClick={() => handleEdit(product)}
                            >
                              <Pencil size={14} />
                              Edit
                            </button>

                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleDelete(product.id)
                              }
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>

                            <button
                              className="view-btn"
                              onClick={() => handleView(product)}
                            >
                              <Eye size={14} />
                              View
                            </button>

                          </div>

                        </div>

                      );
                    })}

                  </div>

                </div>

              )
            )

          ) : (

            <div className="no-products">
              No products found.
            </div>

          )}

        </div>

      </div>
    </section>
  );
}

export default Products;
