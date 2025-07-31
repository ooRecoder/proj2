import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserService from "../services/UserServices";
import styles from "../styles/login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await UserService.login({ email, password });

      if (response.status === 200) {
        toast.success("Login realizado com sucesso!", {
          position: "top-right",
        });
        navigate("/pagina_inicial");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("E-mail ou senha inválidos.", {
          position: "top-right",
        });
      } else {
        toast.error("Erro ao realizar login.", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Entrar</button>
      </form>
    </div>
  );
}

export default Login;
