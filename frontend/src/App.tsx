// src/App.tsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import necessary components for React Router v6
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage'; // Import HomePage component
import { Provider } from 'react-redux';
import store from './redux/store'; // Import your Redux store

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
