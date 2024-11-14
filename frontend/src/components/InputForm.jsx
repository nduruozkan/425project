// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function InputForm({ setIsOpen }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState("");

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isSignUp ? "register" : "login";
        
        try {
            const res = await axios.post(`http://localhost:3001/${endpoint}`, { username, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setIsOpen();
        } catch (error) {
            // Set only the message as the error state, converting to string if needed
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <>
            <form className='form' onSubmit={handleOnSubmit}>
                <div className='form-control'>
                    <label>Username</label>
                    <input
                        type="text"
                        className='input'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='form-control'>
                    <label>Password</label>
                    <input
                        type="password"
                        className='input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>{isSignUp ? "Sign Up" : "Login"}</button><br />
                {/* Display error only if it's a string */}
                {typeof error === 'string' && error && <h6 className='error'>{error}</h6>}<br />
                <p onClick={() => setIsSignUp(prev => !prev)} style={{ cursor: 'pointer', color: 'blue' }}>
                    {isSignUp ? "Already have an account?" : "Create new account"}
                </p>
            </form>
        </>
    );
}

InputForm.propTypes = {
    setIsOpen: PropTypes.func.isRequired,
};
