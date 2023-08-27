import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

enum AuthMode {
    Login,
    Register,
}

interface User {
    email: string;
    password: string;
    role: UserRole;
}

enum UserRole {
    User = 'user',
    Admin = 'admin',
}

const initialAdminUser: User = {
    email: 'fabjo123@fabjo',
    password: 'fabjo111',
    role: UserRole.Admin,
};

function LoginPage() {
    const navigate = useNavigate();
    const [authMode, setAuthMode] = useState(AuthMode.Login);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([initialAdminUser]));
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleToggleAuthMode = () => {
        setAuthMode(authMode === AuthMode.Login ? AuthMode.Register : AuthMode.Login);
    };

    const handleLogin = () => {
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            navigate('/home');
        } else {
            console.log("Error")
        }
    };

    const handleRegister = () => {
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

        const user = {
            email,
            password,
            role: UserRole.User,
        };

        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/home');
    };

    return (
        <div>
            <h2>{authMode === AuthMode.Login ? 'Login' : 'Register'}</h2>
            <form>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="button" onClick={authMode === AuthMode.Login ? handleLogin : handleRegister}>
                    {authMode === AuthMode.Login ? 'Login' : 'Register'}
                </button>
            </form>
            <p>
                {authMode === AuthMode.Login ? "Don't have an account? " : 'Already have an account? '}
                <button type="button" onClick={handleToggleAuthMode}>
                    {authMode === AuthMode.Login ? 'Register here' : 'Login here'}
                </button>
            </p>
        </div>
    );
}

export default LoginPage;
