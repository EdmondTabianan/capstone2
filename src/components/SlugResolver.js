import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Bales from './pages/Bales';
import Supplier from './pages/Supplier';
import IncomeReport from './pages/IncomeReport';
import Settings from './pages/Settings';
import pageRoutes from '../data/pages.json';

const componentMap = {
  Dashboard,
  Products,
  Bales,
  Supplier,
  IncomeReport,
  Settings,
};

const pages = pageRoutes.reduce((acc, { slug, component }) => {
  acc[slug] = component;
  return acc;
}, {});

function PageBySlug() {
  const { slug = 'dashboard' } = useParams();
  const normalizedSlug = String(slug).toLowerCase();
  const pageName = pages[normalizedSlug] || 'Dashboard';
  const PageComponent = componentMap[pageName] || Dashboard;

  return (
    <main className="page-shell">
      <PageComponent />
    </main>
  );
}

function SlugResolver() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/home" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product" element={<Products />} />
            <Route path="/Bales" element={<Bales />} />
            <Route path="/supplier" element={<Supplier />} />
            <Route path="/income-report" element={<IncomeReport />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/:slug" element={<PageBySlug />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default SlugResolver;
