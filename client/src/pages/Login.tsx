import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../api/auth.ts";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleLogin(form).then(() => {
              setTimeout(() => {
                navigate("/");
              }, 2000);
            });
          }}
        >
          Login
        </Button>
        <Button
          sx={{ mx: 2 }}
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
