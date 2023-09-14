import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment, removeComment } from "../redux/postSlice.tsx";
import { RootState } from "../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Modal,
  TextField,
  Box,
  Grid,
  IconButton,
  Card,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../redux/authSlice.tsx";

const CommentPage: React.FC = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.app.posts);
  const selectedPostIndex = posts.findIndex(
    (post) => post.id.toString() === postId,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState({ title: "" });
  console.log("posts", posts);
  const comments = useSelector(
    (state: RootState) => state.app.posts[selectedPostIndex].comments,
  );
  console.log("comments", comments);
  const navigate = useNavigate();

  const handleAddComment = () => {
    const commentToAdd = { postId: Number(postId), title: newComment.title };
    dispatch(addNewComment(commentToAdd));
    console.log(commentToAdd);
    setIsModalOpen(false);
    setNewComment({ title: "" });
  };

  const handleRemoveComment = (id: number) => {
    dispatch(removeComment({ id, postId: Number(postId) }));
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
                Comments for Post {postId}
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
                <h2>Add New Comment</h2>
                <TextField
                  type="text"
                  label="Title"
                  value={newComment.title}
                  onChange={(e) =>
                    setNewComment({ ...newComment, title: e.target.value })
                  }
                  variant="outlined"
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddComment}
                  sx={{ mt: 2 }}
                >
                  Add Comment
                </Button>
              </Box>
            </Container>
          </Modal>
        )}
        <Grid container spacing={2}>
          {comments.map((comment) => (
            <Grid item key={comment.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{comment.title}</Typography>
                </CardContent>
                {currentUserType === "admin" && (
                  <CardActions>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRemoveComment(comment.id)}
                    >
                      Remove
                    </Button>
                  </CardActions>
                )}
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

export default CommentPage;
