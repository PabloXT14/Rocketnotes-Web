import { ButtonContainer } from "./styles";

interface ButtonProps {
  title: string;
  loading?: boolean;
}

export function Button({ title, loading = false, ...rest}: ButtonProps) {
  return (
    <ButtonContainer
      disabled={loading}
      {...rest}
    >
      { loading ? 'Carregando...' : title}
    </ButtonContainer>
  )
}