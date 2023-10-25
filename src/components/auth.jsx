import React from "react";
import PropTypes from 'prop-types';
import { API_URL } from '../assets/API_URL'
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { parseJwt } from "./utils/useApi"


const AuthContext = React.createContext();

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function AuthProvider({ children }) {
  const [token, setToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  // let location = useLocation();

  const login = async (username, password) => {
    const response = await fetch(`${API_URL}/login/${username}/${password}`);
    const data = await response.json();

    if (data.length > 0) {
      let from = location.state?.from?.pathname || -1;
      localStorage.setItem('token', data)
      setToken(data);
      setUser(parseJwt(data))
      // {userId, username, firstname, lastname}
      setError(null);
      navigate(from, { replace: true });
    }
    else {
      // setError('Username or password wrong');
      console.log('Username or password wrong')
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
    setToken(null);
    localStorage.setItem('token', '');
    navigate('/login');
  }

  const auth = {
    token,
    user,
    error,
    setToken,
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
  const token = localStorage.getItem('token');

  if (token) {
    auth.token = token;
    auth.user = parseJwt(token);
  }

  return auth;
}

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
function AuthRoute(props) {
  const auth = useAuth();
  let location = useLocation();

  // valida si existe el token o si ya expiro
  if (!auth.token || auth.user?.exp * 1000 < Date.now())
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
  if (auth.token && auth.user?.exp * 1000 > Date.now())
    return <Navigate to={`/profile/${auth.user.username}`} />

  return (
    <>
      {props.children}
    </>
  )
}

export { useAuth, AuthProvider, AuthRoute, NoAuthRoute }