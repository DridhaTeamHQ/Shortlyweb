import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  // Theme toggle is now in the Navbar, this component is kept for backwards compatibility
  return null;
};

export default ThemeToggle;
