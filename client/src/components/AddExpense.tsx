import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import { addExpense } from "../api/utils.ts";

const AddExpense = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Expense");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await addExpense(amount, category, description);
    if (res) {
      navigate("/");
    } else {
      alert("Failed to add expense.");
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Add Expense
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Amount"
          fullWidth
          margin="normal"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <TextField
          label="Category"
          fullWidth
          margin="normal"
          select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <MenuItem value="Expense">Expense</MenuItem>
          <MenuItem value="Income">Income</MenuItem>
        </TextField>
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Add
        </Button>
      </form>
    </Container>
  );
};

export default AddExpense;
