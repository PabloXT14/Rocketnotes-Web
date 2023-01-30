import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "../../components/Input";
import { Background, Form, SignUpContainer } from "./styles";
import { api } from '../../services';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Button } from "../../components/Button";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    await api.post("/users", {
      name,
      email,
      password
    })
    .then((response) => {
      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    })
    .catch(error => {
      if(error.response) {
        alert(error.response.data.message);
      } else {
        alert("Houve um erro ao tentar cadastrar um novo usuário");
      }
    })
  } 

  return (
    <SignUpContainer>
      <Background />

      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={event => setName(event.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={event => setEmail(event.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={event => setPassword(event.target.value)}
        />

        <Button title="Cadastrar" onClick={handleSignUp}/>

        <Link to="/">
          Voltar para o login
        </Link>
      </Form>
    </SignUpContainer>
  )
}