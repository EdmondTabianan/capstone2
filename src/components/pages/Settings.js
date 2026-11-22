import "../../assets/css/Settings.css";

function Settings() {

const accounts = [
  {
    id: "ACC-001",
    username: "admin",
    name: "System Administrator",
    email: "admin@gmail.com",
    role: "Admin",
    status: "Active"
  },
  {
    id: "ACC-002",
    username: "john",
    name: "John Smith",
    email: "john@gmail.com",
    role: "Staff",
    status: "Active"
  },
  {
    id: "ACC-003",
    username: "mary",
    name: "Mary Santos",
    email: "mary@gmail.com",
    role: "Staff",
    status: "Active"
  },
  {
    id: "ACC-004",
    username: "peter",
    name: "Peter Cruz",
    email: "peter@gmail.com",
    role: "Staff",
    status: "Inactive"
  }
];

  return (
    <div className="settings-page">
      <div className="settings-title">
        <div>
          <h2>System Settings</h2>
          <p>Manage your inventory system preferences and configurations.</p>
        </div>
      </div>

      <div className="settings-grid">

        {/* General Settings */}
        <div className="settings-card">
          <h3>General Settings</h3>
          <p>Configure basic system information.</p>

          <div className="settings-field">
            <label>System Name</label>
            <input type="text" defaultValue="Inventory Management System" />
          </div>

          <div className="settings-field">
            <label>Company Name</label>
            <input type="text" placeholder="Enter company name" />
          </div>

          <div className="settings-field">
            <label>Currency</label>
            <select defaultValue="PHP">
              <option value="PHP">Philippine Peso (₱)</option>
              <option value="USD">US Dollar ($)</option>
            </select>
          </div>

          <button className="settings-save">Save Changes</button>
        </div>

        {/* Inventory Settings */}
        <div className="settings-card">
          <h3>Inventory Settings</h3>
          <p>Manage product and stock configurations.</p>

          <div className="settings-field">
            <label>Low Stock Alert</label>
            <input type="number" defaultValue="10" min="0" />
          </div>

          <div className="settings-field">
            <label>Default Stock Status</label>
            <select defaultValue="Available">
              <option>Available</option>
              <option>Out of Stock</option>
            </select>
          </div>

          <div className="settings-field">
            <label>Stock Tracking</label>
            <select defaultValue="Enabled">
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </div>

          <button className="settings-save">Save Changes</button>
        </div>

        
{/* Account Management */}

<div className="account-management">
  <div className="account-header">
    <div>
      <h3>Account Management</h3>
      <p>View and manage all registered system accounts.</p>
    </div>

    <button className="settings-save">
      + Add Account
    </button>
  </div>

  <div className="account-summary">
    <div>
      <span>Total Accounts</span>
      <strong>{accounts.length}</strong>
    </div>
    <div>
      <span>Active Accounts</span>
      <strong>
        {accounts.filter(a => a.status === "Active").length}
      </strong>
    </div>
    <div>
      <span>Inactive Accounts</span>
      <strong>
        {accounts.filter(a => a.status === "Inactive").length}
      </strong>
    </div>
  </div>

  <div className="account-table-wrapper">
    <table className="account-table">
      <thead>
        <tr>
          <th>Account ID</th>
          <th>Username</th>
          <th>Full Name</th>
          <th>Email Address</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {accounts.map(account => (
          <tr key={account.id}>
            <td>{account.id}</td>
            <td>{account.username}</td>
            <td>{account.name}</td>
            <td>{account.email}</td>
            <td>
              <span className={`account-role ${account.role.toLowerCase()}`}>
                {account.role}
              </span>
            </td>
            <td>
              <span className={`account-status ${account.status.toLowerCase()}`}>
                {account.status}
              </span>
            </td>
            <td>
              <div className="account-actions">
                <button title="View">View</button>
                <button title="Edit">Edit</button>
                <button title="Delete">Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


        {/* Notification Settings */}
        <div className="settings-card">
          <h3>Notification Settings</h3>
          <p>Manage system alerts and notifications.</p>

          <div className="settings-option">
            <div>
              <strong>Low Stock Notifications</strong>
              <small>Receive alerts when products reach low stock.</small>
            </div>
            <input type="checkbox" defaultChecked />
          </div>

          <div className="settings-option">
            <div>
              <strong>Out of Stock Alerts</strong>
              <small>Get notified when products are out of stock.</small>
            </div>
            <input type="checkbox" defaultChecked />
          </div>

          <div className="settings-option">
            <div>
              <strong>Sales Notifications</strong>
              <small>Receive notifications about sales transactions.</small>
            </div>
            <input type="checkbox" defaultChecked />
          </div>

          <button className="settings-save">Save Preferences</button>
        </div>

      </div>
    </div>
  );
}

export default Settings;
