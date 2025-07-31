import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserServices';

const Register = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = enviar email, 2 = completar cadastro
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSendEmail = async () => {
    try {
      setError(null);
      await UserService.verifyEmail(email)
      setMessage('Código enviado para seu e-mail.');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.errors?.[0] || 'Erro ao enviar código.');
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return setError('As senhas não coincidem.');
    }

    try {
      setError(null);
      await UserService.register({ email, password, pin });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao registrar.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h2>Cadastro</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      {step === 1 && (
        <button onClick={handleSendEmail}>Enviar código</button>
      )}

      {step === 2 && (
        <>
          <label>Código PIN:</label>
          <input
            type="text"
            value={pin}
            onChange={e => setPin(e.target.value)}
            required
          />

          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <label>Confirmar senha:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />

          <button onClick={handleRegister}>Registrar</button>
        </>
      )}
    </div>
  );
};

export default Register;
