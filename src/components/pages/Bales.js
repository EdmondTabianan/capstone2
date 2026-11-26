
import { useState } from "react";
import "../../assets/css/Bales.css";
import productData from "../../data/product.json";

function Bales() {
  // Fetch bales data from product.json
  const [bales, setBales] = useState(productData.bales || []);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [supplier, setSupplier] = useState("ALL");

  // Get unique suppliers
  const suppliers = [
    ...new Set(bales.map((bale) => bale.supplier)),
  ];

  // Search and filter bales
  const filteredBales = bales.filter((bale) => {
    const matchesSearch =
      bale.id.toLowerCase().includes(search.toLowerCase()) ||
      bale.supplier.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "ALL" || bale.status === status;

    const matchesSupplier =
      supplier === "ALL" || bale.supplier === supplier;

    return matchesSearch && matchesStatus && matchesSupplier;
  });

  // Summary calculations
  const totalCost = bales.reduce(
    (sum, bale) => sum + Number(bale.cost || 0),
    0
  );

  const totalProfit = bales.reduce(
    (sum, bale) => sum + Number(bale.profit || 0),
    0
  );

  const formatCurrency = (amount) =>
    `₱${Number(amount).toLocaleString("en-PH")}`;

  // Delete bale
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this bale?")) {
      setBales((prev) =>
        prev.filter((bale) => bale.id !== id)
      );
    }
  };

  // View bale details
  const handleView = (bale) => {
    alert(
      `Bale ID: ${bale.id}
Supplier: ${bale.supplier}
Cost: ${formatCurrency(bale.cost)}
Stock: ${bale.stock}
Net Profit: ${formatCurrency(bale.profit)}
Status: ${bale.status}`
    );
  };

  // Edit bale stock
  const handleEdit = (bale) => {
    const newStock = window.prompt(
      "Enter updated stock quantity:",
      bale.stock
    );

    if (newStock === null || newStock.trim() === "") return;

    const parsedStock = Number(newStock);

    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    const newStatus =
      parsedStock === 0
        ? "SOLD OUT"
        : parsedStock <= 5
        ? "NEARLY SOLD"
        : "AVAILABLE";

    setBales((prev) =>
      prev.map((item) =>
        item.id === bale.id
          ? {
              ...item,
              stock: parsedStock,
              status: newStatus,
            }
          : item
      )
    );
  };

  return (
    <section className="bales-page">

      {/* Header */}
      <header className="bales-header">
        <h1>BALES MANAGEMENT</h1>
      </header>

      <div className="bales-content">

        {/* Page Title */}
        <div className="bales-title-row">
          <div>
            <h2>Bales Management</h2>
            <p>Manage and track bales received from suppliers</p>
          </div>

          <button
            className="add-bale-btn"
            onClick={() => alert("Add Bale feature coming soon.")}
          >
            + Add Bale
          </button>
        </div>

        {/* Summary Cards */}
        <div className="bales-summary">

          <div className="bale-card">
            <div className="bale-card-label">TOTAL BALES</div>
            <div className="bale-card-value">
              {bales.length}
            </div>
          </div>

          <div className="bale-card">
            <div className="bale-card-label">TOTAL SUPPLIERS</div>
            <div className="bale-card-value">
              {suppliers.length}
            </div>
          </div>

          <div className="bale-card">
            <div className="bale-card-label">TOTAL COST</div>
            <div className="bale-card-value">
              {formatCurrency(totalCost)}
            </div>
          </div>

          <div className="bale-card">
            <div className="bale-card-label">NET PROFIT</div>
            <div className="bale-card-value">
              {formatCurrency(totalProfit)}
            </div>
          </div>

        </div>

        {/* Search and Filters */}
        <div className="bales-filters">

          <input
            type="text"
            placeholder="Search by Bale ID or Supplier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="bales-filter-options">

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="NEARLY SOLD">Nearly Sold</option>
              <option value="SOLD OUT">Sold Out</option>
            </select>

            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            >
              <option value="ALL">All Suppliers</option>

              {suppliers.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* Bales Table */}
        <div className="bales-table-container">

          <table className="bales-table">

            <thead>
              <tr>
                <th>BALE ID</th>
                <th>SUPPLIER</th>
                <th>COST</th>
                <th>STOCK</th>
                <th>NET PROFIT</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredBales.length > 0 ? (
                filteredBales.map((bale) => (
                  <tr key={bale.id}>

                    <td className="bale-id">
                      {bale.id}
                    </td>

                    <td className="bale-supplier">
                      {bale.supplier}
                    </td>

                    <td className="bale-amount">
                      {formatCurrency(bale.cost)}
                    </td>

                    <td className={bale.stock === 0 ? "stock-zero" : ""}>
                      {bale.stock}
                    </td>

                    <td className="bale-amount">
                      {formatCurrency(bale.profit)}
                    </td>

                    <td>
                      <span
                        className={`bale-status ${bale.status
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {bale.status}
                      </span>
                    </td>

                    <td className="bale-actions">

                      <button
                        className="view-action"
                        title="View"
                        onClick={() => handleView(bale)}
                      >
                        View
                      </button>

                      <button
                        className="edit-action"
                        title="Edit"
                        onClick={() => handleEdit(bale)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-action"
                        title="Delete"
                        onClick={() => handleDelete(bale.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-bales">
                    No bales found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* Footer */}
        <div className="bales-footer">
          Showing {filteredBales.length} of {bales.length} entries
        </div>

      </div>
    </section>
  );
}

export default Bales;
