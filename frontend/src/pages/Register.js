import React from 'react';

function Register() {
  return (
    <div>
      <h1>Cadastro</h1>
      <form>
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Register;
