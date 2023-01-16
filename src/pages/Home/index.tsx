import { ButtonText } from '../../components/ButtonText';
import { Header } from '../../components/Header';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { HomeContainer, Brand, Menu, Search, HomeContent, NewNote } from './styles';
import { Input } from '../../components/Input';
import { DefaultSection } from '../../components/DefaultSection';
import { Note } from './components/Note';

interface HomeProps {

}

export function Home() {
  const fakeNotes = [
    { 
      title: 'React Modal',
      tags: ['react']
    },
    { 
      title: 'Exemplo de Middleware',
      tags: ['express', 'nodejs']
    }
  ]

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
        <li>
          <ButtonText title='Frontend' />
        </li>
        <li>
          <ButtonText title='Node' />
        </li>
        <li>
          <ButtonText title='React' />
        </li>
      </Menu>

      <Search>
        <Input placeholder='Pesquisar pelo título' />
      </Search>

      <HomeContent>
        <DefaultSection title='Minhas notas'>
          {
            fakeNotes.map(note => (
              <Note key={Math.floor(Math.random() * Date.now())} data={note} />
            ))
          }
        </DefaultSection>
      </HomeContent>

      <NewNote>
        <FiPlus />
        Criar nota
      </NewNote>
    </HomeContainer>
  );
}
