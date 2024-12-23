import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Hero } from '../components/Home/Hero';
import { Dashboard } from '../pages/Dashboard';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}