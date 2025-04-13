import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Expense } from "../type";
import Navbar from "../components/Navbar.tsx";
import { useNavigate } from "react-router-dom";
import { deleteExpense, downloadPDF, fetchExpenses } from "../api/utils.ts";

const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expense, setExpense] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchExpenses().then((data) => {
      if (data != null) {
        setExpenses(data.expenses ?? []);
        setExpense(data.totalExpense ?? 0);
        setIncome(data.totalIncome ?? 0);
      }
    });
  }, []);

  function download() {
    setDownloading(true);
    downloadPDF().then(() => {
      setDownloading(false);
    });
  }

  return (
    <>
      <Navbar />
      <Container sx={{ py: 3 }}>
        <Button
          disabled={downloading || expenses.length === 0}
          sx={{ mb: 3 }}
          variant="contained"
          onClick={() => {
            download();
          }}
        >
          {downloading ? "Downloading..." : "Download PDF"}
        </Button>
        <Button
          sx={{ mb: 3, ml: 3 }}
          variant="contained"
          onClick={() => navigate("/add")}
        >
          Add expense
        </Button>
        <Typography variant="h5" sx={{ pb: 2, fontWeight: "bold" }}>
          Total expenses : {expense} Rs
        </Typography>
        <Typography variant="h5" sx={{ pb: 2, fontWeight: "bold" }}>
          Total income : {income} Rs
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No Expenses Found
                  </TableCell>
                </TableRow>
              ) : (
                expenses.map((exp) => (
                  <TableRow key={exp.id}>
                    <TableCell>{exp.id}</TableCell>
                    <TableCell>₹{exp.amount}</TableCell>
                    <TableCell>
                      <Typography>{exp.description}</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: exp.category === "Income" ? "green" : "red",
                      }}
                    >
                      {exp.category}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteExpense(exp.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
