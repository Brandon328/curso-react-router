import React from "react";
import PropTypes from 'prop-types';
import { Navigate, useNavigate } from "react-router-dom";

// const adminList = [
//   {
//     username: 'imir',
//     permissions: ['delete',]
//   },
//   {
//     username: 'historia',
//     permissions: ['delete', 'edit']
//   },
//   {
//     username: 'brandonjj',
//     permissions: ['delete', 'edit', 'comment']
//   }
// ];

const AuthContext = React.createContext();

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    const response = await fetch(`http://localhost:9000/api/login/${username}/${password}`);
    const data = await response.json();

    if (data.length > 0) {
      // {userId, username, firstname, lastname}
      setError(null);
      setUser({ ...data[0] });
      navigate('/profile');
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

    const response = await fetch('http://localhost:9000/api/create-user', options);
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
    navigate('/login')
  }


  const auth = {
    user,
    error,
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
  return auth;
}

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function AuthRoute(props) {
  const auth = useAuth();
  if (!auth.user)
    return <Navigate to="/login" />

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