import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import CommentPage from './components/CommentPage.tsx';
import { Provider } from 'react-redux';
import store from './redux/store';
import {dummyPosts} from "./components/dummyData.tsx";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage posts={dummyPosts}/>} />
                    <Route path="/comments/:postId" element={<CommentPage posts={dummyPosts}/>} />
                    <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
