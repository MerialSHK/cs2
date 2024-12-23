import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../../components/Dashboard/Layout/DashboardLayout';
import { Overview } from './Overview';
import { Profile } from './Profile';
import { Investments } from './Investments';
import { Settings } from './Settings';
import { UserManagement } from './Admin/UserManagement';
import { Permissions } from './Admin/Permissions';

export function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/permissions" element={<Permissions />} />
      </Routes>
    </DashboardLayout>
  );
}