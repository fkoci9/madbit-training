import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/authActions.tsx';
import { useNavigate } from 'react-router-dom';
import { TextField, Button , Box} from '@mui/material';
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
        console.log(storedUsers);
        const user = storedUsers.find((u: any) => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
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
        navigate('/home');
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
        >
            <h1>{isRegistering ? 'Register' : 'Login'} Page</h1>
            {isRegistering ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <TextField
                        type="email"
                        label="Email"
                        value={registrationEmail}
                        onChange={(e) => setRegistrationEmail(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        type="password"
                        label="Password"
                        value={registrationPassword}
                        onChange={(e) => setRegistrationPassword(e.target.value)}
                        margin="normal"
                    />
                    <Button variant="contained" onClick={handleRegister} style={{ margin: '8px 0' }}>
                        Register
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => setIsRegistering(false)}
                        style={{ margin: '8px 0' }}
                    >
                        Cancel
                    </Button>
                </Box>
            ) : (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <TextField
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                    />
                    <Button variant="contained" onClick={handleLogin} style={{ margin: '8px 0' }}>
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => setIsRegistering(true)}
                        style={{ margin: '8px 0' }}
                    >
                        Register here
                    </Button>
                    {error && <p>{error}</p>}
                </Box>
            )}
        </Box>
    );
};

export default LoginPage;
