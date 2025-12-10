import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../UI/Button';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 w-full z-50 glass-card rounded-none border-b border-[rgba(255,255,255,0.1)] px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500" style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Phonebook
            </Link>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <Link to="/groups" className="text-gray-300 hover:text-white transition-colors mr-2">Groups</Link>
                        <span className="text-sm text-gray-300">Welcome, {user.username || 'Anonymous'}</span>
                        <Button onClick={handleLogout} className="px-4 py-2 text-sm">Logout</Button>
                    </>
                ) : (
                    <div className="flex gap-4">
                        <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
                        <Link to="/register" className="text-gray-300 hover:text-white transition-colors">Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
