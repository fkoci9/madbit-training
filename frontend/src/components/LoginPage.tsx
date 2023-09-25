import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice.tsx";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    registrationEmail: "",
    registrationPassword: "",
  });

  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

  if (!localStorage.getItem("users")) {
    const adminUser = {
      email: "1",
      password: "1",
      type: "admin",
    };
    localStorage.setItem("users", JSON.stringify([adminUser]));
  }

  const handleLogin = () => {
    const user = storedUsers.find(
      (u: any) =>
        u.email === formData.email && u.password === formData.password,
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      dispatch(login());
      navigate("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleRegister = () => {
    const newUser = {
      email: formData.registrationEmail,
      password: formData.registrationPassword,
      type: "user",
    };

    storedUsers.push(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("users", JSON.stringify(storedUsers));
    setIsRegistering(false);
    navigate("/home");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <h1>{isRegistering ? "Register" : "Login"} Page</h1>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <TextField
          type="email"
          label="Email"
          value={isRegistering ? formData.registrationEmail : formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              [isRegistering ? "registrationEmail" : "email"]: e.target.value,
            })
          }
          margin="normal"
        />
        <TextField
          type="password"
          label="Password"
          value={
            isRegistering ? formData.registrationPassword : formData.password
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              [isRegistering ? "registrationPassword" : "password"]:
                e.target.value,
            })
          }
          margin="normal"
        />
        <Button
          variant="contained"
          onClick={isRegistering ? handleRegister : handleLogin}
          style={{ margin: "8px 0" }}
        >
          {isRegistering ? "Register" : "Login"}
        </Button>
        {!isRegistering && (
          <Button
            variant="contained"
            onClick={() => setIsRegistering(true)}
            style={{ margin: "8px 0" }}
          >
            Register here
          </Button>
        )}
        {error && <p>{error}</p>}
      </Box>
    </Box>
  );
};

export default LoginPage;
