import styles from './style.module.css';

const StepIndicator = ({ currentStep }) => {
  const steps = ['Email', 'Verificação'];

  return (
    <div className={styles.container}>
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const stepClass =
          currentStep === stepNumber
            ? styles.active
            : currentStep > stepNumber
            ? styles.completed
            : styles.inactive;

        return (
          <div key={label} className={`${styles.step} ${stepClass}`}>
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
