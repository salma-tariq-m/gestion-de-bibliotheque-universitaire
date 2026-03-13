import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(loginAdmin({ email, password }));

    if (loginAdmin.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  return (
    <>
    
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📚 Bibliothèque</h1>
        <h3 style={styles.subtitle}>Connexion Bibliothécaire</h3>

        <form onSubmit={handleLogin}>

          <div style={styles.field}>
            <label>Email</label>
            <input
              style={styles.input}
              type="email"
              placeholder="Entrer votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.field}>
            <label>Mot de passe</label>
            <input
              style={styles.input}
              type="password"
              placeholder="Entrer votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>

        </form>
      </div>
    </div>
    </>
  );
};

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4facfe, #00f2fe)"
  },

  card: {
    background: "white",
    padding: "40px",
    borderRadius: "10px",
    width: "350px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.2)"
  },

  title: {
    textAlign: "center",
    marginBottom: "5px"
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "30px",
    color: "gray"
  },

  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px"
  },

  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "5px"
  },

  button: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    background: "#007bff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  },

  error: {
    color: "red",
    marginBottom: "10px"
  }
};

export default Login;