import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store.tsx';
import { editPost, removePost, addPost , addNewPost } from '../redux/postSlice.tsx';
import { logout } from "../redux/authSlice.tsx";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Modal,
    TextField,
    Box,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText, Stack,
} from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LogoutIcon from '@mui/icons-material/Logout';

const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.app.posts);
    console.log(posts);
    const navigate = useNavigate();
    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', author: '' });
    const [editedTitle, setEditedTitle] = useState('');

    useEffect(() => {
        if (posts.length === 0) {
            dispatch(addPost(posts));
        }
    }, [dispatch, posts]);

    const handleAddPost = (newPost: {title:string , author:string}) => {
        dispatch(addNewPost(newPost));
        setIsModalOpen(false);
        setNewPost({ title : '', author: ''});
    };

    const handleRemovePost = (postId: number) => {
        dispatch(removePost(postId));
    };

    const handleEditPost = (postId: number) => {
        setEditingPostId(postId);
        const postToEdit = posts.find((post) => post.id === postId);
        if (postToEdit) {
            setEditedTitle(postToEdit.title);
        }
    };

    const handleSavePost = (postId: number , editedTitle : string) => {
        dispatch(editPost({ postId, updatedContent : editedTitle }));
        setEditingPostId(null)
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
    };

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const currentUserType = currentUser.type || 'user';

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Home Page
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" onClick={handleLogout}>
                                <LogoutIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Container>
                {isModalOpen && (
                    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <Container maxWidth="sm" sx={{ mt: 4 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <h2>Add New Post</h2>
                                <TextField
                                    type="text"
                                    label="Title"
                                    value={newPost.title}
                                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                    type="text"
                                    label="Author"
                                    value={newPost.author}
                                    onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                                    variant="outlined"
                                    margin="normal"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAddPost(newPost)}
                                    sx={{ mt: 2 }}
                                >
                                    Add Post
                                </Button>
                            </Box>
                        </Container>
                    </Modal>
                )}
                <List sx={{ mt: 2 }}>
                    {posts.map((post) => (
                        <ListItem key={post.id}>
                            {currentUserType === 'admin' && editingPostId === post.id ? (
                                <Stack direction="row" spacing={3}>
                                    <TextField
                                        type="text"
                                        label="Title"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        variant="outlined"
                                        margin="normal"
                                        size="small"
                                        sx={{ flexGrow: 1 }}
                                    />
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleSavePost(post.id, editedTitle)}
                                    >
                                        Save
                                    </Button>
                                    <Button variant="contained" onClick={handleCancelEdit}>
                                        Cancel
                                    </Button>
                                </Stack>
                            ) : (
                                <>
                                    <ListItemText primary={editingPostId !== post.id ? post.title : ''} secondary={`Author: ${post.author}`} />
                                    {currentUserType === 'admin' ? (
                                        <Stack direction="row" spacing={3}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleRemovePost(post.id)}
                                            >
                                                Remove
                                            </Button>
                                            <Button variant="contained" onClick={() => handleEditPost(post.id)}>
                                                Edit
                                            </Button>
                                            <Link to={`/comments/${post.id}`}>View Comments</Link>
                                        </Stack>
                                    ) : null}
                                </>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Container>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '16px',
                    right: '16px',
                }}
            >
                {currentUserType === 'admin' && (
                    <IconButton color="primary" size="large" onClick={() => setIsModalOpen(true)}>
                        <PostAddIcon fontSize="large" />
                    </IconButton>
                )}
            </Box>

        </div>
    );
};

export default HomePage;
