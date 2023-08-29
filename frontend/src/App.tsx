import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import PostComments from './components/PostComments.tsx';
import {dummyPosts} from './components/HomePage.tsx'

function App() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                {currentUser ? (
                    <>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/:postId/comments" element={<PostComments posts={dummyPosts} currentUserRole={currentUser?.role || ''} setPosts={setPosts} />} />

                    </>
                ) : (
                    <Route path="/" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </Router>
    );
}

export default App;
