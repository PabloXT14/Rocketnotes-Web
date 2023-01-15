import styled from "styled-components";

export const DefaultSectionContainer = styled.section`
  margin: 3.5rem 0 1.75rem;

  > h2 {
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_700};
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-size: 1.25rem;
    font-weight: 400;
  }
`;