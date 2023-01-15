import styled from "styled-components";

export const HeaderContainer = styled.header`
  grid-area: header;

  height: 105px;
  width: 100%;

  border-bottom: 1px solid ${({ theme}) => theme.COLORS.BACKGROUND_700};

  display: flex;
  justify-content: space-between;
  padding: 0 5rem;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;


  > img {
    width: 3.5rem;
    height: 3.5rem;
    object-fit: cover;
    border-radius: 50%;
  }

  > div {
    display: flex;
    flex-direction: column;
    line-height: 24px;

    span {
      font-size: 0.875rem;/*14px*/
      color: ${({ theme }) => theme.COLORS.GRAY_100};
    }

    strong {
      font-size: 1.125rem;
      color: ${({ theme }) => theme.COLORS.WHITE};
    }
  }
`;

export const Logout = styled.button`
  border: 0;
  background: none;

  > svg {
    color: ${({ theme}) => theme.COLORS.GRAY_100};
    font-size: 2.25rem;
  }
`;
