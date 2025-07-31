import { useState } from "react";
import UserService from "../services/UserServices";
import { useNavigate } from "react-router-dom"; // Se estiver usando React Router

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Navegação após login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await UserService.login({ email, password });

      if (response.status === 200) {
        // O cookie já está no navegador via Set-Cookie
        navigate("/pagina_inicial"); // Redireciona para a página protegida
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("E-mail ou senha inválidos.");
      } else {
        setError("Erro ao realizar login.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Entrar</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "60px auto",
    padding: "30px",
    backgroundColor: "#f1f1f1",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "-10px"
  }
};

export default Login;
