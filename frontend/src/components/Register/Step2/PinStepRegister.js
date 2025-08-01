import { useEffect, useState } from 'react';
import styles from './style.module.css';
import InputField from '../../InputField';

export const PinStep = ({
  pin,
  setPin,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onRegister,
  loadingPIN,
  loading,
  sendPINAgain,
}) => {
  const RESEND_DELAY = 30; // segundos
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = () => {
    sendPINAgain();
    setCooldown(RESEND_DELAY);
  };

  return (
    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); onRegister(); }}>
      <InputField
        id="pin"
        label="Código PIN:"
        type="text"
        value={pin}
        onChange={setPin}
        inputClassName={styles.inputPin}
        labelClassName={styles.label}
        wrapperClassName={styles.inputGroup}
        errorClassName={styles.errorMessage}
      />

      <div className={styles.resendContainer}>
        <span className={styles.resendText}>Não recebeu o código?</span>
        <button
          type="button"
          onClick={handleResend}
          className={styles.resendButton}
          disabled={loadingPIN || cooldown > 0}
        >
          {cooldown > 0 ? `Reenviar em ${cooldown}s` : 'Reenviar PIN'}
        </button>
      </div>

      <InputField
        id="password"
        label="Senha:"
        type="password"
        value={password}
        onChange={setPassword}
        inputClassName={styles.input}
        labelClassName={styles.label}
        wrapperClassName={styles.inputGroup}
        errorClassName={styles.errorMessage}
      />
      <InputField
        id="confirmPassword"
        label="Confirmar senha:"
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        inputClassName={styles.input}
        labelClassName={styles.label}
        wrapperClassName={styles.inputGroup}
        errorClassName={styles.errorMessage}
      />
      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? 'Registrando...' : 'Registrar'}
      </button>
    </form>
  );
};

export default PinStep;
