import { HtmlHTMLAttributes } from 'react';
import { Tag } from '../../../../components/Tag';
import { NoteContainer } from './styles';

type NoteProps = HtmlHTMLAttributes<HTMLDivElement> & {
  data: {
    title: string;
    tags: string[];
  }
}

export function Note({ data, ...rest }: NoteProps) {
  return (
    <NoteContainer
      {...rest}
    >
      <h2>{data.title}</h2>
      <div>
        {data.tags.map(tag => (
          <Tag key={Math.floor(Math.random() * Date.now())} title={tag} />
        ))}
      </div>
    </NoteContainer>
  );
}