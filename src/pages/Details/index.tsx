import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { DefaultSection } from "../../components/DefaultSection";
import { Header } from "../../components/Header";
import { Tag } from "../../components/Tag";
import { DetailsContent, DetailsContainer, Links } from "./styles";

export function Details() {
  return (
    <DetailsContainer>
      <Header />

      <main>
        <DetailsContent>
          <ButtonText title="Excluir nota" isActive />

          <h1>
            Introdução ao React
          </h1>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>

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

          <DefaultSection title="Marcadores">
            <Tag title="nodejs" />
            <Tag title="express" />
          </DefaultSection>

          <Button title="Voltar" />
        </DetailsContent>
      </main>
    </DetailsContainer>
  )
}