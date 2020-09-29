import styled from 'styled-components';

export const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  min-height: 100%;
  overflow: auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  min-height: 80px;
  padding: 0px 8px;
  > h1 {
    font-size: 20px;
    font-weight: 400;
    padding: 16px 0px;
  }

  > a {
    font-size: 14px;
    font-weight: 400;
    padding: 16px 0px;
    color: var(--color-primary);
    text-decoration: none;
  }
`;

export const Main = styled.div`
  > div.SpinnerContent {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > div.Stamps {
    padding: 32px;
    background: var(--color-box);
    border-radius: 8px;
  }
`;

export const StampTypes = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
`;
