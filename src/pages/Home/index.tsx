import { useState, useEffect } from 'react';
import { api } from '../../services/index';
import { ButtonText } from '../../components/ButtonText';
import { Header } from '../../components/Header';
import { FiPlus } from 'react-icons/fi';
import { HomeContainer, Brand, Menu, Search, HomeContent, NewNote } from './styles';
import { Input } from '../../components/Input';
import { DefaultSection } from '../../components/DefaultSection';
import { Note } from './components/Note';
import { generateRandomId } from '../../utils/randomId';

interface Tag {
  id: string;
  name: string;
}

export function Home() {
  const [tagsFilter, setTagsFilter] = useState<Tag[]>([]);

  const fakeNotes = [
    {
      title: 'React Modal',
      tags: [
        { id: generateRandomId(), name: 'react' }
      ]
    },
    {
      title: 'Exemplo de Middleware',
      tags: [
        { id: generateRandomId(), name: 'nodejs' },
        { id: generateRandomId(), name: 'express' },
      ]
    },
    {
      title: 'Exemplo de Middleware',
      tags: [
        { id: generateRandomId(), name: 'nodejs' },
        { id: generateRandomId(), name: 'express' },
      ]
    },

  ]

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTagsFilter(response.data);
    }

    fetchTags();
  }, [])

  return (
    <HomeContainer>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText title='Todos' isActive />
        </li>
        {tagsFilter && tagsFilter.map((tag) => (
          <li key={tag.id}>
            <ButtonText title={tag.name} />
          </li>
        ))}
      </Menu>

      <Search>
        <Input placeholder='Pesquisar pelo título' />
      </Search>

      <HomeContent>
        <DefaultSection title='Minhas notas'>
          {
            fakeNotes.map(note => {
              const randomId = generateRandomId();
              return (
                <Note
                  key={randomId}
                  to={`/details/${randomId}`}
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
