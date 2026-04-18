/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Role, User } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Landing from './components/Landing';
import PatientDashboard from './components/PatientDashboard';
import SymptomChecker from './components/SymptomChecker';
import DoctorDashboard from './components/DoctorDashboard';
import FindDoctors from './components/FindDoctors';
import MedicineOrders from './components/MedicineOrders';
import MedicalHistory from './components/MedicalHistory';
import Appointments from './components/Appointments';
import Prescriptions from './components/Prescriptions';
import MyOrders from './components/MyOrders';
import Wallet from './components/Wallet';
import { LabDashboard, PharmacyDashboard, DeliveryDashboard, AdminDashboard } from './components/RoleDashboards';
import Profile from './components/Profile';
import AIChat from './components/AIChat';

function AppLayout({ user, onLogout }: { user: User; onLogout: () => void }) {
  const getDashboardByRole = () => {
    switch (user.role) {
      case 'PATIENT': return <PatientDashboard />;
      case 'DOCTOR': return <DoctorDashboard />;
      case 'LAB': return <LabDashboard />;
      case 'PHARMACY': return <PharmacyDashboard />;
      case 'DELIVERY': return <DeliveryDashboard />;
      case 'ADMIN': return <AdminDashboard />;
      default: return <PatientDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-bg-main bg-ekg-grid">
      <Sidebar role={user.role} onLogout={onLogout} />
      <div className="flex-1 ml-72 flex flex-col min-h-screen">
        <Header user={user} />
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full max-w-screen-2xl mx-auto">
          <Routes>
            <Route path="/dashboard" element={getDashboardByRole()} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/find-doctors" element={<FindDoctors />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/order-medicines" element={<MedicineOrders />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/medical-history" element={<MedicalHistory />} />
            <Route path="/settings" element={<Profile user={user} />} />
            <Route path="/chatbot" element={<div className="section-card"><h2 className="text-xl font-bold">AI Chatbot Full Screen</h2><p className="text-text-secondary mt-2">Enhanced health assistant interface is coming soon.</p></div>} />
            
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        <AIChat user={user} />
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('nirvaaan_user_v2');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleRoleSelect = (role: Role) => {
    const mockUser: User = {
      id: Math.floor(Math.random() * 10000).toString(),
      name: 'Alex Johnson',
      email: 'alex.j@nirvaaan.ai',
      role: role,
      avatar: `https://picsum.photos/seed/${role}/200/200`
    };
    setUser(mockUser);
    localStorage.setItem('nirvaaan_user_v2', JSON.stringify(mockUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nirvaaan_user_v2');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" replace /> : <Landing onSelectRole={handleRoleSelect} onLogin={() => handleRoleSelect('PATIENT')} />} 
        />
        <Route 
          path="/*" 
          element={
            !user ? <Navigate to="/" replace /> : 
            <AppLayout user={user} onLogout={handleLogout} />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}


