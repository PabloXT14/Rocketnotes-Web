import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Avatar, Form, ProfileContainer } from "./styles";

export function Profile() {
  const { userData } = useAuth();

  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <ProfileContainer>
      <header>
        <button type="button" onClick={goBack}>
          <FiArrowLeft />
        </button>
      </header>

      <Form>
        <Avatar>
          <img src="https://github.com/pabloxt14.png" alt="Foto do usuário" />
          <label htmlFor="avatar">
            <FiCamera />
            <input
              id="avatar"
              type="file"
            />
          </label>
        </Avatar>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={event => setName(event.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="email"
          icon={FiMail}
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          value={oldPassword}
          onChange={event => setOldPassword(event.target.value)}
        />

        <Input
          placeholder="Nova senha"
          type="password"
          icon={FiLock}
          value={newPassword}
          onChange={event => setNewPassword(event.target.value)}
        />

        <Button title="Salvar" />
      </Form>
    </ProfileContainer>
  )
}