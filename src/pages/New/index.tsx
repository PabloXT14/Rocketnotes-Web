import { Link } from 'react-router-dom';
import { Button } from "../../components/Button";
import { DefaultSection } from "../../components/DefaultSection";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { NoteItem } from "../../components/NoteItem/inde";
import { Textarea } from "../../components/Textarea";
import { NewContainer, Form } from "./styles";

export function New() {
  return (
    <NewContainer>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">voltar</Link>
          </header>

          <Input placeholder="Título" />

          <Textarea placeholder="Observações" />

          <DefaultSection title="Links úteis">
            <NoteItem value="https://rocketseat.com.br" />
            <NoteItem isNew placeholder="Novo link"/>
          </DefaultSection>

          <DefaultSection title="Marcadores">
            <div className="tags">
              <NoteItem value="React" />
              <NoteItem isNew placeholder="Novo marcador" />
            </div>
          </DefaultSection>

          <Button title="Salvar"/>
        </Form>
      </main>
    </NewContainer>
  );
}