import styled from "styled-components";

export const NoteContainer = styled.div`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
  padding: 1rem 1.375rem;
  border-radius: 10px;

  & + & {
    margin-top: 1rem;
  }

  > h2 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.COLORS.WHITE};
    margin-bottom: 1.5rem;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
  }
`;