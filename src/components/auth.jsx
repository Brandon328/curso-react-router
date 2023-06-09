import React from "react";
import PropTypes from 'prop-types';
import { API_URL } from '../assets/API_URL'
import { Navigate, useNavigate, useLocation } from "react-router-dom";


const AuthContext = React.createContext();

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  let location = useLocation();

  const login = async (username, password) => {
    const response = await fetch(`${API_URL}/login/${username}/${password}`);
    const data = await response.json();

    if (data.length > 0) {
      let from = location.state?.from?.pathname || -1;
      const user = { ...data[0] };
      setError(null);
      // {userId, username, firstname, lastname}
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user))
      navigate(from, { replace: true });
    }
    else {
      setError('Username or password wrong');
    }
  }
  const register = async (content) => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(content)
    }

    const response = await fetch(`${API_URL}/create-user`, options);
    if (response.status === 200) {
      setError(null);
      navigate('/login');
    }
    else {
      setError('Ocurrio un error con la API');
    }
  }
  const logout = () => {
    setUser(null);
    localStorage.setItem('user', '');
    navigate('/login');

  }

  const auth = {
    user,
    error,
    setUser,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const auth = React.useContext(AuthContext);
  const user = localStorage.getItem('user');

  if (user) {
    auth.user = JSON.parse(user);
  }

  return auth;
}

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
function AuthRoute(props) {
  const auth = useAuth();
  let location = useLocation();

  if (!auth.user)
    return <Navigate to="/login" state={{ from: location }} replace />

  return (
    <>
      {props.children}
    </>
  )
}

NoAuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
function NoAuthRoute(props) {
  const auth = useAuth();
  if (auth.user)
    return <Navigate to="/profile" />

  return (
    <>
      {props.children}
    </>
  )
}

export { useAuth, AuthProvider, AuthRoute, NoAuthRoute }