export const fetchExpenses = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://localhost:5000/expense/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch expenses");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return null;
  }
};

export const deleteExpense = async (id: number) => {
  const token = localStorage.getItem("token");
  try {
    await fetch(`http://localhost:5000/expense/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    window.location.reload();
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
};

export const addExpense = async (
  amount: string,
  category: string,
  description: string
) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://localhost:5000/expense/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount, category, description }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add expense");
    }

    return res;
  } catch (error) {
    console.error("Failed to add expense:", error);
  }
};

export const downloadPDF = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch("http://localhost:5000/expense/export/pdf", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to download PDF");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};
