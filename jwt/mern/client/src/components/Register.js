import React, { useState } from 'react';

const Register = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await (await fetch('http://localhost:5001/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })).json();
    if (!result.error) {
      console.log(result.message);

    } else {
      console.log(result.error);
    }
  };

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
        <div>Register</div>
        <div className="login-input">
          <input
            value={username}
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="Username"
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
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;