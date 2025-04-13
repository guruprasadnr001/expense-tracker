export const handleLogin = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }

    const result = await res.json();
    localStorage.setItem("token", result.token);
    return result;
  } catch (err: any) {
    alert(err.message || "Login failed");
  }
};

export const handleRegister = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }
    const result = await res.json();
    localStorage.setItem("userExists", "true");
    return result;
  } catch (err: any) {
    alert(err.message || "Login failed");
  }
};
