import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store.tsx";
import { editPost, removePost, addNewPost } from "../redux/postSlice.tsx";
import { logout } from "../redux/authSlice.tsx";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Modal,
  TextField,
  Box,
  IconButton,
  Stack,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LogoutIcon from "@mui/icons-material/Logout";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.app.posts);
  console.log("state of posts : ", posts);
  const navigate = useNavigate();
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", author: "" });
  const [editedTitle, setEditedTitle] = useState("");

  const handleAddPost = (newPost: { title: string; author: string }) => {
    dispatch(addNewPost(newPost));
    setIsModalOpen(false);
    setNewPost({ title: "", author: "" });
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

  const handleSavePost = (postId: number, editedTitle: string) => {
    dispatch(editPost({ postId, updatedContent: editedTitle }));
    setEditingPostId(null);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
  };

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const currentUserType = currentUser.type || "user";

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("currentUser");
    navigate("/");
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
      <Container sx={{ mt: 4 }}>
        {isModalOpen && (
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Container maxWidth="sm" sx={{ mt: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h2>Add New Post</h2>
                <TextField
                  type="text"
                  label="Title"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  variant="outlined"
                  margin="normal"
                  sx={{ color: "white" }}
                  inputProps={{
                    style: {
                      color: "white",
                    },
                  }}
                />
                <TextField
                  type="text"
                  label="Author"
                  value={newPost.author}
                  onChange={(e) =>
                    setNewPost({ ...newPost, author: e.target.value })
                  }
                  variant="outlined"
                  margin="normal"
                  sx={{ color: "white" }}
                  inputProps={{
                    style: {
                      color: "white",
                    },
                  }}
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
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {currentUserType === "admin" && editingPostId === post.id ? (
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
                      <RouterLink to={`/comments/${post.id}`}>
                        <img
                          src={post.avatar}
                          alt="Author Avatar"
                          width="100"
                          height="100"
                        />
                      </RouterLink>
                      <Typography variant="h6" align="center">
                        {editingPostId !== post.id ? post.title : ""}
                      </Typography>
                      <Typography color="textSecondary" align="center">
                        Author: {post.author}
                      </Typography>
                    </>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Stack direction="column" spacing={2}>
                    {currentUserType === "admin" ? (
                      <Stack direction="row" spacing={2}>
                        <>
                          <Button
                            variant="contained"
                            onClick={() => handleEditPost(post.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleRemovePost(post.id)}
                          >
                            Remove
                          </Button>
                        </>
                      </Stack>
                    ) : null}
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box
        sx={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
        }}
      >
        {currentUserType === "admin" && (
          <IconButton
            color="primary"
            size="large"
            onClick={() => setIsModalOpen(true)}
          >
            <PostAddIcon fontSize="large" />
          </IconButton>
        )}
      </Box>
    </div>
  );
};

export default HomePage;
