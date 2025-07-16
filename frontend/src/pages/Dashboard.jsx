import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const [forms, setForms] = useState([]);
  const { logout } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    api.get('/forms').then(res => setForms(res.data));
  }, []);

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">Your Feedback Forms</h1>
          <div className="flex space-x-2">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
            <Link
              to="/builder"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              New Form
            </Link>
          </div>
        </div>

        <ul className="space-y-4">
          {forms.map(f => (
            <li
              key={f._id}
              className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg shadow"
            >
              <span className="font-medium text-lg text-indigo-700">{f.title}</span>
              <div className="flex space-x-3">
                <Link
                  to={`/builder/${f._id}`}
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  Edit
                </Link>
                <Link
                  to={`/f/${f._id}`}
                  className="text-green-500 hover:text-green-700 font-medium"
                >
                  Link
                </Link>
                <Link
                  to={`/admin/forms/${f._id}/responses`}
                  className="text-purple-500 hover:text-purple-700 font-medium"
                >
                  Results
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
