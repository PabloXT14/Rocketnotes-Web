import { useEffect, useState } from 'react';
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { DefaultSection } from "../../components/DefaultSection";
import { Header } from "../../components/Header";
import { Tag } from "../../components/Tag";
import { DetailsContent, DetailsContainer, Links } from "./styles";
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/';

interface Link {
  id: string;
  url: string;
}

interface Tag {
  id: string;
  name: string;
}

interface NoteDetail {
  id: string;
  title: string;
  description: string;
  links: Link[];
  tags: Tag[];
}

export function Details() {
  const [noteData, setNoteData] = useState<NoteDetail>({} as NoteDetail);
  const { id } = useParams();

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  async function handleRemove() {
    try {
      const confirm = window.confirm("Você tem certeza que quer deletar esta nota?");
      if(confirm) {
        await api.delete(`/notes/${id}`);
        alert('Note excluida com sucesso!');
        navigate(-1);
      }
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível excluir a nota");
      }
    }
  }

  useEffect(() => {
    async function fetchNoteData() {
      try {
        const response = await api.get(`/notes/${id}`);
        setNoteData(response.data);
      } catch (error: any) {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Não foi possível carregar os dados da nota.");
        }
      }
    }

    fetchNoteData();
  }, []);

  return (
    <DetailsContainer>
      <Header />

      {
        noteData &&
        <main>
          <DetailsContent>
            <ButtonText
              title="Excluir nota"
              isActive
              onClick={handleRemove}
            />

            <h1>
              {noteData.title}
            </h1>

            <p>
              {noteData.description}
            </p>

            {
              noteData.links &&
              <DefaultSection title="Links úteis">
                <Links>
                  {noteData.links.map(link => (
                    <li key={link.id}>
                      <a href={link.url} target="_blank">
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </DefaultSection>
            }

            {
              noteData.tags &&
              <DefaultSection title="Marcadores">
                {noteData.tags.map(tag => (
                  <Tag
                    key={tag.id}
                    title={tag.name}
                  />
                ))}
              </DefaultSection>
            }

            <Button
              title="Voltar"
              onClick={handleBack}
            />
          </DetailsContent>
        </main>
      }

    </DetailsContainer>
  )
}