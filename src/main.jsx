import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
//import App from './App.jsx'
import './index.css'
import Login from './login';
import Userdetail from './userDetail';
import EditUser from './editUser';
import Register from './register';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/userDetail",
    element: (
      <ProtectedRoute>
        <Userdetail />
      </ProtectedRoute> 
  ),
  },
  {
    path: "/editUser",
    element: (
      <ProtectedRoute>
        <EditUser/>
      </ProtectedRoute> 
  ),
  },
  {
    path: "/register",
    element: (
      <ProtectedRoute>
        <Register />
      </ProtectedRoute> 
  ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

  </React.StrictMode>,
)
