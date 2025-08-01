import styles from './style.module.css';
import InputField from '../../InputField';

const EmailStep = ({ email, setEmail, onSendEmail, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSendEmail();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <InputField
        id="email"
        label="Email:"
        type="email"
        value={email}
        onChange={setEmail}
        required
        placeholder="exemplo@email.com"
        inputClassName={styles.input}
        labelClassName={styles.label}
        wrapperClassName={styles.inputGroup}
        errorClassName={styles.errorMessage}
      />
      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? 'Enviando...' : 'Enviar código'}
      </button>
    </form>
  );
};

export default EmailStep;
