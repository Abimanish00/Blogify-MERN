import React from 'react';
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import BlogDetails from './pages/blogdetails';
import AddBlog from './pages/addblog';
import EditBlog from './pages/editblog';
import ProtectedRoute from './context/ProtectedRoute';
import { ColorModeScript } from "@chakra-ui/react";


function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
          <Route path="/add-blog" element={<ProtectedRoute> <AddBlog /></ProtectedRoute>} />
          <Route path="/edit-blog/:id" element={<ProtectedRoute> <EditBlog /></ProtectedRoute>} />
          <Route path="/blog/:id" element={<BlogDetails />} />
        </Routes>
      </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
