import { useLogin } from "../hooks/useLogin";
import styles from "../styles/login.module.css";

function Login() {
  const { email, setEmail, password, setPassword, handleLogin } = useLogin();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <label htmlFor="email" className={styles.label}>E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
          placeholder="Digite seu e-mail"
        />
        <label htmlFor="password" className={styles.label}>Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
          placeholder="Digite sua senha"
        />
        <button type="submit" className={styles.button}>Entrar</button>
      </form>
    </div>
  );
}

export default Login;