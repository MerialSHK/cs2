import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { AppRoutes } from './routes';
import './index.css';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}