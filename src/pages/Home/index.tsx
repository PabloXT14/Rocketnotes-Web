import { useState, useEffect } from 'react';
import { api } from '../../services/index';
import { ButtonText } from '../../components/ButtonText';
import { Header } from '../../components/Header';
import { FiPlus } from 'react-icons/fi';
import { HomeContainer, Brand, Menu, Search, HomeContent, NewNote } from './styles';
import { Input } from '../../components/Input';
import { DefaultSection } from '../../components/DefaultSection';
import { Note } from './components/Note';
import { useNavigate } from 'react-router-dom';
import { RingLoader } from '../../components/RingLoader';
import { useTheme } from 'styled-components';
import { useQuery } from 'react-query';

interface Tag {
  id: string;
  name: string;
}

interface Note {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
}

export function Home() {
  const [tagsFilter, setTagsFilter] = useState<Tag[]>([]);
  const [tagsFilterSelected, setTagsFilterSelected] = useState<string[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteSearch, setNoteSearch] = useState("");
  const { COLORS } = useTheme();

  const notesQueryId = 1;

  const { data, isError, isLoading } = useQuery(["notes", notesQueryId], async() => {
    const response = await api.get(`/notes?title=${noteSearch}&tags=${tagsFilterSelected}`);

      return response.data as Note[];
    }
  )

  const navigate = useNavigate();

  function handleTagFilterSelected(tagName: string) {
    if (tagName === "all") {
      return setTagsFilterSelected([]);
    }

    const isTagFilterAlreadySelected = tagsFilterSelected.includes(tagName);

    if (isTagFilterAlreadySelected) {
      const filteredTags = tagsFilterSelected.filter(tag => tag !== tagName);

      setTagsFilterSelected(filteredTags);

      return;
    }

    setTagsFilterSelected(prevState => [...prevState, tagName]);
  }

  function handleOpenNoteDetails(noteId: string) {
    navigate(`/details/${noteId}`);
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTagsFilter(response.data);
    }

    fetchTags();
  }, [])

  // useEffect(() => {
  //   async function fetchNotes() {
  //     const response = await api.get(`/notes?title=${noteSearch}&tags=${tagsFilterSelected}`);

  //     setNotes(response.data);
  //   }

  //   fetchNotes();
  // }, [noteSearch, tagsFilterSelected])

  return (
    <HomeContainer>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            title='Todos'
            onClick={() => handleTagFilterSelected('all')}
            isActive={tagsFilterSelected.length === 0}
          />
        </li>

        {tagsFilter
          ? tagsFilter.map((tag) => (
            <li key={tag.id}>
              <ButtonText
                title={tag.name}
                onClick={() => handleTagFilterSelected(tag.name)}
                isActive={tagsFilterSelected.includes(tag.name)}
              />
            </li>
          ))
          :
          <RingLoader
            className="rings-loader"
            color={COLORS.GRAY_100}
            width={32}
            height={32}
          />
        }
      </Menu>

      <Search>
        <Input
          placeholder='Pesquisar pelo título'
          value={noteSearch}
          onChange={event => setNoteSearch(event.target.value)}
        />
      </Search>

      <HomeContent>
        <DefaultSection title='Minhas notas'>
          {
            data
              ? data.map(note => {

                return (
                  <Note
                    key={note.id}
                    data={note}
                    onClick={() => handleOpenNoteDetails(note.id)}
                  />
                )

              })
              :
              <RingLoader
                className="rings-loader"
                color={COLORS.GRAY_100}
                width={80}
                height={80}
              />
          }
        </DefaultSection>
      </HomeContent>

      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>
    </HomeContainer>
  );
}
