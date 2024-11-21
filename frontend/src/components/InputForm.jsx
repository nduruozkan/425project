// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function InputForm({ setIsOpen }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // For registration (email)
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign up and login
  const [error, setError] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignUp ? 'api/users/register' : 'api/users/login'; // Choose the correct endpoint

    const requestData = isSignUp
      ? { username, password, email } // Registration requires username, password, and email
      : { username, password }; // Login requires username and password

    try {
      // Send the login or register request
      const res = await axios.post(`http://localhost:3001/${endpoint}`, requestData);

      // Store the JWT token and user data in localStorage
      localStorage.setItem('token', res.data.token);
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user)); // Store user data if available
      }

      // Close the modal on successful login or registration
      setIsOpen();
    } catch (err) {
      // Enhanced error handling
      if (err.response) {
        // Backend error (e.g., validation failed, or server error)
        setError(err.response?.data?.message || 'An error occurred. Please try again.');
      } else if (err.request) {
        // Network error (e.g., no internet connection or backend server is down)
        setError('Network error. Please check your connection.');
      } else {
        // Other unexpected errors
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleOnSubmit}>
        <div className="form-control">
          <label>Username</label>
          <input
            type="text"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {isSignUp && (
          <div className="form-control">
            <label>Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button><br />

        {/* Display error message */}
        {typeof error === 'string' && error && <h6 className="error">{error}</h6>}<br />

        {/* Toggle between login and signup */}
        <p
          onClick={() => setIsSignUp((prev) => !prev)}
          style={{ cursor: 'pointer', color: 'blue' }}
        >
          {isSignUp ? 'Already have an account?' : 'Create new account'}
        </p>
      </form>
    </>
  );
}

InputForm.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};
