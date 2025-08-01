const StepIndicator = ({ currentStep }) => {
  const steps = ['Email', 'Verificação'];

  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      {steps.map((label, index) => {
        const isActive = currentStep === index + 1;
        const isCompleted = currentStep > index + 1;

        return (
          <div
            key={label}
            style={{
              padding: '8px 12px',
              borderRadius: '999px',
              backgroundColor: isActive ? '#007bff' : isCompleted ? '#28a745' : '#e0e0e0',
              color: isActive || isCompleted ? '#fff' : '#333',
              fontWeight: 'bold',
              transition: 'all 0.3s',
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
