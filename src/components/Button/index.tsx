import { ButtonHTMLAttributes } from "react";
import { ButtonContainer } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  loading?: boolean;
}

export function Button({ title, loading = false, ...rest}: ButtonProps) {
  return (
    <ButtonContainer
      type="button"
      disabled={loading}
      {...rest}
    >
      { loading ? 'Carregando...' : title}
    </ButtonContainer>
  )
}