import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Login = () => {
  const [ user, setUser ] = useContext(UserContext);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    const result = await (await fetch('http://localhost:4000/login', {
      method: 'POST',
      credentials: 'include', // Needed to include the cookie
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      }),
    })).json();

    if (result.accesstoken) {
      setUser({
        accesstoken: result.accesstoken,
      });
      navigate('/content')
    } else {
      console.log(result.error);
    }
  };

  useEffect(() => {
    console.log(user)
  }, [ user ])

  const handleChange = e => {
    if (e.currentTarget.name === 'username') {
      setUsername(e.currentTarget.value);
    } else {
      setPassword(e.currentTarget.value);
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <div>Login</div>
        <div className="login-input">
          <input
            value={username}
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="username"
            autoComplete="username"
          />
          <input
            value={password}
            onChange={handleChange}
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
