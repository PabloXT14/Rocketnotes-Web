import { useEffect, useState, useRef } from 'react';
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { DefaultSection } from "../../components/DefaultSection";
import { Header } from "../../components/Header";
import { Tag } from "../../components/Tag";
import { DetailsContent, DetailsContainer, Links } from "./styles";
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/';
import { RingLoader } from '../../components/RingLoader';
import { useTheme } from 'styled-components';
import { toast, Id } from 'react-toastify';
import { CustomToast } from './components/CustomToast';

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
  const { COLORS } = useTheme();
  const toastId = useRef<Id>();

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  async function handleRemove() {
    async function removeNote() {
      try {
        await api.delete(`/notes/${id}`);

        toast.dismiss(toastId.current);
        toast.success('Note excluida com sucesso!');

        navigate(-1);
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Não foi possível excluir a nota");
        }
      }
    }

    toastId.current = toast.info(
      <CustomToast>
        <p>Você tem certeza que quer deletar esta nota?</p>
        <button
          onClick={removeNote}>
          Sim
        </button>

        <button
          onClick={() => { toast.dismiss(toastId.current) }}>
          Não
        </button>
      </CustomToast>,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  }

  useEffect(() => {
    async function fetchNoteData() {
      try {
        const response = await api.get(`/notes/${id}`);
        setNoteData(response.data);
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Não foi possível carregar os dados da nota.");
        }
      }
    }

    fetchNoteData();
  }, []);

  return (
    <DetailsContainer>
      <Header />

      {
        Object.values(noteData).length !== 0
          ?
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
          :
          <RingLoader
            className="details-loader"
            color={COLORS.GRAY_100}
            width={80}
            height={80}
          />
      }

    </DetailsContainer>
  )
}