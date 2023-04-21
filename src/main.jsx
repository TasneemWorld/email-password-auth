import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Components/Main';
import Home from './Components/Home';
import LogIn from './Components/LogIn';
import Register from './Components/Register';
import UserProvider from './Provider/UserProvider';
import Order from './Components/Order';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';
import Navbar from './Components/Navbar';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/order",
        element: <PrivateRoute><Order></Order></PrivateRoute>
      },
      {
        path :"/profile",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: '/navbar',
        element: <Navbar></Navbar>
      }
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
