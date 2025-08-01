import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserService from '../services/UserServices';
import isValidEmail from '../utils/validateEmail';

// Função exportada separadamente para teste unitário
export const validateRegisterData = ({ email, password, confirmPassword, pin }) => {
  if (!isValidEmail(email)) return 'Insira um e-mail válido.';
  if (!pin || pin.length !== 6) return 'O código PIN deve conter 6 dígitos.';
  if (!password || password.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';
  if (password !== confirmPassword) return 'As senhas não coincidem.';
  return null;
};

const useRegisterForm = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPIN, setLoadingPin] = useState(false);

  const isSubmitting = useRef(false);

  const showError = (err, fallbackMsg) => {
    const message =
      err?.response?.data?.errors?.[0] ||
      err?.response?.data?.error ||
      fallbackMsg;
    toast.error(message);
  };

  const sendVerificationCode = useCallback(async () => {
    if (!isValidEmail(email)) {
      toast.error('Insira um e-mail válido.');
      return;
    }

    if (loading) return;

    setLoadingPin(true);
    try {
      await UserService.verifyEmail(email);
      toast.success('Código enviado para seu e-mail.');
      setStep(2);
    } catch (err) {
      showError(err, 'Erro ao enviar código.');
    } finally {
      setLoadingPin(false);
    }
  }, [email, loading]);

  const submitRegistration = useCallback(async () => {
    if (isSubmitting.current || loading) return;
    isSubmitting.current = true;

    const validationError = validateRegisterData({
      email,
      password,
      confirmPassword,
      pin,
    });

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setLoading(true);
    try {
      await UserService.register({ email, password, pin });
      toast.success('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (err) {
      showError(err, 'Erro ao registrar.');
    } finally {
      isSubmitting.current = false;
      setLoading(false);
    }
  }, [email, password, confirmPassword, pin, navigate, loading]);

  return {
    step,
    setStep,
    email,
    setEmail,
    pin,
    setPin,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    loadingPIN,
    sendVerificationCode,
    submitRegistration,
  };
};

export default useRegisterForm;
