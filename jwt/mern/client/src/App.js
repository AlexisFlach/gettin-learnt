import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Protected from './components/Protected';
import Content from './components/Content';

export const UserContext = React.createContext([]);

function App() {
  const [ user, setUser ] = useState({});
  const [ loading, setLoading ] = useState(true);

  const logOutCallback = async () => {
    await fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include', // Needed to include the cookie
    });
    // Clear user from context
    setUser({});
    // Navigate back to startpage
  }

  // First thing, check if a refreshtoken exist
  useEffect(() => {
    async function checkRefreshToken() {
      const result = await (await fetch('http://localhost:5001/api/auth', {
        method: 'POST',
        credentials: 'include', // Needed to include the cookie
        headers: {
          'Content-Type': 'application/json',
        }
      })).json();
      setUser({
        accesstoken: result.accesstoken,
      });
      setLoading(false);
    }
    checkRefreshToken();
  }, []);

  if (loading) return <div>Loading ...</div>

  return (
    <UserContext.Provider value={[ user, setUser ]}>
      <div className="app">
        <Router>
          <Routes>
            <Route
              path='/'
              element={
                <Login />
              }
            />
            <Route
              path='/content'
              element={
                <Content />
              }
            />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;