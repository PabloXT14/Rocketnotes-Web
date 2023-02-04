import { useState, useEffect } from 'react';
import { api } from '../../services/index';
import { ButtonText } from '../../components/ButtonText';
import { Header } from '../../components/Header';
import { FiPlus } from 'react-icons/fi';
import { HomeContainer, Brand, Menu, Search, HomeContent, NewNote } from './styles';
import { Input } from '../../components/Input';
import { DefaultSection } from '../../components/DefaultSection';
import { Note } from './components/Note';

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
  const [tagsFilterSelected, setTagsFilterSelected] = useState<string []>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteSearch, setNoteSearch] = useState("");

  function handleTagFilterSelected(tagName: string) {
    const isTagFilterAlreadySelected = tagsFilterSelected.includes(tagName);

    if(isTagFilterAlreadySelected) {
      const filteredTags = tagsFilterSelected.filter(tag => tag !== tagName);

      setTagsFilterSelected(filteredTags);

      return;
    }

    setTagsFilterSelected(prevState => [...prevState, tagName]);
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTagsFilter(response.data);
    }

    fetchTags();
  }, [])

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${noteSearch}&tags=${tagsFilterSelected}`);

      setNotes(response.data);
    }

    fetchNotes();
  }, [noteSearch, tagsFilterSelected])

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
        {tagsFilter && tagsFilter.map((tag) => (
          <li key={tag.id}>
            <ButtonText
              title={tag.name}
              onClick={() => handleTagFilterSelected(tag.name)}
              isActive={tagsFilterSelected.includes(tag.name)}
            />
          </li>
        ))}
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
            notes.map(note => {

              return (
                <Note
                  key={note.id}
                  to={`/details/${note.id}`}
                  data={note}
                />
              )

            })
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
