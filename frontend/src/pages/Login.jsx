import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        squad: '',
        batch: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isRegister ? '/auth/register' : '/auth/login';
            const payload = isRegister ? formData : { email: formData.email, password: formData.password };

            const res = await api.post(url, payload);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.msg || 'Error occurred');
        }
    };

    return (
        <div className="auth-container">
            <h2>{isRegister ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                {isRegister && (
                    <>
                        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                        <input type="number" name="squad" placeholder="Squad (1-10)" min="1" max="10" onChange={handleChange} required />
                        <select name="batch" onChange={handleChange} required defaultValue="">
                            <option value="" disabled>Select Batch</option>
                            <option value="1">Batch 1</option>
                            <option value="2">Batch 2</option>
                        </select>
                    </>
                )}
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
            </form>
            <p onClick={() => setIsRegister(!isRegister)} className="toggle-auth">
                {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </p>
        </div>
    );
};

export default Login;
