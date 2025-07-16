import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FormBuilder from './pages/FormBuilder';
import PublicForm from './pages/PublicForm';
import Responses from './pages/Responses';

function PrivateRoute({ children }) {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/builder/:id?" element={<PrivateRoute><FormBuilder /></PrivateRoute>} />
          <Route path="/admin/forms/:id/responses" element={<PrivateRoute><Responses /></PrivateRoute>} />
          <Route path="/f/:id" element={<PublicForm />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}