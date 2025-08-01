import styles from '../styles/register.module.css';

import useRegisterForm from '../hooks/useRegisterForm';
import EmailStep from '../components/Register/Step1/EmailStepRegister';
import PinStep from '../components/Register/Step2/PinStepRegister';
import StepIndicator from '../components/StepIndicator/Component';

const Register = () => {
  const {
    step,
    email,
    setEmail,
    pin,
    setPin,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    sendVerificationCode,
    submitRegistration,
    loadingPIN
  } = useRegisterForm();

  return (
    <section className={styles['register-container']}>

      <h2 className={styles.title}>Cadastro</h2>
      <div className={styles['progress-container']}>
        <StepIndicator currentStep={step} />
      </div>
      {step === 1 && (
        <EmailStep email={email} setEmail={setEmail} onSendEmail={sendVerificationCode} loading={loadingPIN} />
      )}
      {step === 2 && (
        <PinStep
          pin={pin}
          setPin={setPin}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onRegister={submitRegistration}
          loadingPIN={loadingPIN}
          loading={loading}
          sendPINAgain={sendVerificationCode}
        />
      )}
    </section>
  );
};

export default Register;
