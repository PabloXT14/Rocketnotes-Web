import { HeaderContainer, Logout, Profile } from "./styles";
import { RiShutDownLine } from 'react-icons/ri';


export function Header() {
  return (
    <HeaderContainer>
      <Profile to="/profile">
        <img
          src="https://github.com/pabloxt14.png"
          alt="Foto do usuário"
        />

        <div>
          <span>Bem vindo,</span>
          <strong>Pablo Alan</strong>
        </div>
      </Profile>

      <Logout>
        <RiShutDownLine />
      </Logout>
    </HeaderContainer>
  )
}