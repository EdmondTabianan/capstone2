import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../../assets/css/Sidebar.css";

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/product', label: 'Product' },
  { to: '/Bales', label: 'Bales' },
  { to: '/supplier', label: 'Supplier' },
  { to: '/income-report', label: 'Income Report' },
  { to: '/settings', label: 'Settings' },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <>
      <header className="mobile-header">
        <button
          type="button"
          className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="sidebar-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <span className="mobile-header-title">INVENTORY SYSTEM</span>
      </header>

      {isOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close navigation menu"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        id="sidebar-navigation"
        className={`sidebar ${isOpen ? 'open' : ''}`}
      >
        <div className="sidebar-brand">
          <span className="brand-title">INVENTORY</span>
          <span className="brand-title">SYSTEM</span>
        </div>

        <nav className="sidebar-nav">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon" aria-hidden="true">
                {label === 'Dashboard' && '▣'}
                {label === 'Product' && '◫'}
                {label === 'Bales' && '◈'}
                {label === 'Supplier' && '◧'}
                {label === 'Income Report' && '◩'}
                {label === 'Settings' && '⚙'}
              </span>
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
