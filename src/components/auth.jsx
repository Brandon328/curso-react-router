import React from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  const login = username => {
    setUser({ username });
    navigate('/profile');
  }
  const logout = () => {
    setUser(null);
    navigate('/')
  }
  const auth = { user, login, logout };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const auth = React.useContext(AuthContext);
  return auth;
}

export { useAuth, AuthProvider }