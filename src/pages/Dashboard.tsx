import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../components/Dashboard/Layout/DashboardLayout';
import { Overview } from './Dashboard/Overview';
import { Profile } from './Dashboard/Profile';
import { Investments } from './Dashboard/Investments';
import { Settings } from './Dashboard/Settings';
import { UserManagement } from './Dashboard/Admin/UserManagement';
import { Permissions } from './Dashboard/Admin/Permissions';
import { InvestmentManagement } from './Dashboard/Admin/InvestmentManagement';

export function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="profile" element={<Profile />} />
        <Route path="investments" element={<Investments />} />
        <Route path="settings" element={<Settings />} />
        <Route path="admin/users" element={<UserManagement />} />
        <Route path="admin/permissions" element={<Permissions />} />
        <Route path="admin/investments" element={<InvestmentManagement />} />
      </Routes>
    </DashboardLayout>
  );
}