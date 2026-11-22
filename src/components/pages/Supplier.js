
import { useState } from "react";
import "../../assets/css/Suppliers.css";

function Supplier() {
  const [suppliers, setSuppliers] = useState([
    {
      id: "SUP-001",
      name: "Garment Corp",
      contact: "09123456789",
      address: "Quezon City",
      notes: "Regular supplier - Premium quality garments",
      status: "ACTIVE",
      bales: 1,
      spent: 3000,
    },
    {
      id: "SUP-002",
      name: "Fashion Hub",
      contact: "09234567890",
      address: "Makati City",
      notes: "Trendy fashion items - Fast delivery",
      status: "ACTIVE",
      bales: 1,
      spent: 3000,
    },
    {
      id: "SUP-003",
      name: "Textile Supplies",
      contact: "09345678901",
      address: "Manila",
      notes: "Bulk textile supplier - Wholesale prices",
      status: "ACTIVE",
      bales: 1,
      spent: 3000,
    },
    {
      id: "SUP-004",
      name: "Clothing Wholesale",
      contact: "09456789012",
      address: "Pasig City",
      notes: "New supplier - Competitive pricing",
      status: "INACTIVE",
      bales: 1,
      spent: 3000,
    },
  ]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const totalSuppliers = suppliers.length;

  const totalBales = suppliers.reduce(
    (sum, supplier) => sum + supplier.bales,
    0
  );

  const activeSuppliers = suppliers.filter(
    (supplier) => supplier.status === "ACTIVE"
  ).length;

  const totalSpent = suppliers.reduce(
    (sum, supplier) => sum + supplier.spent,
    0
  );

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(search.toLowerCase()) ||
      supplier.id.toLowerCase().includes(search.toLowerCase()) ||
      supplier.contact.includes(search);

    const matchesStatus =
      status === "ALL" || supplier.status === status;

    return matchesSearch && matchesStatus;
  });

  // Add Supplier
  const handleAdd = () => {
    const name = window.prompt("Enter supplier name:");
    if (!name || !name.trim()) return;

    const contact = window.prompt("Enter contact number:");
    if (contact === null) return;

    const address = window.prompt("Enter supplier address:");
    if (address === null) return;

    const notes = window.prompt("Enter supplier notes:") || "No notes";

    const newSupplier = {
      id: `SUP-${String(Date.now()).slice(-6)}`,
      name: name.trim(),
      contact,
      address,
      notes,
      status: "ACTIVE",
      bales: 0,
      spent: 0,
    };

    setSuppliers((prev) => [...prev, newSupplier]);
  };

  // View Supplier
  const handleView = (supplier) => {
    alert(
      `SUPPLIER DETAILS\n\n` +
      `Supplier ID: ${supplier.id}\n` +
      `Name: ${supplier.name}\n` +
      `Contact: ${supplier.contact}\n` +
      `Address: ${supplier.address}\n` +
      `Notes: ${supplier.notes}\n` +
      `Status: ${supplier.status}`
    );
  };

  // Edit Supplier
  const handleEdit = (supplier) => {
    const name = window.prompt("Supplier Name:", supplier.name);
    if (name === null) return;
    if (!name.trim()) {
      alert("Supplier name cannot be empty.");
      return;
    }

    const contact = window.prompt("Contact Number:", supplier.contact);
    if (contact === null) return;

    const address = window.prompt("Address:", supplier.address);
    if (address === null) return;

    const notes = window.prompt("Notes:", supplier.notes);
    if (notes === null) return;

    setSuppliers((prev) =>
      prev.map((item) =>
        item.id === supplier.id
          ? {
              ...item,
              name: name.trim(),
              contact,
              address,
              notes,
            }
          : item
      )
    );
  };

  // Delete Supplier
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      setSuppliers((prev) =>
        prev.filter((supplier) => supplier.id !== id)
      );
    }
  };

  return (
    <section className="supplier-page">

      {/* Header */}
      <header className="supplier-header">
        <h1>SUPPLIER MANAGEMENT</h1>
      </header>

      <div className="supplier-content">

        {/* Page Title */}
        <div className="supplier-title-row">
          <div>
            <h2>Supplier Management</h2>
            <p>Manage supplier information and records</p>
          </div>

          <button className="add-supplier-btn" onClick={handleAdd}>
            + Add Supplier
          </button>
        </div>

        {/* Summary Cards */}
        <div className="supplier-summary">

          <div className="supplier-card">
            <div className="supplier-card-label">TOTAL SUPPLIERS</div>
            <div className="supplier-card-value">{totalSuppliers}</div>
          </div>

          <div className="supplier-card">
            <div className="supplier-card-label">TOTAL BALES</div>
            <div className="supplier-card-value">{totalBales}</div>
          </div>

          <div className="supplier-card">
            <div className="supplier-card-label">ACTIVE SUPPLIERS</div>
            <div className="supplier-card-value">{activeSuppliers}</div>
          </div>

          <div className="supplier-card">
            <div className="supplier-card-label">TOTAL SPENT</div>
            <div className="supplier-card-value">
              ₱{totalSpent.toLocaleString("en-PH")}
            </div>
          </div>

        </div>

        {/* Search and Filter */}
        <div className="supplier-filters">

          <input
            type="text"
            placeholder="Search supplier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

        </div>

        {/* Supplier Table */}
        <div className="supplier-table-container">

          <table className="supplier-table">

            <thead>
              <tr>
                <th>SUPPLIER</th>
                <th>CONTACT</th>
                <th>ADDRESS</th>
                <th>NOTES</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id}>

                    <td>
                      <div className="supplier-name">
                        {supplier.name}
                      </div>
                      <div className="supplier-id">
                        {supplier.id}
                      </div>
                    </td>

                    <td>{supplier.contact}</td>

                    <td>{supplier.address}</td>

                    <td className="supplier-notes">
                      {supplier.notes}
                    </td>

                    <td>
                      <span
                        className={`supplier-status ${supplier.status.toLowerCase()}`}
                      >
                        {supplier.status}
                      </span>
                    </td>

                    <td className="supplier-actions">

                      <button
                        className="supplier-view"
                        onClick={() => handleView(supplier)}
                        title="View"
                      >
                        View
                      </button>

                      <button
                        className="supplier-edit"
                        onClick={() => handleEdit(supplier)}
                        title="Edit"
                      >
                        Edit
                      </button>

                      <button
                        className="supplier-delete"
                        onClick={() => handleDelete(supplier.id)}
                        title="Delete"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="supplier-empty">
                    No suppliers found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        <div className="supplier-footer">
          Showing {filteredSuppliers.length} of {suppliers.length} entries
        </div>

      </div>
    </section>
  );
}

export default Supplier;
