import { ButtonHTMLAttributes } from 'react';
import { ButtonTextContainer } from './styles';

interface ButtonTextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export function ButtonText({ title, ...rest }: ButtonTextProps) {
  return (
    <ButtonTextContainer
      type="button"
      {...rest}
    >
      {title}
    </ButtonTextContainer>
  )
}