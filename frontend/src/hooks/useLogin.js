import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserService from "../services/UserServices";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.login({ email, password });
      if (response.status === 200) {
        toast.success("Login realizado com sucesso!", { position: "top-right" });
        navigate("/pagina_inicial");
      }
    } catch (err) {
      const status = err.response?.status;
      toast.error(
        status === 401 ? "E-mail ou senha inválidos." : "Erro ao realizar login.",
        { position: "top-right" }
      );
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
};
