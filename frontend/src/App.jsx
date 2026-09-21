import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import StrategyModal from './components/StrategyModal';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Services from './pages/Services';
import SredClaims from './pages/SredClaims';
import TaxAdvisory from './pages/TaxAdvisory';
import Accounting from './pages/Accounting';
import Financing from './pages/Financing';
import Incorporation from './pages/Incorporation';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import ArticleDetail from './pages/ArticleDetail';
import Contact from './pages/Contact';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import { fetchAllContent } from './api';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout({ children, onOpenStrategy, siteMeta }) {
  return (
    <>
      <Header onOpenStrategy={onOpenStrategy} siteMeta={siteMeta} />
      <main>{children}</main>
      <Footer siteMeta={siteMeta} />
    </>
  );
}

export default function App() {
  const [strategyOpen, setStrategyOpen] = useState(false);
  const [siteMeta, setSiteMeta] = useState({
    title: "DeFreitas & Associates — Executive Tax Accountants & Management Consultants",
    phone: "647-722-5442",
    toll_free: "1-855-227-9136",
    email: "info@defreitas-consulting.com",
    address: "255 Duncan Mill Road, Suite 409, Toronto, ON, M3B 3H9, Canada",
    logo_url: "/images/logo.png",
    footer_logo_url: "/images/footer_logo.png"
  });

  useEffect(() => {
    fetchAllContent()
      .then(res => {
        if (res && res.site_meta) {
          const meta = { ...res.site_meta };
          if (meta.logo_url && (meta.logo_url.includes('defreitas-consulting.ca/wp-content/uploads') || meta.logo_url === '/logo.png')) {
            meta.logo_url = '/images/logo.png';
          }
          if (meta.footer_logo_url && (meta.footer_logo_url.includes('defreitas-consulting.ca/wp-content/uploads') || meta.footer_logo_url === '/footer_logo.png')) {
            meta.footer_logo_url = '/images/footer_logo.png';
          }
          setSiteMeta(meta);
        }
      })
      .catch(err => console.warn("Using default site meta:", err.message));
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <StrategyModal isOpen={strategyOpen} onClose={() => setStrategyOpen(false)} />
      
      <Routes>
        {/* Admin Portal Routes (No Public Header/Footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Public Website Routes */}
        <Route 
          path="/" 
          element={
            <MainLayout onOpenStrategy={() => setStrategyOpen(true)} siteMeta={siteMeta}>
              <Home onOpenStrategy={() => setStrategyOpen(true)} />
            </MainLayout>
          } 
        />
        <Route 
          path="/services" 
          element={
            <MainLayout onOpenStrategy={() => setStrategyOpen(true)} siteMeta={siteMeta}>
              <Services onOpenStrategy={() => setStrategyOpen(true)} />
            </MainLayout>
          } 
        />
        <Route 
          path="/sred" 
          element={
            <MainLayout onOpenStrategy={() => setStrategyOpen(true)} siteMeta={siteMeta}>
              <SredClaims onOpenStrategy={() => setStrategyOpen(true)} />
            </MainLayout>
          } 
        />
        <Route 
          path="/tax-advisory" 
          element={
            <MainLayout onOpenStrategy={() => setStrategyOpen(true)} siteMeta={siteMeta}>
              <TaxAdvisory onOpenStrategy={() => setStrategyOpen(true)} />
            </MainLayout>
          } 
        />
        <Route 
          path="/accounting" 
          element={
            <MainLayout onOpenStrategy={() => setStrategyOpen(true)} siteMeta={siteMeta}>
              <Accounting onOpenStrategy={() => setStrategyOpen(true)} />
            </MainLayout>
          } 
        />
        <Route 
          path="/financing" 
          element={
            <MainLayout onOpenStrategy={() => setStrategyOpen(true)} siteMeta={siteMeta}>
              <Financing onOpenStrategy={() => setStrategyOpen(true)} />
            </MainLayout>
          } 
        />
        <Route 
          path="/incorporation" 
          element={
            <MainLayout onOpenStrategy={() => setStrategyOpen(true)} siteMeta={siteMeta}>
              <Incorporation onOpenStrategy={() => setStrategyOpen(true)} />
            </MainLayout>
          } 
        />
        <Route 
          path="/about" 
          element={
            <MainLayout onOpenStrategy={() => setStrategyOpen(true)} siteMeta={siteMeta}>
              <AboutUs onOpenStrategy={() => setStrategyOpen(true)} />
            </MainLayout>
          } 
        />
        <Route 
          path="/blog" 
          element={
            <MainLayout onOpenStrategy={() => setStrategyOpen(true)} siteMeta={siteMeta}>
              <Blog onOpenStrategy={() => setStrategyOpen(true)} />
            </MainLayout>
          } 
        />
        <Route 
          path="/blog/:slug" 
          element={
            <MainLayout onOpenStrategy={() => setStrategyOpen(true)} siteMeta={siteMeta}>
              <ArticleDetail onOpenStrategy={() => setStrategyOpen(true)} />
            </MainLayout>
          } 
        />
        <Route 
          path="/article/:slug" 
          element={
            <MainLayout onOpenStrategy={() => setStrategyOpen(true)} siteMeta={siteMeta}>
              <ArticleDetail onOpenStrategy={() => setStrategyOpen(true)} />
            </MainLayout>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <MainLayout onOpenStrategy={() => setStrategyOpen(true)} siteMeta={siteMeta}>
              <Contact />
            </MainLayout>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
