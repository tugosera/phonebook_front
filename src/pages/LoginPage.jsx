import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login, loginAnonymous } from '../api/auth';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(username, password);
            authLogin(data.token, { username }); // Assuming API returns user object or we use username
            navigate('/');
        } catch (err) {
            console.error(err);
            const msg = err.message || 'Invalid credentials';
            setError(msg);
        }
    };

    const handleAnonymous = async () => {
        try {
            const data = await loginAnonymous();
            authLogin(data.token, { username: 'Anonymous', role: 'Anonymous' });
            navigate('/');
        } catch (err) {
            const msg = err.message || 'Failed to login anonymously';
            setError(msg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-20">
            <Card className="w-full max-w-md mx-4">
                <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>

                {error && <div className="bg-red-500/20 text-red-200 p-3 rounded mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">Username</label>
                        <input
                            type="text"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full mt-2">Login</Button>
                </form>

                <div className="mt-4 flex items-center justify-between">
                    <hr className="w-full border-gray-700" />
                    <span className="px-3 text-gray-500 text-sm">OR</span>
                    <hr className="w-full border-gray-700" />
                </div>

                <Button onClick={handleAnonymous} className="w-full mt-4 bg-transparent border border-white/20 hover:bg-white/5">
                    Continue as Guest
                </Button>

                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-400">Don't have an account? </span>
                    <Link to="/register" className="text-blue-400 hover:text-blue-300">Sign up</Link>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
