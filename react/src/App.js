// import logo from './logo.svg';
// import './App.css';
// import './style.css';
import React, { useEffect, useState, createContext, useContext } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import { BrowserRouter as Router, Route, Link, Switch, Routes, Navigate, redirect, useNavigate } from 'react-router-dom';
import ListUser from './components/users/ListUser';
import Home from './components/home/Home';
import CreateEditUser from './components/users/CreateEditUser';
import client from './common'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/login/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import { setToken, getToken, isAuthenticated } from './pages/Auth';
import Signup from './components/singup/Signup';
import RoleList from './components/roles/RoleList';
import { AddEditRole } from './components/roles/AddEditRole';
import ModuleList from './components/modules/ModuleList';
import { AddEditModule } from './components/modules/AddEditModule';
import RightList from './components/rights/RightList';
import { AddEditRight } from './components/rights/AddEditRight';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const token = getToken()
  const data =
    useEffect(() => {
      // setIsLoggedIn(isAuthenticated());
    }, [])

  const handleLogin = (data) => {
    setCurrentUser(data)
  }
  return (
    <>
      <ApolloProvider client={client} >
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={token ? <Navigate to="/users" /> : <Signup />} />
            <Route path="/login" element={token ? <Navigate to="/users" /> : <Login onLogin={handleLogin} />} />
            <Route
              path="*"
              element={
                <ProtectedRoute currentUser={currentUser}>
                  <Route element={<Home loggedUser={currentUser} />} >
                    <Route path="/users" element={<ListUser loggedUser={currentUser} />} />
                    <Route path="/add-user" element={<CreateEditUser />} />
                    <Route path="/edit-user/:id" element={<CreateEditUser />} />
                    <Route path="/login" element={<Navigate to="/users" />} />
                    <Route path="/roles" element={<RoleList/>} />
                    <Route path="/add-role" element={<AddEditRole/>} />
                    <Route path="/edit-role/:id" element={<AddEditRole />} />
                    <Route path="/modules" element={<ModuleList/>} />
                    <Route path="/add-module" element={<AddEditModule/>} />
                    <Route path="/edit-module/:id" element={<AddEditModule />} />
                    <Route path="/rights" element={<RightList/>} />
                    <Route path="/add-right" element={<AddEditRight/>} />
                    <Route path="/edit-right/:id" element={<AddEditRight />} />
                  </Route>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}
export default App;