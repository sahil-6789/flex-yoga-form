// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './context/userContext';
import Dashboard from './Dashboard';

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
    <Router>
      <Toaster toastOptions={{duration:2000}}/>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
    </UserContextProvider>
  );
}

export default App;
