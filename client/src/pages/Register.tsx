import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { handleRegister } from "../api/auth.ts";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Typography variant="h4" gutterBottom>
          Register
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
            handleRegister(form).then(() => {
              setTimeout(() => {
                navigate("/login");
              }, 2000);
            });
          }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
