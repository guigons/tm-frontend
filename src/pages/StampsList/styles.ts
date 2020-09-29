import styled from 'styled-components';

export const Container = styled.div`
  padding: 48px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > h1 {
    margin-bottom: 24px;
  }

  > div.Input {
    width: 360px;
    margin-bottom: 24px;
  }
`;
