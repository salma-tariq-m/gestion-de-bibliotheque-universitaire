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
    // Login réussi
    console.log("Payload reçu:", resultAction.payload);
    navigate("/dashboard");
  } else {
    // Login échoué
    console.log("Erreur login:", resultAction.payload?.message);
  }
};

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login Admin</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

export default Login;