import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {loginUser} from "../redux/authActions.tsx";
import {useNavigate} from "react-router-dom";

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [registrationEmail, setRegistrationEmail] = useState('');
    const [registrationPassword, setRegistrationPassword] = useState('');

    if (!localStorage.getItem('users')) {
        const adminUser = {
            email: '1',
            password: '1',
            type: 'admin',
        };
        localStorage.setItem('users', JSON.stringify([adminUser]));
    }

    const handleLogin = () => {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        console.log(storedUsers)
        const user = storedUsers.find((u: any) => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser' , JSON.stringify(user));
            // @ts-ignore
            dispatch(loginUser());
            navigate('/home');
        } else {
            setError('Invalid email or password');
        }
    };
    const handleRegister = () => {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

        const newUser = {
            email: registrationEmail,
            password: registrationPassword,
            type: 'user',
        };

        storedUsers.push(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        localStorage.setItem('users', JSON.stringify(storedUsers));
        setIsRegistering(false);
        navigate('/home')
    };
    return (
        <div>
            <h1>{isRegistering ? 'Register' : 'Login'} Page</h1>
            {isRegistering ? (
                <>
                    <input
                        type="email"
                        placeholder="Email"
                        value={registrationEmail}
                        onChange={(e) => setRegistrationEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={registrationPassword}
                        onChange={(e) => setRegistrationPassword(e.target.value)}
                    />
                    <button onClick={handleRegister}>Register</button>
                    <button onClick={() => setIsRegistering(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={() => setIsRegistering(true)}>Register here</button>
                    {error && <p>{error}</p>}
                </>
            )}
        </div>
    );
};

export default LoginPage;
