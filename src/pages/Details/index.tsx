import { Button } from "../../components/Button";
import { DefaultSection } from "../../components/DefaultSection";
import { Header } from "../../components/Header";
import { DetailsContainer, Links } from "./styles";

export function Details() {
  return (
    <DetailsContainer>
      <Header />

      <DefaultSection title="Links úteis">
        <Links>
          <li>
            <a href="https://rocketseat.com.br" target="_blank">https://rocketseat.com.br</a>
          </li>
          <li>
            <a href="https://rocketseat.com.br" target="_blank">https://rocketseat.com.br</a>
          </li>
        </Links>
      </DefaultSection>

      <Button title="Voltar" />
    </DetailsContainer>
  )
}