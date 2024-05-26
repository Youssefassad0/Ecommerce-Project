import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem('auth-token');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Error accessing localStorage", error);
      setIsAuthenticated(false);
    }
  }, []);

  const redirectToLogin = () => {
    navigate('/login');
  };

  return { isAuthenticated, redirectToLogin };
};

export default useAuth;
