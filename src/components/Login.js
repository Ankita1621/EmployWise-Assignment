import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://reqres.in/api/login', {
                email,
                password,
            });
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/userlist');
        } catch (error) {
            console.error(error);
            alert('Invalid credentials!');
        }
    };

    return (
        <div className="login-container">
            <div className="welcome-text">Welcome Back</div>
            <div className="login-box">
                <h1>Login</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;
