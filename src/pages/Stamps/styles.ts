import styled from 'styled-components';

export const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  min-height: 100%;
  overflow: auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  min-height: 80px;
  padding: 0px 8px;
  > h1 {
    font-size: 20px;
    font-weight: 400;
    padding: 16px 0px;
  }
`;

export const Main = styled.div`
  > div.Stamps {
    padding: 32px;
    background: var(--color-box);
    border-radius: 8px;
  }
`;

export const StampTypes = styled.div`
  margin-top: 32px;
`;
